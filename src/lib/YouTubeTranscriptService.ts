import { YoutubeTranscript } from 'youtube-transcript';
import ytdl from '@distube/ytdl-core';
import fs from 'fs';

export interface VideoMetadata {
  title: string;
  author: string;
  thumbnail: string;
  duration?: string;
  videoId?: string;
}

export interface TranscriptResult {
  transcript?: string;
  metadata: VideoMetadata;
  audioUrl?: string;
  mode: 'transcript' | 'audio';
}

export class YouTubeTranscriptService {
  public static orionLog(message: string) {
    const log = `[${new Date().toISOString()}] ${message}\n`;
    console.log(message);
    try {
      fs.appendFileSync('/tmp/orion-debug.log', log);
    } catch (e) {}
  }

  /**
   * Extracts the 11-character video ID from various YouTube URL formats.
   */
  static getVideoId(url: string): string | null {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regex);
    return match ? match[1] : (url.length === 11 ? url : null);
  }

  /**
   * Helper to extract JSON objects from HTML strings.
   */
  private static findJson(html: string, key: string): any {
    const pos = html.indexOf(key);
    if (pos === -1) return null;

    const startPos = html.indexOf('{', pos);
    if (startPos === -1) return null;

    let braceCount = 0;
    for (let i = startPos; i < html.length; i++) {
        if (html[i] === '{') braceCount++;
        else if (html[i] === '}') braceCount--;

        if (braceCount === 0) {
            const jsonStr = html.substring(startPos, i + 1);
            try {
                return JSON.parse(jsonStr);
            } catch (e) {
                return null;
            }
        }
    }
    return null;
  }

  /**
   * Fetches the video title and author using YouTube's oEmbed API.
   */
  static async fetchMetadata(videoId: string): Promise<VideoMetadata> {
    try {
      const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
      if (!response.ok) throw new Error("Metadata fetch failed");
      
      const data = await response.json();
      return {
        title: data.title || "Unknown Video",
        author: data.author_name || "Unknown Channel",
        thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        videoId
      };
    } catch (error) {
      console.error("[YouTubeTranscriptService] Metadata error:", error);
      return {
        title: "YouTube Video",
        author: "Unknown Creator",
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        videoId
      };
    }
  }

  /**
   * Legacy Transcript Pilot (Pilot B)
   */
  static async fetchTranscript(videoId: string, lang: string = 'en'): Promise<string> {
    try {
      const transcriptConfig = lang !== 'en' ? { lang } : undefined;
      const transcriptParts = await YoutubeTranscript.fetchTranscript(videoId, transcriptConfig);
      
      if (!transcriptParts || transcriptParts.length === 0) {
        throw new Error("No transcript parts found");
      }

      return transcriptParts
        .map(part => part.text)
        .join(' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, ' ')
        .trim();
    } catch (error: any) {
      if (lang !== 'en') {
        return this.fetchTranscript(videoId, 'en');
      }
      throw new Error("Captions are unavailable");
    }
  }

  /**
   * Emergency Handshake via Embed URL (Pilot C)
   */
  private static async fetchViaEmbed(videoId: string, lang: string = 'en'): Promise<string | null> {
    try {
      this.orionLog(`[YouTubeTranscriptService] Engaging Pilot C (Embed-Capture) for ${videoId}`);
      const res = await fetch(`https://www.youtube.com/embed/${videoId}`, {
        headers: { 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
        }
      });
      const html = await res.text();
      const playerResponse = this.findJson(html, 'ytInitialPlayerResponse = ') || this.findJson(html, '"playerResponse":');
      
      if (!playerResponse) return null;

      const captionTracks = playerResponse.captions?.playerCaptionsTracklistRenderer?.captionTracks;
      if (!captionTracks) return null;

      const track = captionTracks.find((t: any) => t.languageCode === lang) || captionTracks[0];
      if (!track?.baseUrl) return null;

      const trRes = await fetch(track.baseUrl + '&fmt=json3');
      const text = await trRes.text();
      if (!text) return null;

      try {
        const data = JSON.parse(text);
        return data.events?.map((e: any) => e.segs?.map((s: any) => s.utf8).join('') || '').join(' ') || "";
      } catch (e) {
        return text.replace(/<text[^>]*>([\s\S]*?)<\/text>/g, '$1 ').replace(/<[^>]*>/g, '').trim();
      }
    } catch (e) {
      return null;
    }
  }

  /**
   * Legacy Audio Harvester (Orion V29)
   */
  static async fetchAudioUrl(videoId: string): Promise<string> {
    const clients = [
      { name: 'TV_CLIENT', options: { requestOptions: { headers: { 'User-Agent': 'Mozilla/5.0 (SMART-TV; Linux; Tizen 5.0) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/2.2 Chrome/63.0.3239.111 TV Safari/537.36' } } } },
      { name: 'IOS', options: { requestOptions: { headers: { 'User-Agent': 'com.google.ios.youtube/19.10.1 (iPhone15,3; U; CPU iOS 17_4_1 like Mac OS X; en_US)' } } } }
    ];

    let lastError: any = null;
    for (const client of clients) {
      try {
        const info = await ytdl.getInfo(videoId, client.options);
        const audioFormats = info.formats.filter(f => f.mimeType?.includes('audio/'));
        const bestAudio = audioFormats.sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0))[0];
        if (bestAudio?.url) return bestAudio.url;
      } catch (error: any) {
        lastError = error;
      }
    }
    throw new Error(`Extraction Fault: ${lastError?.message || "Signal lost."}`);
  }

  /**
   * Orchestrates the total automated extraction flow with Audio Fallback.
   * V30 Protocol - Total Signal Synchronization.
   */
  static async getAutomatedData(url: string, lang: string = 'en'): Promise<TranscriptResult> {
    const videoId = this.getVideoId(url);
    if (!videoId) throw new Error("Invalid YouTube URL");

    const metadata = await this.fetchMetadata(videoId);
    
    try {
      this.orionLog(`[YouTubeTranscriptService] Attempting V30 Protocol Pulse for ${videoId}`);
      
      // 1. Fetch PlayerResponse
      let pageRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
        headers: { 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9'
        }
      });
      let html = await pageRes.text();
      let playerResponse = this.findJson(html, 'ytInitialPlayerResponse = ') || this.findJson(html, '"playerResponse":');

      // MWEB Fallback
      if (!playerResponse) {
        this.orionLog(`[YouTubeTranscriptService] V30 Desktop failure. Transitioning to MWEB...`);
        pageRes = await fetch(`https://m.youtube.com/watch?v=${videoId}`, {
          headers: { 
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
          }
        });
        html = await pageRes.text();
        playerResponse = this.findJson(html, 'ytInitialPlayerResponse = ') || this.findJson(html, '"playerResponse":');
      }

      if (!playerResponse) throw new Error("Neural capture failed: playerResponse unavailable.");

      // 2. Try Transcript
      const captionTracks = playerResponse.captions?.playerCaptionsTracklistRenderer?.captionTracks;
      if (captionTracks && captionTracks.length > 0) {
        let track = captionTracks.find((t: any) => t.languageCode === lang) || 
                    captionTracks.find((t: any) => t.languageCode === 'en') || 
                    captionTracks[0];
        
        if (track?.baseUrl) {
          try {
            const transcriptUrl = track.baseUrl + (track.baseUrl.includes('?') ? '&' : '?') + 'fmt=json3';
            const transcriptRes = await fetch(transcriptUrl, {
                headers: { 
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
                    'Referer': `https://www.youtube.com/watch?v=${videoId}`
                }
            });
            const transcriptText = await transcriptRes.text();
            
            let transcript = "";
            if (transcriptText && transcriptText.length > 50) {
                try {
                    const data = JSON.parse(transcriptText);
                    transcript = data.events?.map((e: any) => e.segs?.map((s: any) => s.utf8).join('') || '').join(' ') || "";
                } catch (e) {
                    transcript = transcriptText.replace(/<text[^>]*>([\s\S]*?)<\/text>/g, '$1 ').replace(/<[^>]*>/g, '').trim();
                }

                if (transcript.length > 50) {
                    this.orionLog(`[YouTubeTranscriptService] V30 Transcript Successful`);
                    return { transcript, metadata, mode: 'transcript' };
                }
            }
          } catch (e) {}
        }
      }

      // 3. Try Audio from playerResponse
      const formats = [...(playerResponse.streamingData?.adaptiveFormats || []), ...(playerResponse.streamingData?.formats || [])];
      const audioFormats = formats.filter((f: any) => f.mimeType?.includes('audio/') && (f.url || f.signatureCipher));
      if (audioFormats.length > 0) {
        const bestAudio = audioFormats.find((f: any) => f.url);
        if (bestAudio?.url) {
          this.orionLog(`[YouTubeTranscriptService] V30 Audio Signal Captured`);
          return { metadata, audioUrl: bestAudio.url, mode: 'audio' };
        }
      }

      throw new Error("V30 Protocol Sync Failure: No usable data streams.");

    } catch (v30Err: any) {
      this.orionLog(`[YouTubeTranscriptService] V30 Pilot Ejected: ${v30Err.message}. Transitioning to Secondary Pilots...`);
      
      // Emergency Pilot C (Embed)
      try {
        const embedTranscript = await this.fetchViaEmbed(videoId, lang);
        if (embedTranscript && embedTranscript.length > 100) {
          this.orionLog(`[YouTubeTranscriptService] Pilot C (Embed) Successful`);
          return { transcript: embedTranscript, metadata, mode: 'transcript' };
        }
      } catch (e) {}

      try {
        const transcript = await this.fetchTranscript(videoId, lang);
        return { transcript, metadata, mode: 'transcript' };
      } catch (err: any) {
        try {
          const audioUrl = await this.fetchAudioUrl(videoId);
          return { metadata, audioUrl, mode: 'audio' };
        } catch (finalErr: any) {
          throw new Error("Auto-Extraction Unsuccessful. All synchronization channels are blocked by YouTube security.");
        }
      }
    }
  }
}
