"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Youtube, Sparkles, Loader2, ArrowRight, CheckCircle2, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import { DashboardAmbientBg } from "@/components/dashboard/DashboardAmbientBg";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

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
    <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10">
      <DashboardAmbientBg accentColor="red" />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-12 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black mb-4 uppercase tracking-widest">
          <Youtube className="w-3.5 h-3.5" /> AI Video Intelligence
        </div>
        <h1 className="text-5xl font-black tracking-tighter text-white mb-4 drop-shadow-md">
          YouTube <span className="text-red-500">Insights</span>
        </h1>
        <p className="text-neutral-400 font-medium text-lg max-w-2xl mx-auto">
          Distill complex videos into actionable summaries and professional highlights with world-class AI.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="relative z-10"
      >
        <Card className="bg-[#0A0A0B]/60 backdrop-blur-2xl border-white/[0.08] text-white shadow-[0_0_50px_rgba(239,68,68,0.1)] mb-12 overflow-hidden relative group">
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-50" />
          <CardContent className="pt-8 relative z-10 p-8">
            <form onSubmit={handleSummarize} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative group/input">
                <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within/input:text-red-500 transition-colors" />
                <Input 
                  placeholder="Paste YouTube Video URL..." 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-neutral-900 border-white/[0.1] pl-12 h-14 text-white placeholder:text-neutral-600 focus-visible:ring-red-500 rounded-xl transition-all font-medium text-base hover:border-red-500/30"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="relative group h-14 bg-white hover:bg-neutral-100 text-neutral-900 font-black px-10 rounded-xl transition-all shadow-lg overflow-hidden gap-2 shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span className="relative z-10 flex items-center gap-2">
                       <Sparkles className="w-4 h-4" /> Summarize
                    </span>
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-neutral-300/40 to-transparent transition-transform duration-1000 ease-in-out" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6 relative z-10"
          >
            <motion.div variants={itemVariants}>
              <Card className="bg-[#0A0A0B]/60 backdrop-blur-2xl border-white/10 text-white overflow-hidden relative group hover:shadow-[0_0_60px_rgba(239,68,68,0.15)] transition-all duration-700">
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent group-hover:via-red-500 transition-all" />
                <CardHeader className="flex flex-row items-center justify-between p-8 pb-4">
                  <CardTitle className="flex items-center gap-3 text-2xl font-black tracking-tight">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                    </div>
                    AI Summary
                  </CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white/5 border-white/10 text-neutral-300 hover:text-white gap-2 rounded-xl h-10 px-4 font-bold transition-all hover:bg-red-500/10 hover:border-red-500/30"
                    onClick={() => {
                      toast.success("Summary converted to professional notes!");
                    }}
                  >
                    <FileText className="w-4 h-4" /> Use in Resume
                  </Button>
                </CardHeader>
                <CardContent className="p-8 pt-4">
                  <p className="text-neutral-200 leading-relaxed text-lg font-medium drop-shadow-sm border-l-2 border-red-500/30 pl-6 py-2 bg-gradient-to-r from-red-500/5 to-transparent rounded-r-xl">
                    {result.summary}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
              <motion.div variants={itemVariants}>
                <Card className="bg-[#0A0A0B]/60 backdrop-blur-2xl border-white/10 text-white hover:border-red-500/30 transition-all h-full p-2">
                  <CardHeader className="p-6">
                    <CardTitle className="text-xl font-black flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      </div>
                      Key Takeaways
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-8 space-y-5">
                    {result.keyPoints.map((point, i) => (
                      <motion.div 
                        key={i}
                        className="flex items-start gap-4 group/item"
                      >
                        <div className="w-2 h-2 rounded-full bg-red-500 mt-2.5 shrink-0 group-hover/item:scale-150 transition-transform shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                        <span className="text-base text-neutral-300 font-medium leading-relaxed group-hover/item:text-white transition-colors">{point}</span>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card className="bg-[#0A0A0B]/40 backdrop-blur-2xl border-white/10 border-dashed border-2 text-white flex flex-col items-center justify-center p-8 text-center hover:bg-neutral-900/60 transition-all group h-full relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   <div className="w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-700 relative z-10 shadow-inner">
                      <Youtube className="w-10 h-10 text-red-500" />
                   </div>
                   <h4 className="font-black text-2xl mb-3 relative z-10 tracking-tight">Sync to Resume</h4>
                   <p className="text-base text-neutral-400 mb-8 max-w-[280px] font-medium relative z-10 leading-relaxed">Automatically transform these insights into high-impact professional skills.</p>
                   <Button className="relative z-10 w-full bg-white text-black hover:bg-neutral-200 font-black rounded-xl h-12 text-lg shadow-xl shadow-white/5 transition-all">
                      Connect to Dashboard
                   </Button>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
