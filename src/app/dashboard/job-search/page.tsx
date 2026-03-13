"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Search, Briefcase, MapPin, Loader2, ArrowUpRight, DollarSign, Building, FileText, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

interface Job {
  title: string;
  company: string;
  location: string;
  link: string;
  salary: string;
  description: string;
}

export default function JobSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setIsLoading(true);
    setJobs([]);

    try {
      const res = await fetch("/api/job-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, location }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to search for jobs");
      } else {
        setJobs(data.jobs || []);
        if (data.jobs?.length === 0) {
          toast.info("No jobs found matching your criteria.");
        } else {
          toast.success(`Found ${data.jobs.length} relevant jobs!`);
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-6 py-12 max-w-5xl relative z-10">
      <DashboardAmbientBg accentColor="blue" />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-12 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black mb-4 uppercase tracking-widest">
          <Briefcase className="w-3.5 h-3.5" /> Career Intelligence
        </div>
        <h1 className="text-5xl font-black tracking-tighter text-white mb-4 drop-shadow-md">
          Smart <span className="text-blue-500">Job Hunt</span>
        </h1>
        <p className="text-neutral-400 font-medium text-lg max-w-2xl mx-auto">
          AI-driven discovery that connects your unique skills to the world's best opportunities instantly.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="relative z-10"
      >
        <Card className="bg-[#0A0A0B]/60 backdrop-blur-2xl border-white/[0.08] text-white shadow-[0_0_50px_rgba(59,130,246,0.1)] mb-12 overflow-hidden relative group">
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />
          <CardContent className="pt-8 relative z-10 p-8">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1 relative group/input">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within/input:text-blue-500 transition-colors" />
                <Input 
                  placeholder="Role (e.g. Lead Designer)" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-neutral-900 border-white/[0.1] pl-12 h-14 text-white placeholder:text-neutral-600 focus-visible:ring-blue-500 rounded-xl transition-all font-medium text-base hover:border-blue-500/30"
                />
              </div>
              <div className="md:col-span-1 relative group/input">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within/input:text-blue-500 transition-colors" />
                <Input 
                  placeholder="Location (e.g. Remote)" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-neutral-900 border-white/[0.1] pl-12 h-14 text-white placeholder:text-neutral-600 focus-visible:ring-blue-500 rounded-xl transition-all font-medium text-base hover:border-blue-500/30"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="relative group h-14 bg-white hover:bg-neutral-100 text-neutral-900 font-black rounded-xl transition-all shadow-lg overflow-hidden gap-2 shrink-0 px-8"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span className="relative z-10 flex items-center gap-2">
                       <Search className="w-4 h-4" /> Discover Jobs
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
        {jobs.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 pb-20"
          >
            {jobs.map((job, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="h-full"
              >
                <Card className="h-full bg-[#0A0A0B]/60 backdrop-blur-2xl border-white/10 hover:border-blue-500/50 hover:bg-[#0A0A0B]/80 transition-all duration-500 group overflow-hidden flex flex-col hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] relative">
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent group-hover:via-blue-500 transition-all" />
                  <CardHeader className="p-6 pb-2">
                     <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                          <Building className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="bg-emerald-500/10 text-emerald-500 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest border border-emerald-500/20">New Posting</div>
                     </div>
                     <CardTitle className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors tracking-tight line-clamp-1">{job.title}</CardTitle>
                     <CardDescription className="text-neutral-400 font-bold flex items-center gap-2 text-sm mt-1">
                        {job.company} <span className="text-neutral-700">•</span> <MapPin className="w-3.5 h-3.5 text-blue-500/70" /> {job.location}
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="px-6 py-4 flex-1">
                    <p className="text-neutral-300 leading-relaxed line-clamp-3 mb-6 font-medium text-sm">
                      {job.description}
                    </p>
                    <div className="flex items-center gap-4">
                       <span className="flex items-center gap-2 text-emerald-400 font-black bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-xs tracking-tight shadow-sm">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                       </span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-6 border-t border-white/[0.04] bg-blue-500/5 flex flex-col gap-4">
                    <Button 
                      onClick={() => {
                        toast.success(`Tailoring AI for ${job.title}...`);
                        setTimeout(() => router.push("/dashboard/cover-letters"), 1500);
                      }}
                      className="relative group w-full bg-white text-neutral-900 hover:bg-neutral-100 font-black rounded-xl h-12 gap-2 overflow-hidden shadow-lg shadow-white/5"
                    >
                       <span className="relative z-10 flex items-center gap-2">
                         <Sparkles className="w-4 h-4" /> Tailor with AI
                       </span>
                       <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-neutral-300/40 to-transparent transition-transform duration-1000 ease-in-out" />
                    </Button>
                    <a 
                      href={job.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 text-xs font-black text-neutral-500 hover:text-white transition-colors uppercase tracking-widest"
                    >
                      View Original Posting <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
