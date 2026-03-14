import fs from 'fs';
import path from 'path';

export interface VideoMetadata {
  title: string;
  author: string;
  thumbnail: string;
  duration: string;
  chapters: { time: number; label: string; timeDisplay: string }[];
}

export interface ApexResult {
  transcript: string | null;
  metadata: VideoMetadata | null;
}

export class YouTubeScraper {
  private static LOG_FILE = path.join(process.cwd(), 'scraper-debug.log');

  private static log(msg: string) {
    const logEntry = `[${new Date().toISOString()}] ${msg}\n`;
    console.log(msg);
    try {
      fs.appendFileSync(this.LOG_FILE, logEntry);
    } catch (e) {}
  }

  static async getApexData(videoId: string, targetLang: string = 'en'): Promise<ApexResult> {
    this.log(`[V20] NEXUS EXTRACTION INITIATED: ${videoId} (Target: ${targetLang})`);
    
    let transcript: string | null = null;
    let metadata: VideoMetadata | null = null;

    try {
      const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36';
      
      const referers = [
        'https://www.google.com/',
        'https://www.youtube.com/',
        'https://m.youtube.com/',
        'https://t.co/'
      ];
      const referer = referers[Math.floor(Math.random() * referers.length)];

      const handshake = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
        headers: { 
          'User-Agent': ua,
          'Accept-Language': `${targetLang},en;q=0.9`,
          'Cache-Control': 'no-cache',
          'Referer': referer,
          'Origin': 'https://www.youtube.com'
        }
      });
      const html = await handshake.text();
      const cookies = handshake.headers.get('set-cookie') || '';
      
      // Deep Intelligence Harvesting (ytcfg)
      const ytcfgMatch = html.match(/ytcfg\.set\(({.+?})\);/);
      let ytcfg: any = {};
      if (ytcfgMatch) {
        try {
          ytcfg = JSON.parse(ytcfgMatch[1]);
        } catch (e) {}
      }

      const apiKey = ytcfg.INNERTUBE_API_KEY || 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8';
      const visitorData = ytcfg.INNERTUBE_CONTEXT_CLIENT_VISITOR_DATA || '';
      const stsMatch = html.match(/"sts"\s*:\s*(\d+)/);
      const sts = stsMatch ? parseInt(stsMatch[1]) : 19800;
      
      const sigMatch = html.match(/"v":"([^"]+)","t":"([^"]+)"/);
      const sigT = sigMatch ? sigMatch[2] : '';
      
      const intelligence = { apiKey, visitorData, sts, sigT };
      this.log(`[V20] Harvesting Intelligence: STS=${sts}, SIG_T=${sigT.substring(0, 5)}..., API_KEY=${apiKey.substring(0, 10)}...`);

      const playerRes = this.extractInitialPlayerResponse(html);
      
      if (playerRes) {
        metadata = this.extractMetadata(playerRes);
        const tracks = playerRes.captions?.playerCaptionsTracklistRenderer?.captionTracks;
        this.log(`[V20] Initial Handshake: Found ${tracks?.length || 0} caption tracks.`);
        if (tracks && tracks.length > 0) {
          transcript = await this.streamTranscript(tracks, cookies, ua, targetLang, sts);
        }
      }

      if (!transcript) {
        this.log(`[V20] Nexus Pattern 1 failed. Trying Deep Regex...`);
        const regexTracks = this.deepRegexTracks(html);
        if (regexTracks) {
          transcript = await this.streamTranscript(regexTracks, cookies, ua, targetLang, sts);
        }
      }

      if (!transcript) {
        this.log(`[V20] NEXUS fallback to MWEB/WEB Tunneling...`);
        transcript = await this.innerTubeRelay(videoId, targetLang, intelligence);
      }

      if (!transcript) {
        this.log(`[V20] NEXUS fallback to TV-Grade Tunnel...`);
        transcript = await this.tvRelay(videoId, targetLang, intelligence);
      }

      if (!transcript) {
        this.log(`[V20] NEXUS fallback to Global Rescue...`);
        transcript = await this.globalRescue(videoId, targetLang, sigT);
      }

      return { transcript, metadata };

    } catch (error: any) {
      this.log(`[V20] NEXUS FAULT: ${error.message}`);
      return { transcript: null, metadata: null };
    }
  }

  private static extractInitialPlayerResponse(html: string): any | null {
    try {
      // Pattern 1: Standard ytInitialPlayerResponse
      const mainMatch = html.match(/ytInitialPlayerResponse\s*=\s*({.+?});/);
      if (mainMatch) return JSON.parse(mainMatch[1]);

      // Pattern 2: Window object variant
      const windowMatch = html.match(/window\["ytInitialPlayerResponse"\]\s*=\s*({.+?});/);
      if (windowMatch) return JSON.parse(windowMatch[1]);

      // Pattern 3: Captions block only
      const captionsMatch = html.match(/"captions":\s*({.+?}),"videoDetails"/);
      if (captionsMatch) return { captions: JSON.parse(captionsMatch[1]) };
      
      this.log(`[V20] Nexus Pattern Match Failed on raw HTML.`);
    } catch (e) {}
    return null;
  }

  private static deepRegexTracks(html: string): any[] | null {
    try {
      const match = html.match(/"captionTracks":\s*(\[.+?\])/);
      if (match) return JSON.parse(match[1]);
    } catch (e) {}
    return null;
  }

  private static extractMetadata(data: any): VideoMetadata | null {
    try {
      const details = data.videoDetails;
      if (!details) return null;

      const durationSec = parseInt(details.lengthSeconds);
      const m = Math.floor(durationSec / 60);
      const s = durationSec % 60;
      const durationDisplay = `${m}:${s.toString().padStart(2, '0')}`;

      const chapters: any[] = [];
      try {
        const markers = data.playerOverlays?.playerOverlayRenderer?.decoratedPlayerBarRenderer?.playerBar?.multiMarkersRenderer?.markersMap;
        if (markers && markers[0]?.value?.chapters) {
          markers[0].value.chapters.forEach((c: any) => {
            const timeMs = parseInt(c.chapterRenderer.timeRangeStartMillis);
            const timeSec = Math.floor(timeMs / 1000);
            const cm = Math.floor(timeSec / 60);
            const cs = timeSec % 60;
            chapters.push({
              time: timeSec,
              timeDisplay: `${cm}:${cs.toString().padStart(2, '0')}`,
              label: c.chapterRenderer.title.simpleText
            });
          });
        }
      } catch (e) {}

      return {
        title: details.title,
        author: details.author,
        thumbnail: details.thumbnail.thumbnails.pop()?.url || "",
        duration: durationDisplay,
        chapters: chapters
      };
    } catch (e) { return null; }
  }

  private static async innerTubeRelay(videoId: string, targetLang: string, intel: any): Promise<string | null> {
    try {
      const clients = [
        { name: 'WEB', version: '2.20240313.06.00', ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36' },
        { name: 'MWEB', version: '2.20240313.06.00', ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15' },
        { name: 'ANDROID_TESTSUITE', version: '1.9', ua: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36' }
      ];

      for (const client of clients) {
        const res = await fetch(`https://www.youtube.com/youtubei/v1/player?key=${intel.apiKey}`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json', 
            'User-Agent': client.ua,
            'Referer': 'https://www.youtube.com/',
            'Origin': 'https://www.youtube.com',
            'X-Goog-Visitor-Id': intel.visitorData
          },
          body: JSON.stringify({
            context: { 
              client: { clientName: client.name, clientVersion: client.version, hl: targetLang, visitorData: intel.visitorData } 
            },
            videoId: videoId,
            playbackContext: { contentPlaybackContext: { signatureTimestamp: intel.sts } }
          })
        });
        const data = await res.json();
        const tracks = data.captions?.playerCaptionsTracklistRenderer?.captionTracks;
        if (tracks) {
          const text = await this.streamTranscript(tracks, '', client.ua, targetLang, intel.sts);
          if (text) return text;
        }
      }
    } catch (e: any) { this.log(`[V20] InnerTube Relay Fault: ${e.message}`); }
    return null;
  }

  private static async tvRelay(videoId: string, targetLang: string, intel: any): Promise<string | null> {
    try {
      const res = await fetch(`https://www.youtube.com/youtubei/v1/player?key=${intel.apiKey}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Referer': 'https://www.youtube.com/',
          'Origin': 'https://www.youtube.com',
          'X-Goog-Visitor-Id': intel.visitorData
        },
        body: JSON.stringify({
          context: { 
            client: { clientName: 'TVHTML5_SIMPLY_EMBEDDED_PLAYER', clientVersion: '2.0', hl: targetLang, visitorData: intel.visitorData },
            user: { lockedSafetyMode: false }
          },
          videoId: videoId,
          playbackContext: { contentPlaybackContext: { signatureTimestamp: intel.sts } }
        })
      });
      const data = await res.json();
      const tracks = data.captions?.playerCaptionsTracklistRenderer?.captionTracks;
      if (tracks) return await this.streamTranscript(tracks, '', '', targetLang);
    } catch (e) {}
    return null;
  }

  private static async streamTranscript(tracks: any[], cookies: string, ua: string, targetLang: string, sts?: number): Promise<string | null> {
    // Priority: Target Lang (Manual) > Target Lang (Auto) > English (Manual) > English (Auto) > Any ASR
    const selected = tracks.find(t => t.languageCode === targetLang && !t.kind) || 
                     tracks.find(t => t.languageCode === targetLang) || 
                     tracks.find(t => t.languageCode.startsWith(targetLang)) ||
                     tracks.find(t => t.languageCode === 'en' && !t.kind) ||
                     tracks.find(t => t.languageCode === 'en') ||
                     tracks.find(t => t.kind === 'asr') ||
                     tracks[0];

    if (!selected?.baseUrl) return null;

    try {
      let finalUrl = selected.baseUrl.includes('?') ? `${selected.baseUrl}&fmt=json3` : `${selected.baseUrl}?fmt=json3`;
      if (sts) finalUrl += `&sts=${sts}`;
      
      const res = await fetch(finalUrl, {
        headers: { 
          'Cookie': cookies, 
          'User-Agent': ua || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://www.youtube.com/' 
        }
      });
      
      if (res.ok) {
        const rawData = await res.text();
        this.log(`[V20] Stream Payload: ${rawData?.length || 0} bytes. Snapshot: ${rawData?.substring(0, 100)}`);
        
        if (!rawData || rawData.length < 10) return null;

        if (rawData.startsWith('{')) {
          try {
            const data = JSON.parse(rawData);
            const text = data.events?.filter((e: any) => e.segs).map((e: any) => e.segs.map((s: any) => s.utf8).join("")).join(" ").replace(/\s+/g, " ").trim();
            if (text) return text;
          } catch (e) {}
        }

        const xmlMatch = rawData.match(/<text start=".*?" dur=".*?">(.*?)<\/text>/g) || rawData.match(/<text.*?>(.*?)<\/text>/g);
        if (xmlMatch) {
          return xmlMatch.map(t => t.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")).join(" ").replace(/\s+/g, ' ').trim();
        }
      } else {
        this.log(`[V20] Stream Fault: ${res.status} ${res.statusText}`);
      }
    } catch (e: any) {
      this.log(`[V20] Stream Execution Fault: ${e.message}`);
    }
    return null;
  }

  private static async globalRescue(videoId: string, targetLang: string, sigT: string): Promise<string | null> {
    const rescuePoints = [
      `https://www.youtube.com/api/timedtext?v=${videoId}&lang=${targetLang}&fmt=json3${sigT ? `&t=${sigT}` : ''}`,
      `https://www.youtube.com/api/timedtext?v=${videoId}&lang=en&fmt=json3${sigT ? `&t=${sigT}` : ''}`,
      `https://www.youtube.com/api/timedtext?v=${videoId}&lang=en&type=track&kind=asr&fmt=json3${sigT ? `&t=${sigT}` : ''}`,
      `https://video.google.com/timedtext?lang=${targetLang}&v=${videoId}`,
      `https://video.google.com/timedtext?lang=en&v=${videoId}`
    ];

    for (const url of rescuePoints) {
      try {
        this.log(`[V20] Rescue Attempt: ${url}`);
        const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, next: { revalidate: 0 } });
        if (res.ok) {
          const data = await res.text();
          this.log(`[V20] Rescue Payload: ${data?.length || 0} bytes. Snapshot: ${data?.substring(0, 50)}`);
          if (data && data.length > 30) {
             const xmlMatch = data.match(/<text start=".*?" dur=".*?">(.*?)<\/text>/g) || data.match(/<text.*?>(.*?)<\/text>/g);
             if (xmlMatch) {
               return xmlMatch.map(t => t.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")).join(" ").replace(/\s+/g, ' ').trim();
             }
             if (data.startsWith('{')) {
               try {
                 const json = JSON.parse(data);
                 if (json.events) return json.events.filter((e: any) => e.segs).map((e: any) => e.segs.map((s: any) => s.utf8).join("")).join(" ");
               } catch (e) {}
             }
             const clean = data.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
             if (clean.length > 50) return clean;
          }
        }
      } catch (e: any) { this.log(`[V20] Rescue Error: ${e.message}`); }
    }
    return null;
  }
}
