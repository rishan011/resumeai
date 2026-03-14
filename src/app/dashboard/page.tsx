"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus, MoreVertical, Trash2, Edit3, Eye, Clock, Copy, Settings, Loader2 } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { UpgradeModal } from "@/components/UpgradeModal";

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();
  const [resumes, setResumes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await fetch("/api/resumes");
        if (res.ok) {
          const data = await res.json();
          setResumes(data);
        } else {
          toast.error("Failed to load resumes");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("An error occurred while loading resumes");
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchResumes();
    }
  }, [session]);

  const handleDelete = async (id: string, title: string) => {
    try {
      const res = await fetch(`/api/resumes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setResumes(prev => prev.filter(r => r.id !== id));
        toast.success(`"${title}" deleted successfully.`);
      } else {
        toast.error("Failed to delete resume");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred while deleting");
    }
  };

  const handleCreateNew = async () => {
    try {
      const res = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "My New Resume",
          content: JSON.stringify({
            personalInfo: { fullName: session?.user?.name || "", email: session?.user?.email || "" },
            experience: [],
            education: [],
            skills: [],
            projects: [],
            summary: ""
          })
        }),
      });

      if (res.ok) {
        const newResume = await res.json();
        router.push(`/builder/${newResume.id}`);
      } else {
        toast.error("Failed to create new resume");
      }
    } catch (error) {
      console.error("Create error:", error);
      toast.error("An error occurred while creating");
    }
  };

  const handleDuplicate = async (resume: any) => {
    try {
      const res = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `${resume.title} (Copy)`,
          content: resume.content,
        }),
      });

      if (res.ok) {
        const newResume = await res.json();
        setResumes(prev => [...prev, newResume]);
        toast.success(`"${resume.title}" duplicated successfully.`);
      } else {
        toast.error("Failed to duplicate resume");
      }
    } catch (error) {
      console.error("Duplicate error:", error);
      toast.error("An error occurred while duplicating");
    }
  };

  return (
    <main className="container mx-auto px-6 py-12 max-w-7xl relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8"
      >
        <div className="flex-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="h-0.5 w-12 bg-red-500 rounded-full" />
            <span className="text-red-500 font-bold tracking-[0.2em] text-[10px] uppercase">Your Portfolio</span>
          </motion.div>
          <h1 className="text-5xl font-black tracking-tighter text-white mb-4 drop-shadow-2xl italic uppercase">
            My <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Resumes</span>
          </h1>
          <p className="text-neutral-400 text-lg font-medium max-w-xl leading-relaxed">
            Craft your professional story with precision. Manage, edit, and export your premium resumes from your central hub.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            onClick={handleCreateNew}
            className="group relative overflow-hidden bg-red-600 hover:bg-red-500 text-white font-black h-14 px-8 rounded-2xl transition-all shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] border-none uppercase tracking-widest text-xs"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="flex items-center gap-2 relative z-10">
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span>Create New Resume</span>
            </div>
          </Button>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 rounded-[2.5rem] bg-[#050505]/40 border border-white/[0.03] backdrop-blur-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent" />
          <Loader2 className="w-12 h-12 text-red-500 animate-spin mb-6 relative z-10" />
          <p className="text-neutral-400 font-bold tracking-widest text-xs uppercase animate-pulse relative z-10">Synchronizing workspace</p>
        </div>
      ) : (
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="show" 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* New Resume Placeholder */}
          <motion.div variants={itemVariants}>
            <button
              onClick={handleCreateNew}
              className="w-full h-full min-h-[320px] rounded-[2.5rem] bg-[#050505]/40 border-2 border-dashed border-white/[0.06] hover:border-red-500/50 hover:bg-red-500/[0.03] transition-all duration-500 group flex flex-col items-center justify-center p-8 text-center relative overflow-hidden backdrop-blur-3xl shadow-inner"
            >
              <div className="w-20 h-20 rounded-3xl bg-neutral-900/50 border border-white/[0.05] flex items-center justify-center mb-6 border-b-2 group-hover:scale-110 group-hover:bg-red-600/10 group-hover:border-red-500/40 transition-all duration-500 shadow-xl group-hover:shadow-red-500/20">
                <Plus className="w-10 h-10 text-neutral-600 group-hover:text-red-500 transition-colors" />
              </div>
              <h3 className="font-black text-xl text-neutral-300 mb-2 group-hover:text-white transition-colors uppercase italic">Start Fresh</h3>
              <p className="text-sm text-neutral-500 max-w-[160px] font-medium leading-relaxed group-hover:text-neutral-400 transition-colors">Build a new masterpiece from scratch</p>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </button>
          </motion.div>

          {/* Real Resumes */}
          <AnimatePresence mode="popLayout">
            {resumes.map((resume) => (
              <motion.div 
                key={resume.id} 
                variants={itemVariants} 
                layout 
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                whileHover={{ y: -10 }} 
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group h-full"
              >
                <div className="flex flex-col h-full rounded-[2.5rem] bg-[#050505]/60 border border-white/[0.06] hover:border-red-500/40 backdrop-blur-3xl transition-all duration-500 overflow-hidden relative shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] hover:shadow-[0_30px_100px_rgba(255,0,0,0.08)]">
                  {/* Premium Grain Effect */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                  
                  {/* Subtle Gradient Glow */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/10 rounded-full blur-[100px] group-hover:bg-red-500/20 transition-colors duration-700" />
                  
                  <div className="p-8 pb-4 relative z-10">
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-14 h-18 bg-neutral-900 border border-white/[0.08] rounded-2xl flex flex-col p-2 gap-1.5 shadow-inner group-hover:border-red-500/30 transition-colors overflow-hidden relative">
                         <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />
                         <div className="h-1.5 w-full bg-neutral-800 rounded-full" />
                         <div className="h-1.5 w-[80%] bg-neutral-800 rounded-full" />
                         <div className="h-1.5 w-full bg-neutral-800 rounded-full" />
                         <div className="h-1.5 w-full bg-neutral-800 rounded-full" />
                         <div className="h-1.5 w-[60%] bg-neutral-800 rounded-full" />
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger className="h-10 w-10 rounded-xl hover:bg-white/5 border-none p-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                          <MoreVertical className="h-5 w-5 text-neutral-400" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 bg-[#050505] border-white/[0.08] backdrop-blur-3xl p-2 rounded-2xl shadow-2xl">
                          <DropdownMenuItem className="cursor-pointer rounded-xl h-11 focus:bg-red-600 focus:text-white font-bold" onClick={() => router.push(`/builder/${resume.id}`)}>
                            <Edit3 className="w-4 h-4 mr-3" /> Edit Resume
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer rounded-xl h-11 focus:bg-white/5 focus:text-white font-bold" onClick={() => router.push(`/r/${resume.id}`)}>
                            <Eye className="w-4 h-4 mr-3" /> Preview Link
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer rounded-xl h-11 focus:bg-white/5 focus:text-white font-bold" onClick={() => handleDuplicate(resume)}>
                            <Copy className="w-4 h-4 mr-3" /> Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-white/[0.05] mx-2 my-2" />
                          <DropdownMenuItem className="cursor-pointer rounded-xl h-11 text-red-500 focus:bg-red-500/10 focus:text-red-400 font-bold" onClick={() => handleDelete(resume.id, resume.title)}>
                            <Trash2 className="w-4 h-4 mr-3" /> Delete Permanently
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <h3 className="text-2xl font-black text-white group-hover:text-red-500 transition-colors mb-3 tracking-tight truncate leading-tight italic uppercase">
                      {resume.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-6">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                      <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest leading-none">
                        Edited {formatDate(resume.updatedAt)}
                      </p>
                    </div>

                    <div className="space-y-2 mt-4">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-black text-neutral-600 mb-1">
                        <span>Sync Status</span>
                        <span className="text-red-500/80">Active</span>
                      </div>
                      <div className="w-full h-1 bg-neutral-950 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.5, ease: "circOut" }}
                          className="h-full bg-gradient-to-r from-red-600 via-red-400 to-red-600" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto p-6 pt-0 relative z-10">
                    <Link href={`/builder/${resume.id}`} className="block">
                      <Button className="w-full bg-white text-black hover:bg-red-600 hover:text-white font-black h-12 rounded-2xl transition-all duration-300 uppercase text-xs tracking-widest shadow-lg">
                        Go to Editor
                      </Button>
                    </Link>
                  </div>
                  
                  {/* Card Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-1000">
                    <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-[35deg] animate-shine" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </main>
  );
}
