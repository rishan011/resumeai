"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Save, Settings as SettingsIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      await update({ name }); // Update NextAuth session
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("An error occurred while saving your profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-neutral-100 font-sans relative overflow-hidden">
      {/* Ambient Premium Dark Theme Background (Mirrored from Dashboard) */}
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

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 text-sm font-medium">
          <Link href="/dashboard" className="px-4 py-2 rounded-md text-neutral-400 hover:text-white transition-colors">
            My Resumes
          </Link>
          <Link href="/dashboard/cover-letters" className="px-4 py-2 rounded-md text-neutral-400 hover:text-white transition-colors">
            Cover Letters
          </Link>
          <Link href="/dashboard/youtube-summarizer" className="px-4 py-2 rounded-md text-neutral-400 hover:text-white transition-colors leading-tight">
            YouTube Summarizer
          </Link>
          <Link href="/dashboard/job-search" className="px-4 py-2 rounded-md text-neutral-400 hover:text-white transition-colors">
            Job Search
          </Link>
          <div className="px-4 py-2 rounded-md text-white border-b-2 border-indigo-500 bg-white/5 relative">
            Settings
            <div className="absolute inset-0 bg-indigo-500/10 rounded-md -z-10 blur-sm"></div>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" className="hidden sm:flex border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 hover:text-white transition-all shadow-[0_0_20px_rgba(99,102,241,0.15)]">
            <SettingsIcon className="w-4 h-4 mr-2" />
            Preferences
          </Button>
          <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-sm font-medium border border-white/10 text-neutral-300">
            {session?.user?.name?.charAt(0)?.toUpperCase() || session?.user?.email?.charAt(0)?.toUpperCase() || "U"}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6 lg:p-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold tracking-tight text-white mb-3 flex items-center gap-3">
            Account Settings
          </h1>
          <p className="text-neutral-400 text-lg">Manage your profile and application preferences.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <Card className="bg-white/[0.02] border-white/[0.05] shadow-2xl backdrop-blur-md overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
            <CardHeader className="border-b border-white/[0.05] pb-6">
              <CardTitle className="text-2xl text-white">Profile</CardTitle>
              <CardDescription className="text-neutral-400">Update your personal information associated with your account.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSave} className="space-y-6 max-w-xl">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-neutral-300">Email Address (Read-only)</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={session?.user?.email || ""} 
                    disabled 
                    className="bg-[#030303] border-white/10 text-neutral-500 cursor-not-allowed h-12"
                  />
                  <p className="text-xs text-neutral-500 mt-1">Your email address cannot be changed currently.</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-neutral-200">Display Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="bg-[#09090b] border-white/20 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 h-12 transition-all placeholder:text-neutral-600"
                  />
                </div>

                <div className="pt-4 border-t border-white/[0.05] flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={isSaving || !name.trim()}
                    className="h-11 px-8 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/25 transition-all text-md font-medium"
                  >
                    {isSaving ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                          <SettingsIcon className="w-5 h-5" />
                        </motion.div>
                        Saving...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Save className="w-5 h-5" />
                        Save Changes
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
