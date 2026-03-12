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
        action: "login" // Explicitly tell auth we are logging in
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
    <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient Premium Dark Theme Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <motion.div 
          animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/15 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ y: [0, 20, 0], scale: [1, 1.05, 1] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/15 rounded-full blur-[120px]" 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="z-10"
      >
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter text-white mb-8 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          Resume<span className="text-indigo-400">AI</span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        <Card className="bg-neutral-900/40 backdrop-blur-xl border-white/[0.08] text-white shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
          
          <CardHeader className="space-y-1 text-center pb-6 border-b border-white/[0.04]">
            <CardTitle className="text-2xl font-black tracking-tight drop-shadow-sm">Welcome back</CardTitle>
            <CardDescription className="text-neutral-400 font-medium">
            Enter your email and password to sign in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-neutral-300">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="hello@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-neutral-950 border-neutral-800 text-white placeholder:text-neutral-600 focus-visible:ring-indigo-500 h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-neutral-300">Password</Label>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-neutral-950 border-neutral-800 text-white placeholder:text-neutral-600 focus-visible:ring-indigo-500 h-11"
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="relative group w-full h-12 bg-white hover:bg-neutral-100 text-neutral-900 font-bold rounded-xl text-base mt-4 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all overflow-hidden"
            >
              {isLoading ? (
                <span className="relative z-10 flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </span>
              ) : (
                <>
                  <span className="relative z-10 flex items-center gap-2">Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-neutral-400/20 to-transparent transition-transform duration-700 ease-in-out" />
                </>
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/[0.04]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#030303] px-2 text-neutral-500 font-medium">Or continue with</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full h-11 bg-transparent border-white/[0.08] hover:bg-white/5 text-white rounded-xl flex items-center justify-center gap-3 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-5 border-t border-white/[0.04] pt-6 mt-2 text-sm bg-black/20">
          <div className="flex justify-center w-full text-neutral-400">
            Don't have an account?&nbsp;
            <Link href="/signup" className="text-white hover:text-indigo-300 transition-colors font-semibold drop-shadow-md">
              Sign up
            </Link>
          </div>
          <div className="text-[11px] text-center text-neutral-500 font-medium px-4">
            By continuing, you agree to our <a href="#" className="underline underline-offset-2 hover:text-neutral-300">Terms of Service</a> and <a href="#" className="underline underline-offset-2 hover:text-neutral-300">Privacy Policy</a>.
          </div>
        </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
