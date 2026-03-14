"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Save, Settings as SettingsIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
    <main className="max-w-4xl mx-auto p-6 lg:p-12 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10"
      >
        <h1 className="text-4xl font-black tracking-tight text-white mb-3 flex items-center gap-3 italic uppercase">
          Account <span className="text-red-500 font-extrabold">Settings</span>
        </h1>
        <p className="text-neutral-400 text-lg font-medium">Manage your profile and application preferences with ease.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <Card className="bg-[#050505]/80 backdrop-blur-3xl border-white/[0.08] shadow-[0_30px_100px_rgba(255,0,0,0.05)] overflow-hidden relative group rounded-[2.5rem]">
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-50" />
          
          <CardHeader className="border-b border-white/[0.04] pb-8 pt-8 px-8">
            <CardTitle className="text-2xl font-black text-white tracking-tight">Personal Profile</CardTitle>
            <CardDescription className="text-neutral-400 font-medium text-base mt-1">
              Update your identity and account details across the platform.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <motion.form 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              onSubmit={handleSave} 
              className="space-y-8 max-w-xl"
            >
              <motion.div variants={itemVariants} className="space-y-3">
                <Label htmlFor="email" className="text-neutral-300 text-sm font-semibold tracking-wide ml-1">Email Address</Label>
                <div className="relative group/input opacity-80">
                  <Input 
                    id="email" 
                    type="email" 
                    value={session?.user?.email || ""} 
                    disabled 
                    className="bg-neutral-900/50 border-white/[0.08] text-neutral-400 cursor-not-allowed h-12 rounded-xl font-medium"
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600 border border-neutral-800 px-2 py-0.5 rounded">Locked</span>
                  </div>
                </div>
                <p className="text-[11px] text-neutral-500 mt-1 font-bold uppercase tracking-widest ml-1">System-verified identifier</p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-3">
                <Label htmlFor="name" className="text-neutral-300 text-sm font-semibold tracking-wide ml-1">Display Name</Label>
                <div className="relative group/input">
                  <Input 
                    id="name" 
                    placeholder="e.g. Alex Rivera" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="bg-neutral-900 border-white/[0.1] text-white focus-visible:ring-red-500 h-12 rounded-xl transition-all group-hover/input:border-red-500/30 font-medium text-base"
                  />
                  <div className="absolute inset-0 rounded-xl bg-red-500/5 opacity-0 group-focus-within/input:opacity-100 pointer-events-none transition-opacity" />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-4 border-t border-white/[0.04] flex justify-end">
                <Button 
                  type="submit" 
                  disabled={isSaving || !name.trim()}
                  className="relative group h-12 px-10 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl text-base shadow-[0_0_30px_rgba(239,68,68,0.3)] transition-all overflow-hidden gap-2"
                >
                  {isSaving ? (
                    <span className="relative z-10 flex items-center gap-2">
                       <Loader2 className="w-5 h-5 animate-spin" />
                       Updating Protocol...
                    </span>
                  ) : (
                    <>
                      <span className="relative z-10 flex items-center gap-2">
                        <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Save Sync Settings
                      </span>
                      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out" />
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.form>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
