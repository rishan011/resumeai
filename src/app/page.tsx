"use client";

import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-neutral-950 -z-10" />
      
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-2 text-xl font-bold tracking-tighter">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          Resume<span className="text-indigo-400">AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#templates" className="hover:text-white transition-colors">Templates</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="hidden md:flex hover:bg-white/10 hover:text-white">Log in</Button>
          </Link>
          <Link href="/dashboard">
            <Button className="bg-indigo-600 text-white hover:bg-indigo-700">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-8 border border-indigo-500/20">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Generation 2.0</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
              Bypass the ATS. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Land the interview.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Create a professional, modern resume in minutes. Let our AI optimize your bullet points, craft your summary, and match your profile to job descriptions effortlessly.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-lg rounded-xl shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)]">
                  Build Your Resume <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a href="#templates">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 border-neutral-700 hover:bg-neutral-800 hover:text-white text-lg rounded-xl text-neutral-300">
                  View Templates
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Social Proof */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-20 pt-10 border-t border-neutral-800 flex flex-wrap justify-center gap-12 opacity-60"
          >
            {['No Credit Card Required', 'ATS Optimized', 'Export to PDF/DOCX', 'AI-Powered Rewrite'].map(text => (
              <div key={text} className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                {text}
              </div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Feature Visual Preview */}
      <section id="features" className="container mx-auto px-6 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative max-w-5xl mx-auto rounded-2xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-xl aspect-video overflow-hidden shadow-2xl hidden md:block"
        >
          <div className="absolute inset-0 flex">
            <div className="w-64 border-r border-neutral-800 bg-neutral-900/80 p-6 flex flex-col gap-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-neutral-800" />
                <div className="space-y-2">
                  <div className="h-3 w-20 bg-neutral-700 rounded" />
                  <div className="h-2 w-12 bg-neutral-800 rounded" />
                </div>
              </div>
              <div className="space-y-4">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="flex items-center gap-3 opacity-60">
                    <div className="w-4 h-4 rounded bg-neutral-700" />
                    <div className="h-2 flex-1 bg-neutral-800 rounded" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 p-8 bg-neutral-950/50 relative overflow-hidden flex items-center justify-center">
              <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8 rotate-[-2deg] transform transition-transform hover:rotate-0 duration-500 border border-neutral-200">
                <div className="h-6 bg-neutral-300 rounded w-1/3 mb-4" />
                <div className="h-3 bg-neutral-200 rounded w-1/4 mb-10" />
                <div className="space-y-4 mb-8">
                  <div className="h-2 bg-neutral-200 rounded w-full" />
                  <div className="h-2 bg-neutral-200 rounded w-full" />
                  <div className="h-2 bg-neutral-200 rounded w-4/5" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-4 bg-neutral-300 rounded w-1/4" />
                    <div className="h-3 bg-neutral-200 rounded w-16" />
                  </div>
                  <div className="h-2 bg-neutral-200 rounded w-full" />
                  <div className="h-2 bg-neutral-200 rounded w-full" />
                  <div className="h-2 bg-neutral-200 rounded w-3/4" />
                </div>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-12 right-12 bg-indigo-600 text-white rounded-xl p-4 shadow-2xl flex items-center gap-3 backdrop-blur-md border border-indigo-500/50"
              >
                <Sparkles className="w-5 h-5 text-indigo-200" />
                <div>
                  <div className="text-sm font-bold tracking-wide">Optimized for &quot;Frontend Eng&quot;</div>
                  <div className="text-xs text-indigo-200 mt-0.5">ATS Score increased to 98%</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Templates Section — Dark & Premium */}
      <section id="templates" className="container mx-auto px-6 py-24 border-t border-neutral-800">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Templates</p>
          <h2 className="text-4xl font-bold mb-4">Pick your style.</h2>
          <p className="text-neutral-500 max-w-md mx-auto">Every template is ATS-optimized and fully customizable — colors, fonts, and sections.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

          {/* Modern */}
          <Link href="/dashboard" className="group block">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-neutral-800 group-hover:border-indigo-500/50 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-indigo-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-900 to-indigo-950/40" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 p-6 flex flex-col gap-3">
                <div className="h-1.5 w-24 bg-indigo-500/60 rounded-full" />
                <div className="h-1 w-16 bg-neutral-600 rounded-full" />
                <div className="mt-2 h-px bg-neutral-800 w-full" />
                <div className="flex flex-col gap-1.5 mt-1">
                  <div className="h-1 w-full bg-neutral-800 rounded-full" />
                  <div className="h-1 w-5/6 bg-neutral-800 rounded-full" />
                  <div className="h-1 w-4/6 bg-neutral-800 rounded-full" />
                </div>
                <div className="mt-2 h-px bg-neutral-800 w-full" />
                <div className="flex flex-col gap-1.5 mt-1">
                  <div className="h-1 w-20 bg-indigo-500/40 rounded-full" />
                  <div className="h-1 w-full bg-neutral-800 rounded-full" />
                  <div className="h-1 w-full bg-neutral-800 rounded-full" />
                  <div className="h-1 w-3/4 bg-neutral-800 rounded-full" />
                </div>
                <div className="mt-2 flex gap-2">
                  {[40, 32, 44, 36].map((w, i) => <div key={i} className="h-4 rounded bg-indigo-500/20" style={{width: w}} />)}
                </div>
              </div>
              <div className="absolute inset-0 bg-indigo-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-indigo-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg">Use Template →</span>
              </div>
            </div>
            <div className="mt-4 px-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">Modern</span>
                <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">Popular</span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">Bold header · Color accents</p>
            </div>
          </Link>

          {/* Classic — elevated */}
          <Link href="/dashboard" className="group block md:-translate-y-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-neutral-700 group-hover:border-amber-500/50 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-amber-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-900 to-amber-950/20" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500 opacity-40 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 p-6 flex flex-col gap-3">
                <div className="flex flex-col gap-1 mb-1">
                  <div className="h-2 w-28 bg-neutral-300/20 rounded-full" />
                  <div className="h-1 w-20 bg-neutral-600 rounded-full" />
                </div>
                <div className="h-px bg-neutral-700 w-full" />
                <div className="flex flex-col gap-1.5 mt-1">
                  <div className="h-1 w-24 bg-amber-400/30 rounded-full" />
                  <div className="h-1 w-full bg-neutral-800 rounded-full" />
                  <div className="h-1 w-full bg-neutral-800 rounded-full" />
                  <div className="h-1 w-4/6 bg-neutral-800 rounded-full" />
                </div>
                <div className="h-px bg-neutral-800 w-full mt-2" />
                <div className="flex flex-col gap-1.5 mt-1">
                  <div className="h-1 w-20 bg-amber-400/30 rounded-full" />
                  <div className="h-1 w-full bg-neutral-800 rounded-full" />
                  <div className="h-1 w-full bg-neutral-800 rounded-full" />
                </div>
                <div className="h-px bg-neutral-800 w-full mt-2" />
                <div className="flex flex-col gap-1.5 mt-1">
                  <div className="h-1 w-16 bg-amber-400/30 rounded-full" />
                  <div className="h-1 w-3/4 bg-neutral-800 rounded-full" />
                </div>
              </div>
              <div className="absolute inset-0 bg-amber-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-amber-500 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg">Use Template →</span>
              </div>
            </div>
            <div className="mt-4 px-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">Classic</span>
                <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">⭐ Featured</span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">Traditional · Clean typography</p>
            </div>
          </Link>

          {/* Minimal */}
          <Link href="/dashboard" className="group block">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-neutral-800 group-hover:border-emerald-500/50 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-emerald-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-900 to-emerald-950/20" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex">
                <div className="w-[38%] border-r border-neutral-800/60 p-4 flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-1" />
                  <div className="h-1 w-14 bg-neutral-600 rounded-full" />
                  <div className="h-1 w-10 bg-neutral-700 rounded-full" />
                  <div className="mt-3 flex flex-col gap-1.5">
                    <div className="h-1 w-12 bg-emerald-500/30 rounded-full" />
                    {[1,2,3,4].map(i => <div key={i} className="h-1 w-full bg-neutral-800 rounded-full" />)}
                  </div>
                </div>
                <div className="flex-1 p-4 flex flex-col gap-2">
                  <div className="h-1 w-20 bg-emerald-500/30 rounded-full" />
                  <div className="h-1 w-full bg-neutral-800 rounded-full" />
                  <div className="h-1 w-5/6 bg-neutral-800 rounded-full" />
                  <div className="mt-2 h-1 w-16 bg-emerald-500/30 rounded-full" />
                  {[1,2,3].map(i => <div key={i} className="h-1 w-full bg-neutral-800 rounded-full" />)}
                  <div className="mt-2 h-1 w-14 bg-emerald-500/30 rounded-full" />
                  <div className="h-1 w-3/4 bg-neutral-800 rounded-full" />
                </div>
              </div>
              <div className="absolute inset-0 bg-emerald-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg">Use Template →</span>
              </div>
            </div>
            <div className="mt-4 px-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">Minimal</span>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Sidebar</span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">Two-column · Clean & modern</p>
            </div>
          </Link>

        </div>

        <div className="mt-16 text-center">
          <Link href="/dashboard">
            <Button className="bg-white text-neutral-900 hover:bg-neutral-100 font-semibold px-10 h-12 rounded-xl shadow-lg">
              Start Building Free →
            </Button>
          </Link>
          <p className="text-neutral-600 text-xs mt-3">No credit card required</p>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-6 py-20 border-t border-neutral-800 mb-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-neutral-400">Start for free. Upgrade when you need more power.</p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-2">Basic Plan</h3>
            <div className="text-3xl font-extrabold mb-6">$0 <span className="text-sm font-medium text-neutral-500">/ forever</span></div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-neutral-400"><CheckCircle className="w-4 h-4 mr-3 text-emerald-500" /> 1 AI Resume Generation</li>
              <li className="flex items-center text-neutral-400"><CheckCircle className="w-4 h-4 mr-3 text-emerald-500" /> Standard PDF Export</li>
              <li className="flex items-center text-neutral-400"><CheckCircle className="w-4 h-4 mr-3 text-emerald-500" /> Shareable URL</li>
            </ul>
            <Link href="/dashboard" className="block">
              <Button className="w-full bg-neutral-800 hover:bg-neutral-700 text-white">Start Free</Button>
            </Link>
          </div>
          <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-indigo-600 text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
            <h3 className="text-xl font-bold mb-2 text-indigo-100">Pro Plan</h3>
            <div className="text-3xl font-extrabold mb-6 text-white">$12 <span className="text-sm font-medium text-neutral-400">/ month</span></div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-indigo-200"><CheckCircle className="w-4 h-4 mr-3 text-indigo-400" /> Unlimited AI Generations</li>
              <li className="flex items-center text-indigo-200"><CheckCircle className="w-4 h-4 mr-3 text-indigo-400" /> AI Cover Letter Writer</li>
              <li className="flex items-center text-indigo-200"><CheckCircle className="w-4 h-4 mr-3 text-indigo-400" /> Advanced ATS Keyword Optimizer</li>
            </ul>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg">Upgrade to Pro</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
