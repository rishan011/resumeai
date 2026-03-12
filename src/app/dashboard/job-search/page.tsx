"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Search, Briefcase, MapPin, Loader2, ArrowUpRight, DollarSign, Building, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";

interface Job {
  title: string;
  company: string;
  location: string;
  link: string;
  salary: string;
  description: string;
}

export default function JobSearch() {
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
    <div className="min-h-screen bg-[#030303] text-neutral-100 font-sans relative overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#030303]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.08, 0.05] }} 
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[120px]" 
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
           <Link href="/dashboard/youtube-summarizer" className="hover:text-white transition-colors">YouTube Summarizer</Link>
           <Link href="/dashboard/job-search" className="text-white relative">
             Job Search
             <div className="absolute inset-x-0 -bottom-5 h-0.5 bg-blue-500 rounded-full" />
           </Link>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-5xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold mb-4 uppercase tracking-wider">
            <Briefcase className="w-3 h-3" /> Smart Hunt
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-4 drop-shadow-md">
            AI Job <span className="text-blue-500">Search</span>
          </h1>
          <p className="text-neutral-300 font-medium max-w-2xl mx-auto">
            Find your next opportunity using Firecrawl powered web search and AI parsing.
          </p>
        </motion.div>

        <Card className="bg-neutral-900/40 backdrop-blur-xl border-white/[0.08] text-white shadow-2xl mb-12">
          <CardContent className="pt-8">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <Input 
                  placeholder="Job Title (e.g. Frontend Developer)" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-neutral-950 border-neutral-800 pl-10 h-12 text-white placeholder:text-neutral-600 focus-visible:ring-blue-500"
                />
              </div>
              <div className="md:col-span-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <Input 
                  placeholder="Location (e.g. Remote, NY)" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-neutral-950 border-neutral-800 pl-10 h-12 text-white placeholder:text-neutral-600 focus-visible:ring-blue-500"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Search Opportunities"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <AnimatePresence>
          {jobs.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {jobs.map((job, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full bg-neutral-900/60 backdrop-blur-md border-white/10 hover:border-blue-500/50 hover:bg-neutral-900/80 transition-all duration-300 group overflow-hidden flex flex-col hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                    <CardHeader className="pb-2">
                       <div className="flex justify-between items-start mb-2 text-blue-500">
                          <Building className="w-5 h-5" />
                          <div className="bg-emerald-500/10 text-emerald-500 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">New Posting</div>
                       </div>
                       <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors">{job.title}</CardTitle>
                       <CardDescription className="text-neutral-300 font-medium flex items-center gap-1">
                          {job.company} • <MapPin className="w-3 h-3 text-blue-400" /> {job.location}
                       </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm text-neutral-200 leading-relaxed line-clamp-3 mb-4">
                        {job.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs font-bold">
                         <span className="flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded-md">
                            <DollarSign className="w-3.5 h-3.5" />
                            {job.salary}
                         </span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-4 border-t border-white/[0.04] bg-blue-500/5">
                      <a 
                        href={job.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        View Full Listing <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
