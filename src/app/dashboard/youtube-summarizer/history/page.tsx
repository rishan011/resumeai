"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Youtube, History, ArrowLeft, Clock, Calendar, ExternalLink, 
  Trash2, Search, Loader2, Play, FileText, Languages, Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardAmbientBg } from "@/components/dashboard/DashboardAmbientBg";
import { toast } from "sonner";

interface HistoryItem {
  id: string;
  videoId: string;
  title: string;
  channel: string;
  thumbnail: string;
  duration: string;
  language: string;
  mode: string;
  createdAt: string;
}

export default function YouTubeHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch("/api/youtube/history");
      if (!res.ok) throw new Error("Failed to fetch history");
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      toast.error("Fetch Error", { description: "Could not sync history database." });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredHistory = history.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.channel?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-red-500/30 font-sans pb-20 overflow-x-hidden">
      <DashboardAmbientBg />
      
      <div className="max-w-[1400px] mx-auto pt-32 px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link href="/dashboard/youtube-summarizer" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest mb-6 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Nexus Workspace
            </Link>
            <div className="flex items-center gap-4 mb-4">
               <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-red-500 animate-pulse" />
               </div>
               <h1 className="text-6xl font-black tracking-tighter italic">
                 Intelligence <span className="bg-gradient-to-r from-red-600 to-rose-400 bg-clip-text text-transparent underline decoration-red-500/30 underline-offset-8">Vault</span>
               </h1>
            </div>
            <p className="text-neutral-500 font-medium text-lg leading-relaxed max-w-xl">
               Access your persistent video analysis records and neural insights from the Nexus grid.
            </p>
          </motion.div>

          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600 group-focus-within:text-red-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search history stream..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900/40 backdrop-blur-xl border border-white/5 h-16 pl-16 pr-8 rounded-2xl text-sm font-bold placeholder:text-neutral-800 focus:ring-1 focus:ring-red-500/40 outline-none transition-all"
            />
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-6 opacity-30">
            <Loader2 className="w-12 h-12 animate-spin text-red-500" />
            <p className="text-[10px] font-black uppercase tracking-widest italic">Syncing with history stream...</p>
          </div>
        ) : filteredHistory.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-40 gap-8 text-center border-2 border-dashed border-white/5 rounded-[4rem] bg-neutral-900/10">
            <div className="w-24 h-24 rounded-full bg-neutral-900 flex items-center justify-center border border-white/5 shadow-2xl">
              <History className="w-10 h-10 text-neutral-700" />
            </div>
            <div>
              <h3 className="text-3xl font-black mb-2 uppercase tracking-tighter italic">Intelligence Hub Empty</h3>
              <p className="text-neutral-500 font-medium">Start summarizing videos to populate your persistent knowledge base.</p>
            </div>
            <Link href="/dashboard/youtube-summarizer">
              <Button className="h-14 px-10 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all">
                Extract Metadata Now
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredHistory.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="bg-[#0A0A0B]/80 backdrop-blur-3xl border border-white/5 overflow-hidden group hover:border-red-500/30 transition-all rounded-[2.5rem] h-full flex flex-col cursor-pointer shadow-xl relative">
                    <div className="aspect-video relative overflow-hidden">
                      <img src={item.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-6 left-6 flex gap-3">
                         <div className="bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-xl flex items-center gap-2 border border-white/10">
                           <Clock className="w-3.5 h-3.5 text-red-500" />
                           <span className="text-[11px] font-black">{item.duration}</span>
                         </div>
                         <div className="bg-red-600 px-4 py-1.5 rounded-xl flex items-center gap-2 shadow-lg">
                           <Languages className="w-3.5 h-3.5" />
                           <span className="text-[11px] font-black uppercase">{item.language}</span>
                         </div>
                      </div>
                    </div>
                    <CardContent className="p-10 flex-1 flex flex-col justify-between space-y-6">
                      <div>
                        <div className="flex items-center gap-2 text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-4">
                          <Calendar className="w-3.5 h-3.5" /> {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                        <h3 className="text-2xl font-black line-clamp-2 leading-tight uppercase tracking-tighter italic mb-4 group-hover:text-red-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-[0.2em] italic">{item.channel}</p>
                      </div>
                      
                      <div className="flex items-center justify-between pt-8 border-t border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="px-4 py-1.5 rounded-full bg-neutral-900 border border-white/10 text-[9px] font-black uppercase tracking-widest text-neutral-400 italic">
                             {item.mode} synthesis
                          </div>
                        </div>
                        <div className="flex gap-3">
                           <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl hover:bg-red-500/10 text-neutral-600 hover:text-red-500 border border-white/5 transition-all">
                             <Trash2 className="w-5 h-5" />
                           </Button>
                           <Link href={`https://www.youtube.com/watch?v=${item.videoId}`} target="_blank">
                             <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl hover:bg-neutral-800 text-neutral-600 hover:text-white border border-white/5 transition-all">
                               <ExternalLink className="w-5 h-5" />
                             </Button>
                           </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
}
