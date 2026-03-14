"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Logo } from "@/components/brand/Logo";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
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

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        action: "login"
      });

      if (result?.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Logged in successfully!");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-transparent grain-overlay">

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="z-10"
      >
        <Link href="/" className="hover:opacity-80 transition-all">
          <Logo size="lg" />
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md z-10"
      >
        <Card className="bg-[#0A0A0B]/40 backdrop-blur-3xl border-white/[0.05] text-white shadow-[0_0_80px_rgba(239,68,68,0.05)] overflow-hidden relative group rounded-[2.5rem]">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent opacity-50" />
          
          <CardHeader className="space-y-1 text-center pb-8 border-b border-white/[0.04]">
            <CardTitle className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">Welcome back</CardTitle>
            <CardDescription className="text-neutral-400 font-medium text-base">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            <motion.form 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              onSubmit={handleSubmit} 
              className="space-y-5"
            >
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="email" className="text-neutral-300 text-sm font-semibold tracking-wide ml-1">Email Address</Label>
                <div className="relative group/input">
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="hello@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-neutral-900/50 border-white/[0.08] text-white placeholder:text-neutral-600 focus-visible:ring-indigo-500 h-12 rounded-xl transition-all group-hover/input:border-indigo-500/30"
                  />
                  <div className="absolute inset-0 rounded-xl bg-indigo-500/5 opacity-0 group-focus-within/input:opacity-100 pointer-events-none transition-opacity" />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <Label htmlFor="password" className="text-neutral-300 text-sm font-semibold tracking-wide">Password</Label>
                  <Link href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium">Forgot password?</Link>
                </div>
                <div className="relative group/input">
                  <Input 
                    id="password" 
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-neutral-900/50 border-white/[0.08] text-white placeholder:text-neutral-600 focus-visible:ring-indigo-500 h-12 rounded-xl transition-all group-hover/input:border-indigo-500/30"
                  />
                  <div className="absolute inset-0 rounded-xl bg-indigo-500/5 opacity-0 group-focus-within/input:opacity-100 pointer-events-none transition-opacity" />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-2">
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="relative group w-full h-12 bg-white hover:bg-neutral-100 text-neutral-900 font-bold rounded-xl text-base shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all overflow-hidden"
                >
                  {isLoading ? (
                    <span className="relative z-10 flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Authenticating...
                    </span>
                  ) : (
                    <>
                      <span className="relative z-10 flex items-center gap-2">Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-neutral-400/30 to-transparent transition-transform duration-1000 ease-in-out" />
                    </>
                  )}
                </Button>
              </motion.div>

              <motion.div variants={itemVariants} className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/[0.06]" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#0A0A0B] px-4 text-neutral-500 font-bold tracking-widest">Or Secure Login With</span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button 
                  variant="outline" 
                  type="button"
                  onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                  className="w-full h-12 bg-transparent border-white/[0.08] hover:bg-white/5 text-white rounded-xl flex items-center justify-center gap-3 transition-all hover:border-indigo-500/30"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Google Account
                </Button>
              </motion.div>
            </motion.form>
          </CardContent>

          <CardFooter className="flex flex-col gap-6 border-t border-white/[0.04] pt-8 pb-8 text-sm bg-indigo-500/5">
            <div className="flex justify-center w-full text-neutral-400 font-medium">
              Don&apos;t have an account?&nbsp;
              <Link href="/signup" className="text-white hover:text-indigo-400 transition-colors font-bold tracking-wide">
                Create one now
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-8 text-[11px] text-neutral-600 font-medium tracking-widest uppercase z-10"
      >
        © 2024 NeeDee • Secure Cloud Encryption
      </motion.div>
    </div>
  );
}
