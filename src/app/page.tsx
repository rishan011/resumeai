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
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-neutral-900 border-neutral-800 hover:bg-neutral-800 hover:text-white text-lg rounded-xl">
                View Templates
              </Button>
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
          {/* Mockup UI Inner */}
          <div className="absolute inset-0 flex">
            {/* Sidebar */}
            <div className="w-64 border-r border-neutral-800 bg-neutral-900/80 p-6 flex flex-col gap-6 ">
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
            {/* Main Content Area */}
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
               
               {/* AI Glow Effect over mockup */}
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

      {/* Templates Section */}
      <section id="templates" className="container mx-auto px-6 py-20 border-t border-neutral-800">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Stunning Templates</h2>
            <p className="text-neutral-400">Choose from professional layouts designed to pass ATS systems.</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Template 1 — Modern */}
            <Link href="/dashboard" className="group block">
              <div className="aspect-[1/1.414] rounded-xl border border-neutral-800 shadow-xl overflow-hidden relative transition-all duration-300 group-hover:border-indigo-500/60 group-hover:shadow-indigo-500/10 group-hover:shadow-2xl group-hover:-translate-y-1">
                <div className="absolute inset-0 bg-white">
                  {/* Header bar */}
                  <div className="bg-indigo-600 px-4 pt-5 pb-4">
                    <div className="text-white font-bold text-[10px]">ALEX JOHNSON</div>
                    <div className="text-indigo-200 text-[7px] mt-0.5">Senior Software Engineer</div>
                    <div className="flex gap-2 mt-1.5">
                      <div className="text-indigo-200 text-[6px]">alex@email.com</div>
                      <div className="text-indigo-200 text-[6px]">·</div>
                      <div className="text-indigo-200 text-[6px]">San Francisco, CA</div>
                    </div>
                  </div>
                  <div className="px-4 py-3 space-y-3">
                    <div>
                      <div className="text-indigo-600 text-[7px] font-bold uppercase tracking-wider border-b border-indigo-100 pb-0.5 mb-1.5">Experience</div>
                      <div className="text-[7px] font-semibold text-neutral-800">Lead Frontend Engineer · TechCorp</div>
                      <div className="text-[6px] text-neutral-400 mb-1">2021 – Present</div>
                      <div className="space-y-0.5">
                        <div className="flex gap-1 text-[6px] text-neutral-600"><span>·</span><span>Led React migration improving perf by 40%</span></div>
                        <div className="flex gap-1 text-[6px] text-neutral-600"><span>·</span><span>Mentored team of 6 engineers</span></div>
                      </div>
                    </div>
                    <div>
                      <div className="text-indigo-600 text-[7px] font-bold uppercase tracking-wider border-b border-indigo-100 pb-0.5 mb-1.5">Skills</div>
                      <div className="flex flex-wrap gap-1">
                        {["React","TypeScript","Node.js","AWS","Docker"].map(s => (
                          <span key={s} className="px-1 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[6px] font-medium">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-indigo-600 text-[7px] font-bold uppercase tracking-wider border-b border-indigo-100 pb-0.5 mb-1.5">Education</div>
                      <div className="text-[7px] font-semibold text-neutral-800">B.S. Computer Science · Stanford</div>
                      <div className="text-[6px] text-neutral-400">2015 – 2019</div>
                    </div>
                  </div>
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                  <span className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">Use This Template →</span>
                </div>
              </div>
              <div className="mt-3 text-center">
                <div className="font-semibold text-white text-sm">Modern</div>
                <div className="text-neutral-500 text-xs">Bold header · Color accents</div>
              </div>
            </Link>

            {/* Template 2 — Classic (elevated) */}
            <Link href="/dashboard" className="group block transform -translate-y-4">
              <div className="aspect-[1/1.414] rounded-xl border border-amber-500/30 shadow-xl shadow-amber-500/5 overflow-hidden relative transition-all duration-300 group-hover:border-amber-500/60 group-hover:shadow-amber-500/10 group-hover:shadow-2xl group-hover:-translate-y-1">
                <div className="absolute inset-0 bg-white">
                  <div className="px-5 pt-5 pb-3 border-b-2 border-neutral-800">
                    <div className="font-bold text-[11px] text-neutral-900 tracking-widest uppercase">Sarah Mitchell</div>
                    <div className="text-neutral-500 text-[7px] mt-0.5">Product Manager · MBA</div>
                    <div className="flex gap-3 mt-1.5">
                      <div className="text-neutral-400 text-[6px]">sarah@email.com</div>
                      <div className="text-neutral-400 text-[6px]">New York, NY</div>
                    </div>
                  </div>
                  <div className="px-5 py-3 space-y-3">
                    <div>
                      <div className="text-[7px] font-bold uppercase tracking-widest text-neutral-800 mb-1.5">Professional Summary</div>
                      <div className="text-[6px] text-neutral-600 leading-relaxed">Results-driven PM with 8+ years driving product growth at Fortune 500 companies. Proven track record of 30%+ revenue increases.</div>
                    </div>
                    <div>
                      <div className="text-[7px] font-bold uppercase tracking-widest text-neutral-800 border-t border-neutral-200 pt-2 mb-1.5">Experience</div>
                      <div className="text-[7px] font-semibold text-neutral-800">Senior Product Manager · Google</div>
                      <div className="text-[6px] text-neutral-400 mb-1">2020 – Present</div>
                      <div className="space-y-0.5">
                        <div className="flex gap-1 text-[6px] text-neutral-600"><span>▪</span><span>Launched 3 products reaching 10M+ users</span></div>
                        <div className="flex gap-1 text-[6px] text-neutral-600"><span>▪</span><span>Increased retention by 25% through A/B testing</span></div>
                      </div>
                    </div>
                    <div>
                      <div className="text-[7px] font-bold uppercase tracking-widest text-neutral-800 border-t border-neutral-200 pt-2 mb-1">Skills</div>
                      <div className="text-[6px] text-neutral-600">Roadmapping · Agile · SQL · Figma · Stakeholder Management</div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/5 transition-colors flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                  <span className="bg-neutral-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">Use This Template →</span>
                </div>
              </div>
              <div className="mt-3 text-center">
                <div className="font-semibold text-white text-sm flex items-center justify-center gap-1.5">Classic <span className="bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">POPULAR</span></div>
                <div className="text-neutral-500 text-xs">Traditional · Clean layout</div>
              </div>
            </Link>

            {/* Template 3 — Minimal */}
            <Link href="/dashboard" className="group block">
              <div className="aspect-[1/1.414] rounded-xl border border-neutral-800 shadow-xl overflow-hidden relative transition-all duration-300 group-hover:border-emerald-500/60 group-hover:shadow-emerald-500/10 group-hover:shadow-2xl group-hover:-translate-y-1">
                <div className="absolute inset-0 bg-white">
                  <div className="flex h-full">
                    {/* Left sidebar */}
                    <div className="w-[38%] bg-neutral-900 px-3 pt-5 pb-3 flex flex-col gap-3">
                      <div>
                        <div className="w-8 h-8 rounded-full bg-emerald-500 mb-2 flex items-center justify-center text-white font-bold text-[9px]">JL</div>
                        <div className="text-white font-bold text-[8px]">James Liu</div>
                        <div className="text-emerald-400 text-[6px]">UX Designer</div>
                      </div>
                      <div>
                        <div className="text-emerald-400 text-[7px] font-bold uppercase mb-1">Contact</div>
                        <div className="text-neutral-300 text-[6px]">james@email.com</div>
                        <div className="text-neutral-300 text-[6px]">Seattle, WA</div>
                      </div>
                      <div>
                        <div className="text-emerald-400 text-[7px] font-bold uppercase mb-1">Skills</div>
                        <div className="space-y-0.5">
                          {["Figma","Prototyping","User Research","CSS / HTML"].map(s => (
                            <div key={s} className="text-neutral-300 text-[6px] flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0" />{s}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Right content */}
                    <div className="flex-1 px-3 pt-5 pb-3 space-y-3">
                      <div>
                        <div className="text-emerald-600 text-[7px] font-bold uppercase tracking-wider mb-1">Summary</div>
                        <div className="text-[6px] text-neutral-600 leading-relaxed">Award-winning UX Designer with 6 years creating intuitive digital experiences for 50M+ users.</div>
                      </div>
                      <div>
                        <div className="text-emerald-600 text-[7px] font-bold uppercase tracking-wider mb-1.5">Experience</div>
                        <div className="text-[7px] font-semibold text-neutral-800">Sr. UX Designer · Spotify</div>
                        <div className="text-[6px] text-neutral-400 mb-1">2022 – Present</div>
                        <div className="space-y-0.5">
                          <div className="flex gap-1 text-[6px] text-neutral-600"><span>·</span><span>Redesigned onboarding, +22% conversions</span></div>
                          <div className="flex gap-1 text-[6px] text-neutral-600"><span>·</span><span>Led design system used by 40 engineers</span></div>
                        </div>
                      </div>
                      <div>
                        <div className="text-emerald-600 text-[7px] font-bold uppercase tracking-wider mb-1">Education</div>
                        <div className="text-[7px] font-semibold text-neutral-800">BFA Interaction Design</div>
                        <div className="text-[6px] text-neutral-400">Carnegie Mellon · 2018</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">Use This Template →</span>
                </div>
              </div>
              <div className="mt-3 text-center">
                <div className="font-semibold text-white text-sm">Minimal</div>
                <div className="text-neutral-500 text-xs">Two-column · Sidebar layout</div>
              </div>
            </Link>

         </div>
         <div className="mt-12 text-center">
            <Link href="/dashboard">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8">Start Building Your Resume →</Button>
            </Link>
         </div>
      </section>


      {/* Pricing Section (Mock) */}
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
