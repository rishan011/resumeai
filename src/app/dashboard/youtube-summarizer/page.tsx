"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
   Youtube, Wand2, Loader2, Sparkles, Languages, 
  Clock, Play, FileText, CheckCircle2, History,
  ArrowRight, Download, Share2, Headphones, Brain,
  ChevronRight, MessageSquare, Info, ShieldCheck,
  Cpu, Globe, RefreshCcw, Copy, Target, TrendingUp,
  Zap, BookOpen, Trash2, Printer, FileDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardAmbientBg } from "@/components/dashboard/DashboardAmbientBg";
import { toast } from "sonner";
import { useReactToPrint } from "react-to-print";
import { SummaryReport } from "@/components/summarizer/SummaryReport";

interface SummaryResult {
  summary: string;
  keyPoints: string[];
  chapters?: { time: string; label: string; info: string }[];
  quotes?: string[];
  viralClips?: { time: string; reason: string }[];
  actionableTakeaways?: string[];
  complexityScore?: string;
  readingTime?: string;
  metadata?: {
    title: string;
    author: string;
    thumbnail: string;
    duration: string;
    chapters?: any[];
  };
  transcript?: string;
}

export default function YouTubeSummarizer() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Intelligence State
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [lang, setLang] = useState("en");
  const [mode, setMode] = useState("detailed"); 

  // Interactive Chat State
  const [chatQuestion, setChatQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [fullTranscript, setFullTranscript] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  // Podcast State (V21 Orion - Web Speech)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Printing State
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef,
  });

  // Fallback state
  const [showManualFallback, setShowManualFallback] = useState(false);
  const [manualTranscript, setManualTranscript] = useState("");

  const handleSummarize = async () => {
    if (!url) return;
    setIsLoading(true);
    setResult(null);
    setIsPlayingAudio(false);
    window.speechSynthesis.cancel();
    setChatHistory([]);
    setShowManualFallback(false);
    
    setCurrentStep(0);
    
    try {
      // Simulate progress steps for a premium feel
      const progressTimer = setInterval(() => {
        setCurrentStep(prev => prev < 2 ? prev + 1 : prev);
      }, 1500);

      const res = await fetch("/api/youtube/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, lang, mode }),
      });

      const data = await res.json();
      clearInterval(progressTimer);

      if (!res.ok) {
        if (data.error === "auto_fetch_failed" || data.error === "extraction_failed" || res.status === 500) {
          setShowManualFallback(true);
          toast.error("Cloud Extraction Paused", { 
            description: "YouTube security is high. Manual protocol engaged for full intelligence." 
          });
        } else {
          toast.error("Extraction Offset", { description: data.message });
        }
      } else {
        setCurrentStep(3); // Jump to final step
        setResult(data);
        if (data.transcript) setFullTranscript(data.transcript);
        toast.success("Intelligence Synchronized");
      }
    } catch (err) {
      setShowManualFallback(true);
      toast.error("Neural Link Severed", { description: "Connection blocked. Switching to manual protocol." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualInject = async () => {
    if (!manualTranscript) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/youtube/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, transcript: manualTranscript, lang, mode, isManual: true }),
      });
      const data = await res.json();
      setResult(data);
      setShowManualFallback(false);
      toast.success("Manual Protocol Complete");
    } catch (err) {
      toast.error("Injection Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePodcast = () => {
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    if (!result?.summary) return;
    
    if (!('speechSynthesis' in window)) {
      toast.error("Speech Synthesis not supported in this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(result.summary);
    
    // Set language from state
    utterance.lang = lang;
    
    const voices = window.speechSynthesis.getVoices();
    // Try to find a voice that matches the selected language
    let voice = voices.find(v => v.lang.startsWith(lang));
    
    // Fallback to premium voices if language-specific voice not found
    if (!voice) {
      voice = voices.find(v => v.name.includes("Google") || v.name.includes("Premium") || v.name.includes("Enhanced")) || voices[0];
    }
    
    if (voice) utterance.voice = voice;
    
    utterance.rate = 0.95;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    speechRef.current = utterance;
    toast.success(`Intelligence Narrator Active (${languages.find(l => l.code === lang)?.name})`);
  };

  const handleExportText = () => {
    if (!result) return;
    const content = `VIDEO INTELLIGENCE REPORT: ${result.metadata?.title || 'Unknown'}\n\nSUMMARY:\n${result.summary}\n\nKEY TAKEAWAYS:\n${result.keyPoints.join('\n- ')}\n\nGenerated by NeeDee Insights V30 Nexus.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexus_report_${result.metadata?.title?.replace(/\s+/g, '_') || 'summary'}.txt`;
    a.click();
    toast.success("Intel Exported to File");
  };

  const handleExportPDF = () => {
    handlePrint();
    toast.success("Preparing Neural PDF...");
  };

  const handleCopy = () => {
    if (!result) return;
    const content = `${result.summary}\n\nKey Insights:\n${result.keyPoints.join('\n- ')}`;
    navigator.clipboard.writeText(content);
    toast.success("Copied to Neural Clipboard");
  };

  const handleAskChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuestion.trim() || !result) return;

    const userQ = chatQuestion;
    setChatQuestion("");
    setChatHistory(prev => [...prev, { role: 'user', content: userQ }]);
    setIsChatLoading(true);

    try {
      const res = await fetch("/api/youtube/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          question: userQ, 
          transcript: fullTranscript || result.summary 
        }),
      });
      const data = await res.json();
      setChatHistory(prev => [...prev, { role: 'ai', content: data.answer }]);
    } catch (err) {
      toast.error("Query Failed");
    } finally {
      setIsChatLoading(false);
    }
  };

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "ml", name: "Malayalam" },
    { code: "ar", name: "Arabic" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "zh", name: "Chinese" },
  ];

  const loadingSteps = [
    { icon: <Cpu className="w-4 h-4 text-red-400" />, text: "Syncing Video Identity..." },
    { icon: <Globe className="w-4 h-4 text-emerald-400" />, text: "Fetching Caption Stream..." },
    { icon: <Headphones className="w-4 h-4 text-blue-400" />, text: "Processing Audio Signal (Fallback)..." },
    { icon: <Brain className="w-4 h-4 text-amber-400" />, text: "Generating AI Intelligence..." }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-red-500/30 font-sans pb-20 overflow-x-hidden">
      <DashboardAmbientBg />
      
      <div className="max-w-[1400px] mx-auto pt-32 px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <motion.div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-black mb-8 uppercase tracking-[0.4em] shadow-[0_0_40px_rgba(239,68,68,0.2)]">
            <Cpu className="w-4 h-4 animate-pulse" /> V21 Orion Cinematic Engine
          </motion.div>
          <h1 className="text-7xl font-black tracking-tighter text-white mb-6">
            NeeDee <span className="bg-gradient-to-r from-red-600 to-rose-400 bg-clip-text text-transparent italic decoration-red-500 underline-offset-8">Insights</span>
          </h1>
          <p className="text-neutral-500 font-medium text-xl max-w-2xl mx-auto leading-relaxed">
            State-of-the-art YouTube intelligence. Multi-modal synthesis with <span className="text-red-500/80 font-black">Neural Overhaul</span>.
          </p>
        </motion.div>

        {/* Persistent Search-Style Input Hub */}
        <div 
          className="max-w-4xl mx-auto mb-16 relative z-30"
        >
          <div className="bg-neutral-900/95 backdrop-blur-2xl border border-white/20 p-2 rounded-[2.5rem] shadow-[0_20px_80px_rgba(0,0,0,0.8)] flex flex-col md:flex-row items-center gap-2 ring-1 ring-white/5">
            <div className="flex-1 w-full relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-red-500 transition-colors">
                <Youtube className="w-6 h-6" />
              </div>
              <Input 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSummarize()}
                placeholder="Paste YouTube Link or Video ID..."
                className="w-full bg-transparent border-none h-18 pl-18 text-lg font-bold placeholder:text-neutral-700 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            
            <div className="h-10 w-px bg-white/5 hidden md:block" />
            
            <div className="flex items-center gap-2 p-2 w-full md:w-auto">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600">
                  <Globe className="w-4 h-4" />
                </div>
                <select 
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="bg-neutral-900/50 border border-white/5 rounded-2xl h-14 pl-12 pr-10 text-[10px] font-black uppercase tracking-widest appearance-none outline-none focus:border-red-500/30 transition-all hover:bg-neutral-800"
                >
                  {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-600">
                   <ChevronRight className="w-4 h-4 rotate-90" />
                </div>
              </div>

              <select 
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="bg-neutral-900/50 border border-white/5 rounded-2xl h-14 px-6 text-[10px] font-black uppercase tracking-widest appearance-none outline-none focus:border-red-500/30 transition-all hover:bg-neutral-800"
              >
                <option value="detailed">Detailed</option>
                <option value="quick">Quick</option>
                <option value="chapters">Chapters</option>
              </select>

              <Button 
                onClick={handleSummarize} 
                disabled={isLoading || !url}
                className="h-14 px-10 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all group overflow-hidden relative active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                {isLoading ? "Synthesizing" : "Summarize"}
              </Button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-6">
             <div className="flex items-center gap-2 text-[10px] font-black text-neutral-600 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Orion Neural Active
             </div>
             <div className="flex items-center gap-2 text-[10px] font-black text-neutral-600 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Zero-Latency Enabled
             </div>
             <div className="flex items-center gap-2 text-[10px] font-black text-neutral-600 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Multi-Modal Sync
             </div>
          </div>
        </div>

        {/* Empty State / Quick-Start Guide */}
        <AnimatePresence>
          {!result && !isLoading && !showManualFallback && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-20 max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 bg-gradient-to-br from-neutral-900 to-[#0A0A0B] border border-white/5 p-12 rounded-[2.5rem] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Brain className="w-64 h-64 -mr-20 -mt-20" />
                  </div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-red-600/10 border border-red-600/20 flex items-center justify-center mb-8">
                      <Zap className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-4xl font-black italic tracking-tighter mb-4">Master Your <span className="text-red-500">Learning Curve</span></h2>
                    <p className="text-neutral-500 text-lg font-medium max-w-md leading-relaxed mb-10">
                      Enter any YouTube link in the intelligence hub above to generate neural reports and interactive insights.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white/50">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Zero-Latency
                       </div>
                       <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white/50">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Multi-Modal Synthesis
                       </div>
                       <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white/50">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Interactive Chat
                       </div>
                       <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white/50">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Actionable Advice
                       </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-neutral-900/30 border border-white/5 p-10 rounded-[2.5rem] flex flex-col justify-center">
                   <h3 className="text-sm font-black uppercase tracking-[0.3em] text-neutral-600 mb-8">Pro Intelligence Tips</h3>
                   <div className="space-y-8">
                      <div className="flex gap-4">
                         <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                           <Target className="w-5 h-5 text-red-500" />
                         </div>
                         <p className="text-xs font-bold text-neutral-400">Use <span className="text-white">Detailed Mode</span> for deep educational technical content.</p>
                      </div>
                      <div className="flex gap-4">
                         <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                           <TrendingUp className="w-5 h-5 text-red-500" />
                         </div>
                         <p className="text-xs font-bold text-neutral-400">Enable <span className="text-white">Podcast Mode</span> to learn while you work or travel.</p>
                      </div>
                      <div className="flex gap-4">
                         <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                           <MessageSquare className="w-5 h-5 text-red-500" />
                         </div>
                         <p className="text-xs font-bold text-neutral-400">Ask the <span className="text-white">Assistant</span> specific questions about timestamps.</p>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Modal Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="w-full max-w-lg bg-neutral-900 border border-white/10 rounded-[3rem] p-12 shadow-[0_0_100px_rgba(239,68,68,0.2)] text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-neutral-800">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: `${(currentStep + 1) * 25}%` }}
                    className="h-full bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.8)]"
                  />
                </div>

                <div className="flex justify-center mb-10">
                  <div className="w-24 h-24 relative">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-b-2 border-red-500 rounded-full"
                    />
                    <div className="absolute inset-4 bg-neutral-950 rounded-[2rem] flex items-center justify-center border border-white/5">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {loadingSteps[currentStep].icon}
                      </motion.div>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-2">Engaging <span className="text-red-500">Orion Protocol</span></h3>
                <p className="text-neutral-500 text-sm font-bold uppercase tracking-widest mb-10">Intelligence Synthesis in Progress</p>

                <div className="space-y-4">
                  {loadingSteps.map((step, i) => (
                    <motion.div 
                      key={i}
                      className={`flex items-center gap-4 p-5 rounded-2xl border transition-all ${
                        currentStep === i 
                          ? 'bg-red-500/10 border-red-500/30 scale-105 shadow-lg' 
                          : i < currentStep 
                            ? 'bg-neutral-950/50 border-emerald-500/20 opacity-50' 
                            : 'bg-neutral-950/20 border-white/5 opacity-20'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        i < currentStep ? 'bg-emerald-500/20 text-emerald-500' : 'bg-white/5 text-neutral-400'
                      }`}>
                        {i < currentStep ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
                      </div>
                      <span className={`text-[11px] font-black uppercase tracking-widest ${
                        currentStep === i ? 'text-white' : i < currentStep ? 'text-emerald-500/80' : 'text-neutral-600'
                      }`}>
                        {step.text}
                      </span>
                      {currentStep === i && (
                        <div className="ml-auto">
                          <Loader2 className="w-4 h-4 text-red-500 animate-spin" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-white/5">
                   <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-[0.3em]">Neural link secured. Do not sever connection.</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fallback Entry Mode */}
        <AnimatePresence>
          {showManualFallback && !isLoading && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="mt-12 max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/30 p-12 rounded-[3rem] backdrop-blur-3xl shadow-[0_30px_100px_rgba(239,68,68,0.1)] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5">
                   <ShieldCheck className="w-64 h-64 -mr-20 -mt-20 text-red-500" />
                </div>
                <div className="relative z-10">
                  <div className="flex gap-8 mb-10 items-start">
                    <div className="w-16 h-16 rounded-[2rem] bg-red-600/20 flex items-center justify-center border border-red-500/30 shadow-[0_0_40px_rgba(239,68,68,0.2)]">
                      <ShieldCheck className="w-8 h-8 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black uppercase tracking-tighter italic mb-2">Direct Neural <span className="text-red-500">Access</span> Required</h3>
                      <p className="text-neutral-500 text-lg font-medium max-w-xl leading-relaxed">
                        YouTube security has paused automation. Use our 30-second manual bridge to proceed with your intelligence report.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                    <div className="space-y-6">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 mb-4">Transcript Harvesting Guide</h4>
                      <div className="space-y-4">
                        {[
                          "Click '... More' below the YouTube video",
                          "Select 'Show Transcript' from the menu",
                          "Copy the entire transcript text",
                          "Paste it in the neural capture field here"
                        ].map((step, i) => (
                          <div key={i} className="flex gap-4 items-center">
                            <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-white shrink-0">
                               0{i+1}
                            </div>
                            <span className="text-xs font-bold text-neutral-400">{step}</span>
                          </div>
                        ))}
                      </div>
                      <Link 
                        href={`https://www.youtube.com/watch?v=${url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/)?.[1] || ''}`}
                        target="_blank"
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors mt-4"
                      >
                         Open Video in New Tab <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                    
                    <div className="bg-neutral-950/50 border border-white/5 p-8 rounded-[2rem] flex flex-col justify-center">
                       <div className="flex items-center gap-4 mb-4">
                          <Brain className="w-6 h-6 text-blue-500" />
                          <span className="text-[10px] font-black uppercase tracking-widest italic">Intelligence Integrity</span>
                       </div>
                       <p className="text-[11px] font-bold text-neutral-500 leading-relaxed uppercase tracking-widest">
                         By injecting data manually, you bypass all IP-based blocks. Our <span className="text-white">Orion Synthesis Engine</span> will process your data with 100% precision.
                       </p>
                    </div>
                  </div>
                  
                  <div className="group relative">
                    <textarea 
                      value={manualTranscript}
                      onChange={(e) => setManualTranscript(e.target.value)}
                      placeholder="Paste your captured YouTube transcript here..."
                      className="w-full bg-neutral-900/50 border border-white/10 rounded-[2rem] p-8 h-48 text-base font-medium outline-none focus:border-red-500/50 transition-all shadow-inner custom-scrollbar"
                    />
                    <div className="absolute bottom-6 right-6 flex gap-4">
                       <Button 
                         variant="ghost" 
                         onClick={() => setShowManualFallback(false)}
                         className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest text-neutral-600 hover:text-white"
                       >
                         Cancel
                       </Button>
                       <Button 
                         onClick={handleManualInject} 
                         disabled={!manualTranscript || manualTranscript.length < 50}
                         className="h-12 px-10 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest text-[10px] shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all active:scale-95 disabled:opacity-30"
                       >
                         Synthesize Now
                       </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result Area - Bento Box Overhaul */}
        <AnimatePresence>
          {result && !isLoading && (
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mt-10 space-y-10">
              <div className="flex justify-start">
                 <Button 
                   onClick={() => setResult(null)} 
                   variant="ghost" 
                   className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 hover:text-white gap-2"
                 >
                   <Trash2 className="w-3 h-3" /> Reset Intelligence Link
                 </Button>
              </div>
              
              {/* Top Bar: Metadata & High-Level Metrics */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                <Card className="lg:col-span-8 bg-[#0A0A0B]/80 backdrop-blur-3xl border-white/5 overflow-hidden rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row">
                    <div className="w-full md:w-96 aspect-video md:aspect-auto relative overflow-hidden group border-r border-white/5">
                      <img src={result.metadata?.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-2xl">
                            <Play className="w-6 h-6 text-white fill-current" />
                         </div>
                      </div>
                    </div>
                    <div className="p-10 flex-1 flex flex-col justify-center gap-6">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                           <span className="bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-red-500/20">V21 Orion Verified</span>
                           <span className="bg-white/5 text-neutral-400 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10 flex items-center gap-2">
                             <Clock className="w-3 h-3" /> {result.metadata?.duration}
                           </span>
                        </div>
                        <h2 className="text-4xl font-black italic tracking-tighter leading-tight mb-2 uppercase group-hover:text-red-400 transition-colors">
                          {result.metadata?.title}
                        </h2>
                        <p className="text-neutral-500 text-sm font-bold uppercase tracking-widest">{result.metadata?.author}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                         <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-black uppercase tracking-widest text-neutral-600">Cognitive Complexity</span>
                            <div className="flex items-center gap-2">
                               <Brain className="w-4 h-4 text-amber-500" />
                               <span className="text-sm font-black text-white">{result.complexityScore || "Intermediate"}</span>
                            </div>
                         </div>
                         <div className="w-px h-10 bg-white/10 hidden md:block" />
                         <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-black uppercase tracking-widest text-neutral-600">Reading Time</span>
                            <div className="flex items-center gap-2">
                               <BookOpen className="w-4 h-4 text-blue-500" />
                               <span className="text-sm font-black text-white">{result.readingTime || "5 min"}</span>
                            </div>
                         </div>
                          <div className="ml-auto flex gap-2">
                            <Button 
                              onClick={handleTogglePodcast} 
                              className={`rounded-2xl gap-3 h-14 transition-all px-8 ${isPlayingAudio ? 'bg-red-600 border-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'bg-white/5 border-white/10 text-white hover:bg-neutral-800'}`}
                            >
                              {isPlayingAudio ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Headphones className="w-4 h-4" />} 
                              <span className="text-[10px] font-black uppercase tracking-widest">
                                {isPlayingAudio ? "Stop Narrator" : `Narrate in ${languages.find(l => l.code === lang)?.name || 'English'}`}
                              </span>
                            </Button>
                          </div>
                      </div>
                    </div>
                </Card>

                <Card className="lg:col-span-4 bg-[#0A0A0B]/80 backdrop-blur-3xl border-white/5 p-8 rounded-[2.5rem] shadow-2xl flex flex-col justify-between">
                   <div>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] italic mb-6 text-neutral-600">Quick Intel Export</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <Button onClick={handleCopy} variant="outline" className="h-16 rounded-2xl border-white/5 bg-white/5 hover:bg-neutral-800 gap-3 group">
                          <Copy className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                          <span className="text-[9px] font-black uppercase">Copy Link</span>
                        </Button>
                        <Button onClick={handleExportText} variant="outline" className="h-16 rounded-2xl border-white/5 bg-white/5 hover:bg-neutral-800 gap-3 group">
                          <FileText className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                          <span className="text-[9px] font-black uppercase">Save Text</span>
                        </Button>
                        <Button onClick={handleExportPDF} variant="outline" className="h-16 rounded-2xl border-white/5 bg-white/5 hover:bg-neutral-800 gap-3 group">
                          <Printer className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                          <span className="text-[9px] font-black uppercase">Save PDF</span>
                        </Button>
                        <Button variant="outline" className="h-16 rounded-2xl border-white/5 bg-white/5 hover:bg-neutral-800 gap-3 group">
                          <Share2 className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                          <span className="text-[9px] font-black uppercase">Share Report</span>
                        </Button>
                        <Link href="/dashboard/youtube-summarizer/history" className="contents">
                          <Button variant="outline" className="h-16 rounded-2xl border-white/5 bg-white/5 hover:bg-neutral-800 gap-3 group">
                            <History className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                            <span className="text-[9px] font-black uppercase">Vault</span>
                          </Button>
                        </Link>
                      </div>
                   </div>
                   <div className="pt-6 mt-6 border-t border-white/5">
                      <p className="text-[10px] font-bold text-neutral-600 leading-relaxed uppercase tracking-widest">Reports are encrypted & synced across NeeDee devices.</p>
                   </div>
                </Card>
              </div>

              {/* Main Intelligence Grid - Bento Style */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* 1. Primary Summary Card */}
                <div className="lg:col-span-8 space-y-10">
                   <Card className="bg-[#0A0A0B]/80 backdrop-blur-3xl border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden">
                      <div className="p-10 border-b border-white/5 bg-neutral-950/20 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-red-600/10 border border-red-600/20 flex items-center justify-center">
                               <Sparkles className="w-6 h-6 text-red-500" />
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tighter italic">Orion Neural Summary</h3>
                         </div>
                      </div>
                      <div className="p-10">
                        <p className="text-xl text-neutral-300 leading-relaxed font-medium first-letter:text-6xl first-letter:font-black first-letter:mr-4 first-letter:float-left first-letter:text-red-600 first-letter:leading-none">
                          {result.summary}
                        </p>
                      </div>
                   </Card>

                   {/* 2. Actionable Takeaways & Key Points Bento */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <Card className="bg-emerald-500/5 border-emerald-500/10 border p-10 rounded-[2.5rem] shadow-xl">
                         <h4 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-emerald-500 mb-8">
                           <Target className="w-5 h-5" /> Actionable Next Steps
                         </h4>
                         <div className="space-y-6">
                            {(result.actionableTakeaways || ["Synthesizing actionable steps...", "Identifying practical applications..."]).map((takeaway, i) => (
                              <div key={i} className="flex gap-4 p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/10">
                                 <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center text-[10px] font-black text-black shrink-0">
                                   0{i+1}
                                 </div>
                                 <p className="text-sm font-bold leading-relaxed text-emerald-100/80">{takeaway}</p>
                              </div>
                            ))}
                         </div>
                      </Card>

                      <Card className="bg-blue-500/5 border-blue-500/10 border p-10 rounded-[2.5rem] shadow-xl">
                         <h4 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-blue-500 mb-8">
                           <Zap className="w-5 h-5" /> Key Insights Hub
                         </h4>
                         <div className="space-y-5">
                            {result.keyPoints.map((point, i) => (
                              <div key={i} className="flex items-start gap-3 group">
                                 <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 group-hover:translate-x-1 transition-transform" />
                                 <p className="text-sm font-bold text-neutral-300 leading-snug">{point}</p>
                              </div>
                            ))}
                         </div>
                      </Card>
                   </div>
                </div>

                {/* 3. Timeline & Assistant Bento */}
                <div className="lg:col-span-4 space-y-10">
                   {/* Chapter Timeline */}
                   <Card className="bg-[#0A0A0B]/80 backdrop-blur-3xl border-white/5 p-8 rounded-[2.5rem] shadow-2xl">
                      <h4 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 mb-8">
                        <Target className="w-4 h-4 text-red-500" /> Advanced Segmentation (Parts)
                      </h4>
                      <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                         {result.chapters && result.chapters.length > 0 ? result.chapters.map((chapter, i) => (
                           <div key={i} className="relative pl-6 border-l border-white/5 pb-6 last:pb-0">
                              <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-blue-600 border-2 border-[#0A0A0B]" />
                              <div className="bg-neutral-900/40 p-4 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer">
                                 <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1 block">{chapter.time}</span>
                                 <p className="text-sm font-black italic tracking-tighter uppercase mb-1">{chapter.label}</p>
                                 <p className="text-[10px] text-neutral-500 font-bold leading-tight">{chapter.info}</p>
                              </div>
                           </div>
                         )) : (
                           <div className="text-center py-10 opacity-20 italic text-xs">No timed segments found.</div>
                         )}
                      </div>
                   </Card>

                   {/* Interaction Lab */}
                   <Card className="bg-[#0A0A0B]/80 backdrop-blur-3xl border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[550px]">
                      <div className="p-8 border-b border-white/5 bg-blue-600/5 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center">
                               <MessageSquare className="w-5 h-5 text-blue-500" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest italic">Nexus Assistant</span>
                         </div>
                         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      
                      <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                         {chatHistory.length === 0 ? (
                           <div className="h-full flex flex-col justify-center gap-6">
                              <div className="text-center opacity-30 italic text-xs mb-4">Neural Link Active. Ask anything about this video.</div>
                              <div className="grid grid-cols-1 gap-3">
                                 {["What are the main takeaways?", "Summarize the conclusion.", "Can you explain the technical parts?"].map((q, i) => (
                                   <Button 
                                     key={i} 
                                     variant="outline" 
                                     onClick={() => { setChatQuestion(q); }}
                                     className="justify-start h-12 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white/5 border-white/5 hover:bg-neutral-800 text-neutral-400 hover:text-white"
                                   >
                                     <Sparkles className="w-3 h-3 mr-3 text-red-500" /> {q}
                                   </Button>
                                 ))}
                              </div>
                           </div>
                         ) : (
                           chatHistory.map((chat, i) => (
                             <motion.div 
                               key={i} 
                               initial={{ opacity: 0, scale: 0.95 }} 
                               animate={{ opacity: 1, scale: 1 }}
                               className={`flex flex-col ${chat.role === 'user' ? 'items-end' : 'items-start'}`}
                             >
                                <div className={`max-w-[90%] p-4 rounded-2xl text-[13px] font-bold ${chat.role === 'user' ? 'bg-white text-black rounded-tr-none' : 'bg-neutral-900 border border-white/5 rounded-tl-none shadow-xl'}`}>
                                  {chat.content}
                                </div>
                             </motion.div>
                           ))
                         )}
                         {isChatLoading && (
                           <div className="flex items-center gap-3 text-[9px] font-black text-blue-400">
                              <Loader2 className="w-3 h-3 animate-spin" /> THINKING...
                           </div>
                         )}
                      </div>

                      <form onSubmit={handleAskChat} className="p-6 border-t border-white/5 bg-neutral-950/40">
                         <div className="relative">
                            <Input 
                              value={chatQuestion}
                              onChange={(e) => setChatQuestion(e.target.value)}
                              placeholder="Query the video..."
                              className="bg-neutral-900/50 border-white/10 h-14 pr-16 rounded-2xl font-bold italic text-sm"
                            />
                            <button type="submit" className="absolute right-2 top-2 h-10 w-10 bg-white rounded-xl flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-all">
                               <ArrowRight className="w-4 h-4" />
                            </button>
                         </div>
                      </form>
                   </Card>
                </div>
              </div>

              {/* Quotes & Viral Highlights Bento Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                 {result.quotes && result.quotes.length > 0 && (
                   <Card className="bg-neutral-900/20 border-white/5 border p-10 rounded-[2.5rem]">
                      <h4 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-amber-500 mb-10">
                         <Sparkles className="w-5 h-5" /> Neural Quote Collection
                      </h4>
                      <div className="grid grid-cols-1 gap-8">
                         {result.quotes.slice(0, 3).map((quote, i) => (
                           <div key={i} className="relative pl-12">
                              <span className="absolute left-0 top-0 text-6xl text-amber-500/20 font-serif leading-none italic">“</span>
                              <p className="text-lg font-medium text-neutral-300 italic leading-relaxed">{quote}</p>
                           </div>
                         ))}
                      </div>
                   </Card>
                 )}

                 {result.viralClips && result.viralClips.length > 0 && (
                   <Card className="bg-rose-500/5 border-rose-500/10 border p-10 rounded-[2.5rem]">
                      <h4 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-rose-500 mb-10">
                         <TrendingUp className="w-5 h-5" /> High-Engagement Clips
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {result.viralClips.map((clip, i) => (
                           <div key={i} className="bg-neutral-950 p-6 rounded-3xl border border-white/5 hover:border-rose-500/40 transition-all group">
                              <div className="flex items-center justify-between mb-4">
                                 <span className="bg-rose-500/10 text-rose-500 px-3 py-1 rounded-lg text-[10px] font-black">{clip.time}</span>
                                 <Play className="w-4 h-4 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                              <p className="text-xs font-bold text-neutral-400 group-hover:text-white transition-colors">{clip.reason}</p>
                           </div>
                         ))}
                      </div>
                   </Card>
                 )}
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hidden Printable Report */}
      <div className="hidden">
        {result && (
          <SummaryReport 
            ref={contentRef} 
            result={result} 
            langName={languages.find(l => l.code === lang)?.name || "English"} 
          />
        )}
      </div>
    </main>
  );
}
