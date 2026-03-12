import { NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";
import OpenAI from "openai";

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export async function POST(req: Request) {
  try {
    const { videoUrl } = await req.json();

    if (!videoUrl) {
      return NextResponse.json({ error: "Video URL is required" }, { status: 400 });
    }

    const videoId = getYouTubeId(videoUrl);
    if (!videoId) {
      return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
    }

    // Fetch transcript
    let transcriptText = "";
    try {
      const transcript = await YoutubeTranscript.fetchTranscript(videoId);
      transcriptText = transcript.map(t => t.text).join(" ");
    } catch (error) {
      console.error("Transcript error:", error);
      return NextResponse.json({ error: "Could not fetch transcript for this video. Transcripts might be disabled." }, { status: 400 });
    }

    if (!transcriptText || transcriptText.length < 50) {
      return NextResponse.json({ error: "Transcript is too short to summarize." }, { status: 400 });
    }

    // Lazy load OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "placeholder-key",
    });

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        summary: "[MOCK SUMMARY] This is a mock summary because no OpenAI API key is configured. The video discussed the importance of clear communication in technical teams and how AI is changing the landscape of software development.",
        keyPoints: [
          "Technical communication is vital for project success.",
          "AI tools are increasing developer productivity.",
          "Soft skills remain a differentiator in the job market."
        ]
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert video summarizer. Summarize the provided YouTube video transcript. Return your response ONLY as a JSON object with two fields: 'summary' (a concise paragraph) and 'keyPoints' (an array of 3-5 key takeaways). Do not include markdown formatting.",
        },
        {
          role: "user",
          content: `Transcript:\n${transcriptText.substring(0, 15000)}`, // Limit to prevent token overflow
        },
      ],
      temperature: 0.5,
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(completion.choices[0].message.content || "{}");

    return NextResponse.json(result);
  } catch (error) {
    console.error("YouTube Summary error:", error);
    return NextResponse.json({ error: "Failed to summarize video" }, { status: 500 });
  }
}
