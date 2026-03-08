"use client";

import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, CheckCircle, Zap, FileText, Target, BarChart3, Shield, Palette } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090b] text-neutral-50 font-sans antialiased">

      {/* === AMBIENT BACKGROUND === */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-[100px]" />
      </div>

      {/* === NAV === */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            Resume<span className="text-indigo-400">AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-neutral-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#templates" className="hover:text-white transition-colors">Templates</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white hover:bg-white/5">Sign in</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-4">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* === HERO === */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-24 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full mb-8">
          <Zap className="w-3 h-3" /> AI-Powered · ATS-Optimized · Free to Start
        </div>
        <h1 className="text-5xl md:text-[72px] font-black tracking-tight leading-[1.05] mb-6">
          Your resume,<br />
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
            perfected by AI.
          </span>
        </h1>
        <p className="text-lg text-neutral-500 max-w-xl mx-auto mb-10 leading-relaxed">
          Build ATS-beating resumes in minutes. AI writes your bullets, scores your match, and crafts your cover letter — automatically.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="h-12 px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 text-base">
              Build My Resume <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <a href="#templates">
            <Button size="lg" variant="outline" className="h-12 px-8 border-neutral-800 text-neutral-300 hover:bg-neutral-900 hover:text-white rounded-xl text-base">
              See Templates
            </Button>
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-xs text-neutral-600">
          {['No credit card', 'PDF export', 'ATS optimized', 'AI-powered'].map(t => (
            <span key={t} className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" />{t}</span>
          ))}
        </div>
      </section>

      {/* === APP PREVIEW === */}
      <section id="features" className="max-w-6xl mx-auto px-6 pb-28">
        <div className="relative rounded-2xl border border-white/[0.06] bg-neutral-900/40 backdrop-blur overflow-hidden shadow-2xl">
          {/* Window chrome */}
          <div className="flex items-center gap-1.5 px-5 py-3.5 border-b border-white/[0.06]">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
            <div className="ml-4 h-5 w-48 bg-neutral-800 rounded-md" />
          </div>
          <div className="flex min-h-[420px]">
            {/* Sidebar */}
            <div className="w-52 border-r border-white/[0.05] bg-neutral-950/50 p-5 flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-[10px] font-bold">AJ</div>
                <div className="flex flex-col gap-1">
                  <div className="text-[11px] text-white font-semibold">Alex Johnson</div>
                  <div className="text-[9px] text-neutral-500">Senior Engineer</div>
                </div>
              </div>
              <div className="space-y-0.5">
                {[
                  { label: 'Personal Info', icon: '👤' },
                  { label: 'Summary', icon: '📝' },
                  { label: 'Experience', icon: '💼', active: true },
                  { label: 'Education', icon: '🎓' },
                  { label: 'Skills', icon: '⚡' },
                ].map(({ label, icon, active }) => (
                  <div key={label} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-medium cursor-default ${active ? 'bg-indigo-600/25 text-indigo-300 border border-indigo-500/20' : 'text-neutral-500 hover:text-neutral-400'}`}>
                    <span className="text-[10px]">{icon}</span>
                    {label}
                    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-4 border-t border-white/[0.05]">
                <div className="flex items-center gap-2 px-2">
                  <div className="w-5 h-5 rounded bg-amber-500/20 flex items-center justify-center">
                    <span className="text-[8px]">⚡</span>
                  </div>
                  <span className="text-[9px] text-amber-400 font-medium">Upgrade to Pro</span>
                </div>
              </div>
            </div>
            {/* Main Content */}
            <div className="flex-1 p-6 flex items-start justify-center relative bg-neutral-950/30 gap-4">
              {/* Resume Preview Card */}
              <div className="w-[300px] bg-[#1a1a2e] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                {/* Resume Header */}
                <div className="bg-gradient-to-r from-indigo-700/40 to-violet-700/30 border-b border-white/[0.06] px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">Alex Johnson</div>
                      <div className="text-[10px] text-indigo-300 mt-0.5">Senior Software Engineer</div>
                      <div className="text-[9px] text-neutral-400 mt-1">alex@email.com · San Francisco, CA</div>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-indigo-500/20 border border-indigo-400/20 flex items-center justify-center text-sm">AJ</div>
                  </div>
                </div>
                <div className="px-5 py-3 space-y-3">
                  {/* Experience section */}
                  <div>
                    <div className="text-[8px] font-bold text-indigo-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <div className="w-2 h-px bg-indigo-500" /> EXPERIENCE
                    </div>
                    <div className="text-[10px] font-semibold text-neutral-200 mb-0.5">Lead Engineer · TechCorp</div>
                    <div className="text-[8px] text-neutral-500 mb-1">2021 – Present</div>
                    <div className="space-y-0.5">
                      <div className="text-[8px] text-neutral-400 flex gap-1"><span className="text-indigo-400">·</span> Led React migration, improved perf by 40%</div>
                      <div className="text-[8px] text-neutral-400 flex gap-1"><span className="text-indigo-400">·</span> Mentored 6 engineers, reduced bugs by 35%</div>
                    </div>
                  </div>
                  {/* Skills section */}
                  <div className="border-t border-white/[0.05] pt-2.5">
                    <div className="text-[8px] font-bold text-indigo-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <div className="w-2 h-px bg-indigo-500" /> SKILLS
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {['React', 'TypeScript', 'Node.js', 'AWS', 'Docker'].map(s => (
                        <span key={s} className="text-[8px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right panel — AI suggestions */}
              <div className="flex flex-col gap-3 w-[170px]">
                {/* AI suggestion card */}
                <div className="bg-neutral-900 border border-white/[0.07] rounded-xl p-3.5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-md bg-violet-500/20 flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-violet-400" />
                    </div>
                    <span className="text-[9px] font-bold text-violet-300">AI Suggestion</span>
                  </div>
                  <div className="text-[8px] text-neutral-400 leading-relaxed">Add a quantified result to your 2nd bullet point to boost ATS score.</div>
                  <button className="mt-2 text-[8px] font-semibold text-violet-400 hover:text-violet-300">Apply fix →</button>
                </div>
                {/* ATS Score card */}
                <div className="bg-gradient-to-br from-indigo-900/50 to-violet-900/30 border border-indigo-500/25 rounded-xl p-3.5">
                  <div className="text-[8px] text-neutral-400 mb-1">ATS Match Score</div>
                  <div className="text-2xl font-black text-white mb-1">98<span className="text-sm text-indigo-400">%</span></div>
                  <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                    <div className="h-full w-[98%] bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full" />
                  </div>
                  <div className="text-[8px] text-emerald-400 mt-1.5 font-medium">✓ Excellent match</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* === FEATURES GRID === */}
      <section className="max-w-6xl mx-auto px-6 pb-28">
        <div className="text-center mb-14">
          <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-3">What you get</p>
          <h2 className="text-3xl font-bold">Everything to land the job.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Zap, color: 'indigo', title: 'AI Bullet Writer', desc: 'Paste a rough idea, get polished, measurable achievement bullets instantly.' },
            { icon: Target, color: 'violet', title: 'ATS Score Checker', desc: 'Upload any job description and see how well your resume matches — before you apply.' },
            { icon: FileText, color: 'cyan', title: 'Cover Letter AI', desc: 'Generate personalized, job-specific cover letters in under 30 seconds.' },
            { icon: Palette, color: 'rose', title: 'Theme Customizer', desc: 'Choose from 8 accent colors, 6 font styles, and drag-and-drop section reordering.' },
            { icon: Shield, color: 'emerald', title: 'PDF Export', desc: 'Pixel-perfect PDF export that looks professional in every ATS and email client.' },
            { icon: BarChart3, color: 'amber', title: 'Resume Analytics', desc: 'See match scores against multiple job descriptions and improve your hit rate.' },
          ].map(({ icon: Icon, color, title, desc }) => (
            <div key={title} className="group p-6 rounded-2xl border border-white/[0.05] bg-neutral-900/40 hover:bg-neutral-900/70 hover:border-white/10 transition-all duration-200">
              <div className={`w-10 h-10 rounded-xl bg-${color}-500/10 border border-${color}-500/20 flex items-center justify-center mb-4`}>
                <Icon className={`w-5 h-5 text-${color}-400`} />
              </div>
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === TEMPLATES === */}
      <section id="templates" className="max-w-6xl mx-auto px-6 pb-28 border-t border-white/[0.04] pt-24">
        <div className="text-center mb-14">
          <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-3">Templates</p>
          <h2 className="text-3xl font-bold mb-3">Pick your style.</h2>
          <p className="text-neutral-500 text-sm max-w-sm mx-auto">ATS-optimized, fully customizable — colors, fonts, and layout all yours.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">

          {[
            {
              name: 'Modern', badge: 'Popular', badgeColor: 'indigo', desc: 'Bold header · Color accents',
              accent: 'indigo', glow: 'indigo',
              preview: (
                <div className="flex flex-col gap-2.5 p-5">
                  <div className="h-8 bg-indigo-600/40 rounded-lg flex items-end px-3 pb-1.5">
                    <div className="h-1.5 w-16 bg-white/30 rounded" />
                  </div>
                  <div className="h-px bg-white/5 w-full" />
                  {[1,2,3].map(i => <div key={i} className="h-1 w-full bg-neutral-700/60 rounded" />)}
                  <div className="h-px bg-white/5 w-full mt-1" />
                  <div className="h-1 w-14 bg-indigo-400/30 rounded" />
                  {[1,2].map(i => <div key={i} className="h-1 w-full bg-neutral-700/60 rounded" />)}
                  <div className="flex gap-1 mt-1">
                    {[28, 22, 30].map((w, i) => <div key={i} className="h-3 bg-indigo-500/20 rounded" style={{width: w}} />)}
                  </div>
                </div>
              )
            },
            {
              name: 'Classic', badge: '⭐ Featured', badgeColor: 'amber', desc: 'Traditional · Timeless',
              accent: 'amber', glow: 'amber',
              preview: (
                <div className="flex flex-col gap-2.5 p-5">
                  <div className="text-center pb-2 border-b border-white/10">
                    <div className="h-2.5 w-20 bg-neutral-300/20 rounded mx-auto mb-1.5" />
                    <div className="h-1.5 w-16 bg-neutral-600 rounded mx-auto" />
                  </div>
                  <div className="h-1 w-16 bg-amber-400/30 rounded" />
                  {[1,2,3].map(i => <div key={i} className="h-1 w-full bg-neutral-700/60 rounded" />)}
                  <div className="h-px bg-white/5 w-full mt-1" />
                  <div className="h-1 w-16 bg-amber-400/30 rounded" />
                  {[1,2].map(i => <div key={i} className="h-1 w-full bg-neutral-700/60 rounded" />)}
                </div>
              )
            },
            {
              name: 'Minimal', badge: 'Sidebar', badgeColor: 'emerald', desc: 'Two-column · Modern',
              accent: 'emerald', glow: 'emerald',
              preview: (
                <div className="flex gap-0 h-full">
                  <div className="w-[38%] bg-neutral-800/60 p-3 flex flex-col gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/20 mb-0.5" />
                    <div className="h-1.5 w-12 bg-neutral-500 rounded" />
                    <div className="h-px bg-white/5 mt-1" />
                    <div className="h-1 w-10 bg-emerald-400/30 rounded" />
                    {[1,2,3].map(i => <div key={i} className="h-1 w-full bg-neutral-700/60 rounded" />)}
                  </div>
                  <div className="flex-1 p-3 flex flex-col gap-2">
                    <div className="h-1 w-14 bg-emerald-400/30 rounded" />
                    {[1,2].map(i => <div key={i} className="h-1 w-full bg-neutral-700/50 rounded" />)}
                    <div className="h-px bg-white/5 mt-0.5" />
                    <div className="h-1 w-12 bg-emerald-400/30 rounded" />
                    {[1,2,3].map(i => <div key={i} className="h-1 w-full bg-neutral-700/50 rounded" />)}
                  </div>
                </div>
              )
            },
          ].map(({ name, badge, badgeColor, desc, accent, glow, preview }) => (
            <Link key={name} href="/dashboard" className="group block">
              <div className={`relative aspect-[3/4] rounded-2xl overflow-hidden border border-neutral-800 transition-all duration-300 group-hover:border-${accent}-500/40 group-hover:shadow-lg group-hover:shadow-${glow}-500/10 group-hover:-translate-y-1.5`}>
                <div className={`absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-950`} />
                <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-${accent}-500 to-${accent}-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="absolute inset-0">
                  {preview}
                </div>
                <div className="absolute inset-0 bg-neutral-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <span className={`bg-${accent}-600 text-white text-xs font-semibold px-5 py-2 rounded-full shadow-lg`}>Use Template →</span>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between px-0.5">
                <div>
                  <span className="font-semibold text-white text-sm">{name}</span>
                  <p className="text-xs text-neutral-600 mt-0.5">{desc}</p>
                </div>
                <span className={`text-xs text-${badgeColor}-400 bg-${badgeColor}-500/10 border border-${badgeColor}-500/20 px-2 py-0.5 rounded-full`}>{badge}</span>
              </div>
            </Link>
          ))}

        </div>
        <div className="mt-12 text-center">
          <Link href="/dashboard">
            <Button className="bg-white text-neutral-900 hover:bg-neutral-100 font-semibold px-10 h-11 rounded-xl">
              Start Building Free →
            </Button>
          </Link>
          <p className="text-neutral-700 text-xs mt-2.5">No account required to explore</p>
        </div>
      </section>

      {/* === PRICING === */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 pb-28 border-t border-white/[0.04] pt-24">
        <div className="text-center mb-14">
          <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-3xl font-bold mb-3">Simple. Transparent.</h2>
          <p className="text-neutral-500 text-sm">Start free. Upgrade when you&apos;re ready.</p>
        </div>
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Free */}
          <div className="p-7 rounded-2xl border border-white/[0.06] bg-neutral-900/40">
            <div className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-4">Free</div>
            <div className="text-4xl font-black mb-1">$0</div>
            <div className="text-neutral-500 text-sm mb-7">Forever. No credit card.</div>
            <ul className="space-y-3 mb-8">
              {['3 AI resume generations', 'PDF export', 'ATS score checker', 'Shareable link'].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-neutral-400">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />{f}
                </li>
              ))}
            </ul>
            <Link href="/dashboard" className="block">
              <Button className="w-full bg-neutral-800 hover:bg-neutral-700 text-white h-11 rounded-xl">Get Started Free</Button>
            </Link>
          </div>
          {/* Pro */}
          <div className="p-7 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 to-neutral-900/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-xl">POPULAR</div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_60%)]" />
            <div className="relative">
              <div className="text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-4">Pro</div>
              <div className="text-4xl font-black mb-1 text-white">$12<span className="text-lg font-medium text-neutral-500">/mo</span></div>
              <div className="text-neutral-500 text-sm mb-7">Everything in Free, plus:</div>
              <ul className="space-y-3 mb-8">
                {['Unlimited AI generations', 'AI Cover Letter writer', 'Job match optimizer', 'Priority support'].map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-indigo-200">
                    <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white h-11 rounded-xl shadow-lg shadow-indigo-500/20">Upgrade to Pro</Button>
            </div>
          </div>
        </div>
      </section>

      {/* === FOOTER CTA === */}
      <section className="border-t border-white/[0.04] py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to land your dream job?</h2>
          <p className="text-neutral-500 mb-8 text-sm">Join thousands of job seekers who built winning resumes with ResumeAI.</p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 h-12 rounded-xl shadow-lg shadow-indigo-500/20 font-semibold">
              Build Your Resume Now <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="border-t border-white/[0.04] py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            Resume<span className="text-indigo-400">AI</span>
          </div>
          <p className="text-neutral-700 text-xs">© 2025 ResumeAI. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
