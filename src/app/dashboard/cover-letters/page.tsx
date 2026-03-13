"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus, MoreVertical, Trash2, Edit3, Eye, Clock, FileSignature, Copy, Settings } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { UpgradeModal } from "@/components/UpgradeModal";

const initialCoverLetters = [
  { id: "1", targetCompany: "Google", role: "Senior Frontend Engineer", updatedAt: "1 day ago" },
  { id: "2", targetCompany: "Stripe", role: "Product Manager", updatedAt: "3 days ago" },
];

export default function CoverLettersDashboard() {
  const router = useRouter();
  const { data: session } = useSession();
  const [coverLetters, setCoverLetters] = useState(initialCoverLetters);

  const handleDelete = (id: string, company: string) => {
    setCoverLetters(prev => prev.filter(cl => cl.id !== id));
    toast.success(`Cover letter for "${company}" deleted.`);
  };

  const handleDuplicate = (cl: any) => {
    const newCL = {
      ...cl,
      id: Math.random().toString(36).substr(2, 9),
      targetCompany: `${cl.targetCompany} (Copy)`,
      updatedAt: "Just now",
    };
    setCoverLetters([newCL, ...coverLetters]);
    toast.success(`Duplicated cover letter for "${cl.targetCompany}".`);
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
    <main className="container mx-auto px-6 py-12 max-w-6xl relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
      >
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-2 drop-shadow-md">
            Cover <span className="text-indigo-500">Letters</span>
          </h1>
          <p className="text-neutral-300 font-medium text-lg">Manage and generate tailored cover letters using AI.</p>
        </div>
        <Link href="/dashboard/cover-letters/new">
          <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-12 px-6 rounded-xl transition-all shadow-lg shadow-indigo-500/20 gap-2 hover:scale-[1.02]">
            <Plus className="w-5 h-5" />
            Generate Cover Letter
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
          <Link href="/dashboard/cover-letters/new">
            <Card className="h-full min-h-[250px] bg-neutral-900/40 backdrop-blur-sm border-dashed border-2 border-white/[0.08] hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all cursor-pointer flex flex-col items-center justify-center text-center p-8 group shadow-none">
              <div className="w-16 h-16 rounded-full bg-neutral-950/50 border border-white/[0.05] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-indigo-600/20 group-hover:border-indigo-500/30 transition-all duration-300">
                <FileSignature className="w-8 h-8 text-neutral-500 group-hover:text-indigo-400 transition-colors" />
              </div>
              <h3 className="font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">Generate New</h3>
              <p className="text-sm text-neutral-500">Tailor a letter for a new application</p>
            </Card>
          </Link>
        </motion.div>

        {/* Saved Cover Letters */}
        <AnimatePresence>
          {coverLetters.map((cl) => (
            <motion.div key={cl.id} variants={itemVariants} layout exit="exit" whileHover={{ y: -8 }} transition={{ duration: 0.3, ease: "easeOut" }}>
              <Card className="flex flex-col h-full hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.15)] transition-all duration-300 bg-neutral-900/60 backdrop-blur-md border-white/[0.06] hover:border-indigo-500/30 rounded-2xl group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="flex flex-row items-start justify-between pb-2 relative z-10">
                  <div className="w-12 h-16 bg-neutral-950/50 rounded-lg border border-white/[0.08] shadow-inner flex items-center justify-center relative overflow-hidden group-hover:border-indigo-500/40 transition-colors">
                     <div className="absolute top-2 left-2 right-4 h-1 bg-neutral-700 rounded-full group-hover:bg-indigo-500/40 transition-colors" />
                     <div className="absolute top-4 left-2 right-2 h-1 bg-neutral-700 rounded-full group-hover:bg-indigo-500/40 transition-colors" />
                     <div className="absolute top-6 left-2 right-6 h-1 bg-neutral-700 rounded-full group-hover:bg-indigo-500/40 transition-colors" />
                     <div className="absolute top-8 left-2 right-2 h-1 bg-neutral-700 rounded-full group-hover:bg-indigo-500/40 transition-colors" />
                     <div className="absolute top-10 left-2 w-4 h-1 bg-neutral-700 rounded-full group-hover:bg-indigo-500/40 transition-colors" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="h-9 w-9 inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-neutral-800 border-0 focus:outline-none -mr-2 -mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400 hover:text-white">
                      <MoreVertical className="h-5 w-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-neutral-900 border-neutral-800 shadow-xl rounded-xl">
                      <DropdownMenuItem className="cursor-pointer text-neutral-200 focus:bg-neutral-800 focus:text-white" onClick={() => router.push("/dashboard/cover-letters/new")}>
                        <Edit3 className="w-4 h-4 mr-2 text-neutral-400" /> View/Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-neutral-200 focus:bg-neutral-800 focus:text-white" onClick={() => handleDuplicate(cl)}>
                        <Copy className="w-4 h-4 mr-2 text-neutral-400" /> Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-neutral-800" />
                      <DropdownMenuItem className="cursor-pointer text-red-400 focus:text-red-300 focus:bg-red-950/30" onClick={() => handleDelete(cl.id, cl.targetCompany)}>
                        <Trash2 className="w-4 h-4 mr-2" /> Delete Letter
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent className="flex-1 mt-4 relative z-10">
                  <CardTitle className="text-lg mb-1 text-white group-hover:text-indigo-400 transition-colors">{cl.targetCompany}</CardTitle>
                  <div className="text-[13px] font-medium text-indigo-400 mb-2">{cl.role}</div>
                  <div className="flex items-center text-xs text-neutral-400">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    Generated {cl.updatedAt}
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t border-white/[0.04] mt-auto bg-black/20 rounded-b-2xl border-x-0 border-b-0 flex justify-between gap-2 relative z-10 p-4">
                  <Button className="w-full bg-white/5 border border-white/10 hover:bg-neutral-800 text-neutral-300 shadow-sm transition-colors rounded-xl font-medium relative group overflow-hidden" onClick={() => router.push("/dashboard/cover-letters/new")}>
                     <span className="relative z-10 flex items-center"><Eye className="w-4 h-4 mr-2 opacity-70 group-hover:opacity-100 transition-opacity" /> View Letter</span>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
