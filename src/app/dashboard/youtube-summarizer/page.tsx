"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Youtube, Sparkles, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import { FileText } from "lucide-react";

export default function YouTubeSummarizer() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ summary: string; keyPoints: string[] } | null>(null);

  const handleSummarize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/youtube/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl: url }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to summarize video");
      } else {
        setResult(data);
        toast.success("Summary generated!");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-neutral-100 font-sans relative overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#030303]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-600 rounded-full blur-[120px]" 
        />
      </div>

      <header className="sticky top-0 z-30 flex h-16 items-center border-b border-white/[0.04] bg-[#030303]/40 backdrop-blur-xl px-6">
        <Link href="/dashboard" className="flex items-center gap-2 text-xl font-bold tracking-tighter mr-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <span className="text-white">Resume</span><span className="text-indigo-400">AI</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-neutral-400">
           <Link href="/dashboard" className="hover:text-white transition-colors">My Resumes</Link>
           <Link href="/dashboard/youtube-summarizer" className="text-white relative">
             YouTube Summarizer
             <div className="absolute inset-x-0 -bottom-5 h-0.5 bg-red-500 rounded-full" />
           </Link>
           <Link href="/dashboard/job-search" className="hover:text-white transition-colors">Job Search</Link>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold mb-4 uppercase tracking-wider">
            <Youtube className="w-3 h-3" /> AI Powered
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-4 drop-shadow-md">
            YouTube Video <span className="text-red-500">Summarizer</span>
          </h1>
          <p className="text-neutral-300 font-medium max-w-2xl mx-auto">
            Paste a YouTube URL and get an instant AI-powered summary and key takeaways.
          </p>
        </motion.div>

        <Card className="bg-neutral-900/40 backdrop-blur-xl border-white/[0.08] text-white shadow-2xl mb-12">
          <CardContent className="pt-8">
            <form onSubmit={handleSummarize} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <Input 
                  placeholder="https://www.youtube.com/watch?v=..." 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-neutral-950 border-neutral-800 pl-10 h-12 text-white placeholder:text-neutral-600 focus-visible:ring-red-500"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="h-12 bg-red-600 hover:bg-red-500 text-white font-bold px-8 rounded-xl transition-all shadow-lg shadow-red-500/20"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Summarize Now"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <Card className="bg-neutral-900/60 backdrop-blur-md border-white/10 hover:border-red-500/30 transition-all duration-300 text-white overflow-hidden relative group hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent group-hover:via-red-500 transition-all" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    AI Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-200 leading-relaxed italic text-lg drop-shadow-sm">
                    {result.summary}
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-neutral-900/60 backdrop-blur-md border-white/10 text-white hover:border-red-500/20 transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg">Key Takeaways</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {result.keyPoints.map((point, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-neutral-200 font-medium">{point}</span>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
                
                <Card className="bg-neutral-900/60 backdrop-blur-md border-white/10 text-white flex flex-col items-center justify-center p-8 text-center border-dashed border-2 hover:bg-neutral-900/80 transition-all">
                   <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                      <Youtube className="w-6 h-6 text-red-500" />
                   </div>
                   <h4 className="font-bold mb-2">Want to save this?</h4>
                   <p className="text-xs text-neutral-300 mb-6">Upgrade to Pro to save summaries to your account and export them as PDFs.</p>
                   <Button variant="outline" className="border-white/[0.1] hover:bg-white/5 text-white w-full">Coming Soon</Button>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
