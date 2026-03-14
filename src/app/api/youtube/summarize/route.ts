import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { YouTubeTranscriptService } from "@/lib/YouTubeTranscriptService";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { url, transcript, lang = "en", mode = "detailed", isManual = false } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "Input required", message: "Please provide a valid YouTube link." }, { status: 400 });
    }

    const videoIdMatch = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : url;

    if (videoId.length !== 11) {
      return NextResponse.json({ error: "Invalid Link", message: "That doesn't look like a valid YouTube video ID." }, { status: 400 });
    }

    console.log(`[API] Initiating V21 Orion Protocol (Gemini) for ${videoId} (Lang: ${lang}, Mode: ${mode})`);
    YouTubeTranscriptService.orionLog(`[API] Initiating V21 Orion Protocol for ${videoId}`);
    
    // 1. Extraction Layer
    let transcriptText = "";
    let metadata: any = null;
    let audioUrl = "";
    let extractionMode: 'transcript' | 'audio' = 'transcript';

    if (isManual) {
      transcriptText = transcript;
      extractionMode = 'transcript';
      try {
        metadata = await YouTubeTranscriptService.fetchMetadata(videoId);
      } catch (e) {}
    } else {
      console.log(`[API] Attempting Automated Extraction for ${videoId}`);
      YouTubeTranscriptService.orionLog(`[API] Attempting Automated Extraction for ${videoId}`);
      try {
        const automatedData = await YouTubeTranscriptService.getAutomatedData(videoId, lang);
        metadata = automatedData.metadata;
        extractionMode = automatedData.mode;

        if (automatedData.mode === 'transcript' && automatedData.transcript) {
          transcriptText = automatedData.transcript;
          YouTubeTranscriptService.orionLog(`[API] Transcript Extraction Successful (${transcriptText.length} chars)`);
        } else if (automatedData.mode === 'audio' && automatedData.audioUrl) {
          audioUrl = automatedData.audioUrl;
          console.log(`[API] Engaging Audio Intelligence for ${videoId}`);
          YouTubeTranscriptService.orionLog(`[API] Audio Signal Found: ${audioUrl.substring(0, 50)}...`);
        }
      } catch (err: any) {
        console.error(`[API] Extraction Critical Failure: ${err.message}`);
        YouTubeTranscriptService.orionLog(`[API] Extraction Critical Failure: ${err.message}`);
        return NextResponse.json({ 
          error: "extraction_failed", 
          message: err.message || "Failed to extract any data from this video." 
        }, { status: 400 });
      }
    }

    if (extractionMode === 'transcript' && (!transcriptText || transcriptText.length < 50)) {
      return NextResponse.json({ 
        error: "insufficient_data", 
        message: "The transcript is too short for intelligent synthesis." 
      }, { status: 400 });
    }

    // 2. Intelligence Synthesis (Gemini Orion)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash"
    });

    const systemPrompt = `You are a world-class Video Intelligence AI. ${extractionMode === 'audio' ? 'I am providing an audio stream of the video.' : 'I am providing a transcript of the video.'} 
    Synthesize the content in the following language: ${lang}.
    CRITICAL: EVERY single word of your output (summary, keyPoints, chapters, quotes, actionableTakeaways, etc.) MUST be in ${lang}.
    
    Mode: ${mode === 'quick' ? 'Concise Bullet Points' : mode === 'chapters' ? 'High-Granularity Segmentation' : 'Complete Detailed Intelligence'}.
    
    Requirements:
    1. "summary": A high-level synthesis of the main ideas in ${lang}.
    2. "keyPoints": Array of main takeaways in ${lang}.
    3. "chapters": Array of {time: string, label: string, info: string}. Break the video into specific logical "Parts" or segments. Provide at least 5-8 segments if the video is longer than 5 minutes. (REQUIRED).
    4. "quotes": Array of 3-5 powerful, verbatim quotes appearing in the video, translated to ${lang}.
    5. "viralClips": Array of {time: string, reason: string} for high-impact or viral moments in ${lang}.
    6. "actionableTakeaways": Array of 3-5 concrete steps or advice in ${lang}.
    7. "complexityScore": Beginner, Intermediate, or Expert (in ${lang}).
    8. "readingTime": Estimate (e.g., "4 min" in ${lang}).
    
    Output Format: JSON. Ensure the JSON is valid and properly escaped.`;
    
    let result;
    if (extractionMode === 'audio') {
      // For audio, we fetch the first few MBs or use the URL if the library supports it
      // Note: In high-performance production, we'd use File API. 
      // For this implementation, we'll try to fetch the audio data and send as inlineData.
      try {
        YouTubeTranscriptService.orionLog(`[API] Stream-Slicing Initiated (Range: 10MB)`);
        const audioResponse = await fetch(audioUrl, {
          headers: { 
            'Range': 'bytes=0-10485760',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
            'Referer': 'https://www.youtube.com/'
          }
        });

        if (!audioResponse.ok) {
          throw new Error(`Signal Fetch Failed: ${audioResponse.status} ${audioResponse.statusText}`);
        }
        
        const audioBuffer = await audioResponse.arrayBuffer();
        YouTubeTranscriptService.orionLog(`[API] Data Slice Captured: ${audioBuffer.byteLength} bytes`);
        
        // Convert to Base64 in a memory-safe way
        const audioBase64 = Buffer.from(audioBuffer).toString('base64');
        
        result = await model.generateContent([
          { text: systemPrompt },
          { 
            inlineData: {
              mimeType: "audio/mp4", // Most YouTube audio streams are mp4/m4a
              data: audioBase64
            }
          }
        ]);
      } catch (audioErr: any) {
        console.error("[API] Audio Synthesis Failed:", audioErr);
        YouTubeTranscriptService.orionLog(`[API] Audio-Neural Link Failure: ${audioErr.message}`);
        throw new Error(`Intelligence Link Error: ${audioErr.message}`);
      }
    } else {
      result = await model.generateContent([
        { text: systemPrompt },
        { text: `Transcript: ${transcriptText.substring(0, 80000)}` }
      ]);
    }

    // Helper to clean and parse Gemini JSON
    const parseSynthesis = (text: string) => {
      try {
        // Remove potential markdown code blocks
        const cleaned = text.replace(/```json\n?|```/g, "").trim();
        return JSON.parse(cleaned);
      } catch (e) {
        console.error("[API] Synthesis Parse Error:", e);
        // Fallback or partial extraction could go here
        return null;
      }
    };

    const synthesis = parseSynthesis(result.response.text());
    
    if (!synthesis) {
      throw new Error("The intelligence engine returned an illegible response. Please try again.");
    }

    const safeSummary = synthesis.summary || "Summary generation failed. No transcript data available.";
    
    // 3. Persistence
    if (session?.user) {
      const userId = (session.user as any).id;
      if (userId) {
        try {
          await prisma.youtubeSummary.create({
            data: {
              userId,
              videoId,
              videoUrl: url,
              title: metadata?.title || "Unknown Video",
              channel: metadata?.author || "Unknown Channel",
              thumbnail: metadata?.thumbnail || "",
              duration: metadata?.duration || "",
              summary: safeSummary,
              keyPoints: JSON.stringify(synthesis.keyPoints || []),
              chapters: JSON.stringify(synthesis.chapters || []),
              quotes: JSON.stringify(synthesis.quotes || []),
              viralClips: JSON.stringify(synthesis.viralClips || []),
              actionableTakeaways: JSON.stringify(synthesis.actionableTakeaways || []),
              complexityScore: synthesis.complexityScore || "Intermediate",
              readingTime: synthesis.readingTime || "5 min",
              language: lang,
              mode: mode
            }
          });
        } catch (dbErr) {
          console.error("[API] Persistence Failure:", dbErr);
        }
      }
    }

    return NextResponse.json({
      summary: safeSummary,
      keyPoints: synthesis.keyPoints || [],
      chapters: synthesis.chapters || [],
      quotes: synthesis.quotes || [],
      viralClips: synthesis.viralClips || [],
      actionableTakeaways: synthesis.actionableTakeaways || [],
      complexityScore: synthesis.complexityScore || "Intermediate",
      readingTime: synthesis.readingTime || "5 min",
      metadata,
      transcript: transcriptText.substring(0, 10000)
    });

  } catch (error: any) {
    console.error("[API] ORION Fault:", error);
    return NextResponse.json({ 
      error: "orion_fault", 
      message: error.message || "An internal Gemini synthesis fault occurred." 
    }, { status: 500 });
  }
}
