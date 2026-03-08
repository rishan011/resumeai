"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus, MoreVertical, Trash2, Edit3, Eye, Clock, Copy, Settings } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const initialMockResumes = [
  { id: "1", title: "Frontend Developer Resume", updatedAt: "2 days ago", completion: 100 },
  { id: "2", title: "Product Manager Draft", updatedAt: "1 week ago", completion: 65 },
];

export default function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();
  const [resumes, setResumes] = useState(initialMockResumes);

  const handleDelete = (id: string, title: string) => {
    setResumes(prev => prev.filter(r => r.id !== id));
    toast.success(`"${title}" moved to trash.`);
  };

  const handleDuplicate = (resume: any) => {
    const newResume = {
      ...resume,
      id: Math.random().toString(36).substr(2, 9),
      title: `${resume.title} (Copy)`,
      updatedAt: "Just now",
    };
    setResumes([newResume, ...resumes]);
    toast.success(`Duplicated "${resume.title}".`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-neutral-100 font-sans relative overflow-hidden">
      {/* Ambient Premium Dark Theme Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#030303]">
        {/* Simple Animated Grid */}
        <motion.div 
          animate={{ backgroundPosition: ["0px 0px", "24px 24px"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
        />
        {/* Simple Pulsing Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.08, 0.12, 0.08]
          }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.08, 0.12, 0.08]
          }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-violet-600 rounded-full blur-[120px]" 
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center border-b border-white/[0.04] bg-[#030303]/40 backdrop-blur-xl px-6 shadow-sm">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter mr-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <span className="text-white">Resume</span><span className="text-indigo-400">AI</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-neutral-400 flex-1">
          <Link href="/dashboard" className="text-white relative">
            My Resumes
            <div className="absolute inset-x-0 -bottom-5 h-0.5 bg-indigo-500 rounded-full" />
          </Link>
          <Link href="/dashboard/cover-letters" className="hover:text-white transition-colors">Cover Letters</Link>
          <Link href="/dashboard/settings" className="hover:text-white transition-colors text-neutral-400">Settings</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button className="hidden sm:flex relative group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold shadow-[0_0_20px_rgba(245,158,11,0.2)] border-0 overflow-hidden" onClick={() => toast("Pro features unlock soon!")}>
            <span className="relative z-10">⚡ Upgrade to Pro</span>
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none rounded-full">
              <Avatar className="h-9 w-9 border border-neutral-700 hover:ring-2 ring-indigo-500 ring-offset-2 ring-offset-neutral-950 transition-all cursor-pointer">
                <AvatarFallback className="bg-indigo-600/20 text-indigo-300 font-medium">
                  {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2 bg-neutral-900 border-neutral-800 shadow-xl rounded-xl">
              <div className="px-3 py-2 border-b border-neutral-800 mb-1 text-white">
                <p className="font-medium text-sm truncate">{session?.user?.name || "User"}</p>
                <p className="text-xs text-neutral-400 truncate">{session?.user?.email || "No email"}</p>
              </div>
              <Link href="/dashboard/settings" className="w-full">
                <DropdownMenuItem className="cursor-pointer text-neutral-200 focus:bg-neutral-800 focus:text-white">
                  <Settings className="w-4 h-4 mr-2 text-neutral-400" /> Account Settings
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="bg-neutral-800" />
              <DropdownMenuItem className="cursor-pointer text-red-400 focus:text-red-300 focus:bg-red-950/30" onClick={() => signOut({ callbackUrl: "/" })}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 max-w-6xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white mb-1 drop-shadow-md">My Resumes</h1>
            <p className="text-neutral-400 font-medium">Manage, edit, and export your resumes.</p>
          </div>
          <Link href="/builder/new">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 border-none transition-all hover:scale-[1.02]">
              <Plus className="w-4 h-4 mr-2" />
              Create New Resume
            </Button>
          </Link>
        </motion.div>

        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="show" 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Create New Card Placeholder */}
          <motion.div variants={itemVariants} whileHover={{ y: -5 }} transition={{ ease: "easeOut", duration: 0.2 }}>
            <Link href="/builder/new">
              <Card className="h-full min-h-[280px] bg-neutral-900/40 backdrop-blur-sm border-dashed border-2 border-white/[0.08] hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all cursor-pointer flex flex-col items-center justify-center text-center p-8 group shadow-none">
                <div className="w-16 h-16 rounded-full bg-neutral-950/50 border border-white/[0.05] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-indigo-600/20 group-hover:border-indigo-500/30 transition-all duration-300">
                  <Plus className="w-8 h-8 text-neutral-500 group-hover:text-indigo-400 transition-colors" />
                </div>
                <h3 className="font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">Start from Scratch</h3>
                <p className="text-sm text-neutral-500">Create a brand new resume</p>
              </Card>
            </Link>
          </motion.div>

          {/* Saved Resumes */}
          <AnimatePresence>
            {resumes.map((resume) => (
              <motion.div key={resume.id} variants={itemVariants} layout exit="exit" whileHover={{ y: -8 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                <Card className="flex flex-col h-full hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.15)] transition-all duration-300 bg-neutral-900/60 backdrop-blur-md border-white/[0.06] hover:border-indigo-500/30 rounded-2xl group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardHeader className="flex flex-row items-start justify-between pb-2 relative z-10">
                    <div className="w-12 h-16 bg-neutral-950/50 rounded-lg border border-white/[0.08] shadow-inner flex items-center justify-center relative overflow-hidden group-hover:border-indigo-500/40 transition-colors">
                       <div className="absolute top-2 left-2 right-2 h-1 bg-neutral-700 rounded-full group-hover:bg-indigo-500/40 transition-colors" />
                       <div className="absolute top-4 left-2 right-4 h-1 bg-neutral-700 rounded-full group-hover:bg-indigo-500/40 transition-colors" />
                       <div className="absolute top-6 left-2 right-2 h-1 bg-neutral-700 rounded-full group-hover:bg-indigo-500/40 transition-colors" />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="h-9 w-9 inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-neutral-800 border-0 focus:outline-none -mr-2 -mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400 hover:text-white">
                        <MoreVertical className="h-5 w-5" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 bg-neutral-900 border-neutral-800 shadow-xl rounded-xl">
                        <DropdownMenuItem className="cursor-pointer text-neutral-200 focus:bg-neutral-800 focus:text-white" onClick={() => router.push(`/builder/${resume.id}`)}>
                          <Edit3 className="w-4 h-4 mr-2 text-neutral-400" /> Edit Layout
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-neutral-200 focus:bg-neutral-800 focus:text-white" onClick={() => router.push(`/r/${resume.id}`)}>
                          <Eye className="w-4 h-4 mr-2 text-neutral-400" /> Preview Public Link
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-neutral-200 focus:bg-neutral-800 focus:text-white" onClick={() => handleDuplicate(resume)}>
                          <Copy className="w-4 h-4 mr-2 text-neutral-400" /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-neutral-800" />
                        <DropdownMenuItem className="cursor-pointer text-red-400 focus:text-red-300 focus:bg-red-950/30" onClick={() => handleDelete(resume.id, resume.title)}>
                          <Trash2 className="w-4 h-4 mr-2" /> Delete Resume
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent className="flex-1 mt-4 relative z-10">
                    <CardTitle className="text-lg mb-2 text-white group-hover:text-indigo-400 transition-colors">{resume.title}</CardTitle>
                    <div className="flex items-center text-sm text-neutral-400 mb-4 gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Edited {resume.updatedAt}
                    </div>
                    {/* Progress bar for completion */}
                    <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${resume.completion === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`} 
                        style={{ width: `${resume.completion}%` }} 
                      />
                    </div>
                    <p className="text-xs text-neutral-500 font-medium mt-2 text-right">{resume.completion}% complete</p>
                  </CardContent>
                  <CardFooter className="pt-4 border-t border-white/[0.04] mt-auto bg-black/20 rounded-b-2xl border-x-0 border-b-0 overflow-hidden relative z-10">
                    <Link href={`/builder/${resume.id}`} className="w-full relative group/edit overflow-hidden rounded-xl">
                      <Button className="w-full bg-white/5 hover:bg-indigo-600 hover:text-white text-neutral-300 border-none transition-all duration-300 relative z-10">
                        <Edit3 className="w-4 h-4 mr-2 transition-transform group-hover/edit:scale-110" /> Resume Editing
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}
