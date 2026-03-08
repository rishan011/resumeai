"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sparkles, ArrowRight, CheckCircle, Zap, FileText,
  Target, BarChart3, Shield, Palette, ChevronRight
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
/* ─── Slide data ─────────────────────────────────────────────── */
const SLIDES = [
  {
    id: "builder",
    tag: "Resume Builder",
    icon: FileText,
    color: "indigo",
    title: "Build your resume live",
    description: "Fill in your details section by section. AI enhances each bullet point in real time.",
  },
  {
    id: "ats",
    tag: "ATS Scorer",
    icon: Target,
    color: "violet",
    title: "See your ATS match score",
    description: "Paste any job description and get an instant score showing how well your resume matches.",
  },
  {
    id: "coverletter",
    tag: "Cover Letter AI",
    icon: Sparkles,
    color: "cyan",
    title: "Generate cover letters instantly",
    description: "One click to produce a fully personalized, professional cover letter for any role.",
  },
];

/* ─── Slide Screens ──────────────────────────────────────────── */
function BuilderSlide() {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/[0.05] bg-neutral-950/60 p-6 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">AJ</div>
          <div>
            <div className="text-sm text-white font-semibold">Alex Johnson</div>
            <div className="text-[11px] text-neutral-500 mt-0.5">Senior Engineer</div>
          </div>
        </div>
        <div className="space-y-1 mt-2">
          {[
            { label: "Personal Info", icon: "👤" },
            { label: "Summary", icon: "📝" },
            { label: "Experience", icon: "💼", active: true },
            { label: "Education", icon: "🎓" },
            { label: "Skills", icon: "⚡" },
          ].map(({ label, icon, active }) => (
            <div key={label} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium ${active ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/20" : "text-neutral-600"}`}>
              <span className="text-sm">{icon}</span>{label}
              {active && <div className="ml-auto w-2 h-2 rounded-full bg-indigo-400" />}
            </div>
          ))}
        </div>
        <div className="mt-auto pt-4 border-t border-white/[0.05]">
          <div className="flex items-center gap-2 px-2">
            <div className="w-5 h-5 rounded bg-amber-500/20 flex items-center justify-center text-[10px]">⚡</div>
            <span className="text-[11px] text-amber-400 font-semibold">Upgrade to Pro</span>
          </div>
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 p-8 flex items-start gap-6 bg-neutral-950/20">
        {/* Resume card */}
        <div className="flex-1 bg-[#13131f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl h-full">
          <div className="bg-gradient-to-r from-indigo-700/40 to-violet-700/30 border-b border-white/[0.06] px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-base font-bold text-white mb-1">Alex Johnson</div>
                <div className="text-xs text-indigo-300 font-medium">Senior Software Engineer</div>
                <div className="text-[10px] text-neutral-400 mt-1">alex@email.com · San Francisco, CA</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/20 flex items-center justify-center text-sm font-bold text-indigo-300">AJ</div>
            </div>
          </div>
          <div className="px-6 py-5 space-y-5">
            <div>
              <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <div className="w-3 h-px bg-indigo-500" /> EXPERIENCE
              </div>
              <div className="text-xs font-semibold text-neutral-200 mb-0.5">Lead Engineer · TechCorp</div>
              <div className="text-[10px] text-neutral-500 mb-2.5">2021 – Present</div>
              <div className="space-y-1.5">
                <div className="text-[11px] text-neutral-400 flex gap-1.5 leading-relaxed"><span className="text-indigo-400">·</span> Led React migration across 4 major products, improving core performance by 40%</div>
                <div className="text-[11px] text-neutral-400 flex gap-1.5 leading-relaxed"><span className="text-indigo-400">·</span> Mentored a team of 6 engineers, reducing production bugs by 35% through TDD</div>
              </div>
            </div>
            <div className="border-t border-white/[0.04] pt-4">
              <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <div className="w-3 h-px bg-indigo-500" /> SKILLS
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["React", "TypeScript", "Node.js", "AWS", "Docker", "GraphQL", "Next.js"].map(s => (
                  <span key={s} className="text-[10px] px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div className="w-[240px] flex flex-col gap-4">
          <div className="bg-neutral-900 border border-white/[0.07] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-violet-500/20 flex items-center justify-center"><Sparkles className="w-3.5 h-3.5 text-violet-400" /></div>
              <span className="text-xs font-bold text-violet-300">AI Suggestion</span>
            </div>
            <div className="text-[11px] text-neutral-400 leading-relaxed">Add a quantified business outcome to your 2nd bullet to boost ATS match score by 5%.</div>
            <button className="mt-3 text-[11px] font-semibold text-violet-400 hover:text-violet-300 transition-colors">Apply fix →</button>
          </div>
          <div className="bg-gradient-to-br from-indigo-900/50 to-violet-900/30 border border-indigo-500/25 rounded-xl p-5">
            <div className="text-[10px] font-medium text-indigo-200/70 mb-1 tracking-wide uppercase">ATS Match Score</div>
            <div className="text-4xl font-black text-white mb-1">98<span className="text-lg text-indigo-400">%</span></div>
            <div className="w-full h-1.5 rounded-full bg-neutral-800/80 overflow-hidden mt-3 shadow-inner">
              <div className="h-full w-[98%] bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full" />
            </div>
            <div className="text-[10px] text-emerald-400 mt-2 font-semibold">✓ Excellent match</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AtsSlide() {
  return (
    <div className="flex h-full items-stretch">
      {/* Left: JD input */}
      <div className="w-1/2 border-r border-white/[0.05] p-8 bg-neutral-950/40 flex flex-col gap-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center border border-violet-500/30"><Target className="w-4 h-4 text-violet-400" /></div>
          <span className="text-sm font-bold text-white tracking-wide">Job Description</span>
          <span className="ml-auto text-[10px] font-medium text-neutral-500 bg-neutral-800 px-2.5 py-1 rounded-full border border-white/5">Optional</span>
        </div>
        <div className="flex-1 rounded-2xl border border-white/[0.05] bg-neutral-900/60 p-5 space-y-2.5 overflow-hidden">
          {[
            "We're looking for a Senior Frontend Engineer to lead UI architecture...",
            "Strong experience building robust applications with React and TypeScript...",
            "3+ years of production experience in high-traffic environments...",
            "Experience with modern CI/CD pipelines, Docker containerization...",
            "Excellent communication skills and mentoring experience required..."
          ].map((line, i) => (
            <div key={i} className="text-[11px] text-neutral-400 leading-relaxed font-mono">{line}</div>
          ))}
        </div>
        <button className="self-start text-[11px] font-bold text-violet-300 bg-violet-500/15 border border-violet-500/30 px-5 py-2.5 rounded-xl hover:bg-violet-500/25 transition-colors shadow-lg shadow-violet-500/10">
          ⚡ Analyze Match against Resume →
        </button>
      </div>

      {/* Right: Results */}
      <div className="flex-1 p-8 flex flex-col gap-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30"><BarChart3 className="w-4 h-4 text-emerald-400" /></div>
          <span className="text-sm font-bold text-white tracking-wide">Analysis Results</span>
        </div>

        {/* Score ring visual */}
        <div className="flex items-center gap-6 p-5 bg-neutral-900/50 rounded-2xl border border-white/[0.06] shadow-xl">
          <div className="relative w-24 h-24 flex-shrink-0 drop-shadow-lg">
            <svg viewBox="0 0 40 40" className="w-full h-full -rotate-90">
              <circle cx="20" cy="20" r="16" fill="none" stroke="#1f2937" strokeWidth="3" />
              <circle cx="20" cy="20" r="16" fill="none" stroke="url(#scoreGradLg)" strokeWidth="3" strokeLinecap="round"
                strokeDasharray={`${0.94 * 100.5} 100.5`} />
              <defs>
                <linearGradient id="scoreGradLg" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-black text-white drop-shadow-md">94%</span>
            </div>
          </div>
          <div>
            <div className="text-base font-bold text-white mb-1">Strong Match</div>
            <div className="text-xs text-neutral-400 leading-relaxed">Your resume incorporates 12 out of 13 critical keywords from the job description.</div>
          </div>
        </div>

        {/* Keyword breakdown */}
        <div className="space-y-2 mt-2">
          {[
            { kw: "React", hit: true }, { kw: "TypeScript", hit: true },
            { kw: "Docker", hit: true }, { kw: "Kubernetes", hit: false },
            { kw: "CI/CD", hit: true }, { kw: "Mentoring", hit: true },
          ].map(({ kw, hit }) => (
            <div key={kw} className="flex items-center gap-3 p-1">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${hit ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/20 text-rose-400 border border-rose-500/20"}`}>
                {hit ? "✓" : "✗"}
              </div>
              <span className={`text-xs font-semibold ${hit ? "text-neutral-300" : "text-rose-400"}`}>{kw}</span>
              {!hit && <span className="text-[10px] text-neutral-500 ml-auto border border-neutral-700/50 bg-neutral-800/50 px-2 py-0.5 rounded-md">Missing — add to resume</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CoverLetterSlide() {
  return (
    <div className="flex h-full items-stretch">
      {/* Left: inputs */}
      <div className="w-[300px] border-r border-white/[0.05] p-8 bg-neutral-950/40 flex flex-col gap-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30"><Sparkles className="w-4 h-4 text-cyan-400" /></div>
          <span className="text-sm font-bold text-white tracking-wide">Cover Letter AI</span>
        </div>
        <div className="space-y-4">
          {[
            { label: "Target Company", val: "Google" },
            { label: "Job Role", val: "Senior Frontend Engineer" },
            { label: "Tone of Voice", val: "Professional & Confident" }
          ].map(({ label, val }) => (
            <div key={label}>
              <div className="text-[11px] font-medium text-neutral-500 mb-1.5 uppercase tracking-wider">{label}</div>
              <div className="text-xs text-neutral-200 bg-neutral-900 border border-white/[0.08] rounded-xl px-4 py-3 shadow-inner">{val}</div>
            </div>
          ))}
        </div>
        <button className="mt-auto text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 px-5 py-3.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" /> Generate Letter
        </button>
        <div className="text-[10px] text-neutral-500 text-center font-medium">Generation takes ~5 seconds</div>
      </div>

      {/* Right: generated letter */}
      <div className="flex-1 p-8 bg-neutral-950/20">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">Generated Successfully</span>
          </div>
          <div className="flex gap-2">
            <button className="text-xs font-semibold text-neutral-400 bg-neutral-800 border border-neutral-700 px-4 py-2 rounded-lg hover:bg-neutral-700 hover:text-white transition-colors">Copy to Clipboard</button>
            <button className="text-xs font-semibold text-white bg-indigo-600 border border-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-500 transition-colors shadow-md">Download PDF</button>
          </div>
        </div>
        <div className="bg-[#13131f] border border-white/[0.08] rounded-2xl p-8 h-[calc(100%-48px)] overflow-hidden shadow-2xl">
          <div className="text-[13px] text-neutral-300 leading-[1.8] space-y-4">
            <p className="text-neutral-500 font-mono text-[11px]">March 8, 2025</p>
            <p className="font-bold text-white text-sm">Dear Google Hiring Team,</p>
            <p>I am absolutely thrilled to submit my application for the <span className="text-cyan-400 font-semibold bg-cyan-400/10 px-1 rounded">Senior Frontend Engineer</span> position at Google. Having spent over 6 years crafting robust, scalable web architectures utilizing <span className="text-indigo-400 font-semibold">React</span> and <span className="text-indigo-400 font-semibold">TypeScript</span>, I am confident in my technical capability to drive exceptional user experiences within your ecosystem.</p>
            <p>During my tenure at TechCorp, I spearheaded a comprehensive React migration strategy that resulted in a <span className="text-emerald-400 font-bold text-sm bg-emerald-400/10 px-1 rounded">40%</span> improvement in core web vital metrics. Additionally, I took immense pride in mentoring a cross-functional team of 6 engineers, successfully reducing our production bug rate by 35% through the implementation of rigorous TDD practices.</p>
            <p>Google's commitment to pushing the boundaries of what is possible on the web deeply aligns with my passion for frontend innovation. I would welcome the opportunity to discuss how my background, skills, and drive can contribute to the continued excellence of your engineering team.</p>
            <p className="text-neutral-500 pt-4">Sincerely,<br /><span className="text-white font-medium">Alex Johnson</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}


const SLIDE_COMPONENTS = [BuilderSlide, AtsSlide, CoverLetterSlide];

/* ─── Feature Showcase (interactive split-panel) ─────────────── */
const FEATURES = [
  {
    id: "bullets",
    icon: Zap,
    title: "AI Bullet Writer",
    desc: "Paste a rough idea — AI rewrites it into a punchy, quantified achievement.",
    color: "indigo",
    demo: (
      <div className="space-y-4">
        <div className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-3">Before → After</div>
        <div className="flex flex-col gap-3">
          <div className="p-3 rounded-xl border border-rose-500/20 bg-rose-500/5">
            <div className="text-[10px] text-rose-400 font-semibold mb-1.5">✗ Weak bullet</div>
            <div className="text-xs text-neutral-400">&quot;Helped improve the website performance&quot;</div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2 text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span className="text-[10px] font-bold">AI Rewriting...</span>
            </div>
          </div>
          <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
            <div className="text-[10px] text-emerald-400 font-semibold mb-1.5">✓ AI-optimized</div>
            <div className="text-xs text-neutral-200 leading-relaxed">&quot;Optimized core web vitals, reducing LCP by <span className="text-emerald-400 font-bold">52%</span> and improving Lighthouse score from 64 → <span className="text-emerald-400 font-bold">97</span>, directly boosting SEO ranking.&quot;</div>
          </div>
        </div>
        <button className="w-full mt-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors py-2 rounded-lg">
          Try AI Bullet Writer →
        </button>
      </div>
    ),
  },
  {
    id: "ats",
    icon: Target,
    title: "ATS Score Checker",
    desc: "Instantly see how well your resume matches any job description.",
    color: "violet",
    demo: (
      <div className="space-y-3">
        <div className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-3">Keyword Match Analysis</div>
        <div className="flex items-center gap-4 p-3 bg-neutral-800/50 rounded-xl border border-white/[0.06]">
          <div className="relative w-16 h-16 flex-shrink-0">
            <svg viewBox="0 0 40 40" className="w-full h-full -rotate-90">
              <circle cx="20" cy="20" r="15" fill="none" stroke="#1f2937" strokeWidth="4" />
              <circle cx="20" cy="20" r="15" fill="none" stroke="url(#fg)" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${0.94 * 94.2} 94.2`} />
              <defs><linearGradient id="fg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#10b981" /></linearGradient></defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-sm font-black text-white">94%</span>
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-white">Strong Match</div>
            <div className="text-[10px] text-neutral-400 mt-0.5">12 of 13 keywords found</div>
          </div>
        </div>
        <div className="space-y-1.5">
          {[
            { kw: "React", hit: true }, { kw: "TypeScript", hit: true },
            { kw: "CI/CD", hit: true }, { kw: "Kubernetes", hit: false }, { kw: "Node.js", hit: true },
          ].map(({ kw, hit }) => (
            <div key={kw} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs ${hit ? "bg-emerald-500/5 border border-emerald-500/15" : "bg-rose-500/5 border border-rose-500/15"}`}>
              <span className={`text-[10px] font-bold ${hit ? "text-emerald-400" : "text-rose-400"}`}>{hit ? "✓" : "✗"}</span>
              <span className={hit ? "text-neutral-300" : "text-rose-300"}>{kw}</span>
              {!hit && <span className="ml-auto text-[10px] text-neutral-600">Add to resume</span>}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "cover",
    icon: FileText,
    title: "Cover Letter AI",
    desc: "One click for a personalized, role-specific cover letter.",
    color: "cyan",
    demo: (
      <div className="space-y-3">
        <div className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-3">Generated in 5 seconds</div>
        <div className="flex gap-2 mb-2">
          {[{ l: "Company", v: "Google" }, { l: "Role", v: "SWE" }].map(({ l, v }) => (
            <div key={l} className="flex-1">
              <div className="text-[9px] text-neutral-600 mb-0.5">{l}</div>
              <div className="text-xs bg-neutral-800 border border-white/[0.07] rounded-lg px-2 py-1.5 text-neutral-200">{v}</div>
            </div>
          ))}
        </div>
        <div className="bg-[#13131f] border border-white/[0.08] rounded-xl p-4 text-[10px] leading-[1.8] text-neutral-400 space-y-1.5">
          <p>Dear <span className="text-cyan-400 font-semibold">Google</span> Hiring Team,</p>
          <p>I am excited to apply for the <span className="text-cyan-400">Software Engineer</span> role. With <span className="text-emerald-400 font-semibold">6+ years</span> building high-performance applications in <span className="text-indigo-400">React</span> and <span className="text-indigo-400">TypeScript</span>...</p>
          <p className="text-neutral-600">At TechCorp, I led a migration that improved performance by <span className="text-emerald-400 font-bold">40%</span> and mentored a team of 6...</p>
          <div className="flex items-center gap-1.5 mt-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-[9px] text-cyan-400">Writing...</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "theme",
    icon: Palette,
    title: "Theme Customizer",
    desc: "8 accent colors, 6 fonts, drag-and-drop section ordering.",
    color: "rose",
    demo: (
      <div className="space-y-4">
        <div className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-3">Live Preview</div>
        <div>
          <div className="text-[10px] text-neutral-500 mb-2">Accent Color</div>
          <div className="flex gap-2">
            {[
              "bg-indigo-500", "bg-violet-500", "bg-rose-500", "bg-emerald-500",
              "bg-amber-500", "bg-sky-500", "bg-fuchsia-500", "bg-slate-500"
            ].map((c, i) => (
              <button key={i} className={`w-6 h-6 rounded-full ${c} ${i === 0 ? "ring-2 ring-white ring-offset-2 ring-offset-neutral-900" : "opacity-60 hover:opacity-100"} transition-all`} />
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] text-neutral-500 mb-2">Font Style</div>
          <div className="flex flex-wrap gap-1.5">
            {["Inter", "Georgia", "Merriweather", "Playfair", "Roboto Mono"].map((f, i) => (
              <button key={f} className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all ${i === 0 ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300" : "border-white/[0.07] text-neutral-500 hover:border-white/20"}`}>{f}</button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] text-neutral-500 mb-2">Section Order (drag to reorder)</div>
          <div className="space-y-1">
            {["Summary", "Experience", "Skills", "Education"].map((s, i) => (
              <div key={s} className="flex items-center gap-2 px-3 py-1.5 bg-neutral-800/60 border border-white/[0.05] rounded-lg text-[10px] text-neutral-400 cursor-grab">
                <span className="text-neutral-600">⠿</span> {i + 1}. {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "pdf",
    icon: Shield,
    title: "PDF Export",
    desc: "Pixel-perfect, ATS-safe PDF ready in seconds.",
    color: "emerald",
    demo: (
      <div className="space-y-4">
        <div className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-3">Export Options</div>
        <div className="space-y-2">
          {[
            { label: "Standard PDF", desc: "ATS-safe, universal", icon: "📄", active: true },
            { label: "Styled PDF", desc: "Colors & fonts preserved", icon: "🎨", active: false },
            { label: "DOCX", desc: "Microsoft Word format", icon: "📝", active: false },
          ].map(({ label, desc, icon, active }) => (
            <button key={label} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left ${active ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-300" : "border-white/[0.06] text-neutral-500 hover:border-white/10 hover:text-neutral-300"}`}>
              <span className="text-lg">{icon}</span>
              <div>
                <div className="text-xs font-semibold">{label}</div>
                <div className="text-[9px] opacity-70">{desc}</div>
              </div>
              {active && <div className="ml-auto text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Selected</div>}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 p-3 bg-emerald-500/5 border border-emerald-500/15 rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400"><Shield className="w-4 h-4" /></div>
          <div className="text-[10px] text-neutral-400 leading-relaxed">✓ Tested on Workday, Greenhouse, Lever, and Taleo</div>
        </div>
      </div>
    ),
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Resume Analytics",
    desc: "Track your match score across multiple job descriptions.",
    color: "amber",
    demo: (
      <div className="space-y-3">
        <div className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-3">Match Score Tracker</div>
        <div className="space-y-2.5">
          {[
            { role: "Frontend Engineer · Stripe", score: 94, color: "emerald" },
            { role: "SWE · Google", score: 87, color: "indigo" },
            { role: "Staff Engineer · Airbnb", score: 71, color: "amber" },
            { role: "React Dev · Shopify", score: 96, color: "emerald" },
          ].map(({ role, score, color }) => (
            <div key={role} className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-neutral-400 truncate mb-1">{role}</div>
                <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <div className={`h-full bg-${color}-500 rounded-full transition-all duration-700`} style={{ width: `${score}%` }} />
                </div>
              </div>
              <div className={`text-xs font-bold text-${color}-400 w-8 text-right flex-shrink-0`}>{score}%</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <div className="flex items-center gap-1.5 text-[9px] text-neutral-600"><div className="w-2 h-2 rounded-full bg-emerald-500" />Excellent</div>
          <div className="flex items-center gap-1.5 text-[9px] text-neutral-600"><div className="w-2 h-2 rounded-full bg-indigo-500" />Good</div>
          <div className="flex items-center gap-1.5 text-[9px] text-neutral-600"><div className="w-2 h-2 rounded-full bg-amber-500" />Needs Work</div>
        </div>
      </div>
    ),
  },
];

function FeatureShowcase() {
  const [active, setActive] = useState(0);
  const feat = FEATURES[active];
  return (
    <div className="flex gap-5 rounded-2xl border border-white/[0.05] bg-neutral-900/20 overflow-hidden">
      {/* Left: Feature list */}
      <div className="w-64 flex-shrink-0 border-r border-white/[0.05] p-4 flex flex-col gap-1">
        {FEATURES.map((f, idx) => {
          const Icon = f.icon;
          const isActive = idx === active;
          return (
            <button
              key={f.id}
              onClick={() => setActive(idx)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                isActive
                  ? "bg-indigo-600/15 border border-indigo-500/25 text-white"
                  : "text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.03] border border-transparent"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                isActive ? "bg-indigo-500/20 border border-indigo-500/30" : "bg-neutral-800/60 border border-white/[0.05] group-hover:bg-neutral-800"
              }`}>
                <Icon className={`w-4 h-4 ${isActive ? "text-indigo-400" : "text-neutral-500 group-hover:text-neutral-300"}`} />
              </div>
              <div>
                <div className={`text-xs font-semibold ${isActive ? "text-white" : ""}`}>{f.title}</div>
                <div className="text-[9px] text-neutral-600 mt-0.5 leading-relaxed line-clamp-1">{f.desc}</div>
              </div>
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-indigo-400 ml-auto flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Right: Live demo panel */}
      <div className="flex-1 p-6 relative">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/[0.05]">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
            <feat.icon className="w-4.5 h-4.5 text-indigo-400" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">{feat.title}</div>
            <div className="text-xs text-neutral-500">{feat.desc}</div>
          </div>
          <Link href="/dashboard" className="ml-auto">
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white h-8 px-3 text-xs rounded-lg">Try it →</Button>
          </Link>
        </div>
        {/* Demo content with fade transition */}
        <div key={active} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          {feat.demo}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */
export default function Home() {

  const [activeSlide, setActiveSlide] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goToSlide((activeSlide + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeSlide]);

  function goToSlide(idx: number) {
    if (idx === activeSlide || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveSlide(idx);
      setAnimating(false);
    }, 280);
  }

  const SlideScreen = SLIDE_COMPONENTS[activeSlide];
  const slide = SLIDES[activeSlide];

  return (
    <div className="h-[100dvh] overflow-y-auto snap-y snap-mandatory scroll-smooth bg-[#030303] text-neutral-50 font-sans antialiased relative selection:bg-indigo-500/30">

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

      {/* ── NAV ── */}
      <nav className="fixed w-full top-0 z-50 border-b border-white/[0.04] bg-[#030303]/40 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            Resume<span className="text-indigo-400">AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-neutral-500">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#templates" className="hover:text-white transition-colors">Templates</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white hover:bg-white/5 hidden md:flex">Sign in</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-4 h-8 shadow-md shadow-indigo-500/20">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── SLIDE 1: HERO ── */}
      <section className="min-h-screen w-full snap-always snap-center flex flex-col justify-center items-center px-6 text-center relative z-10 pt-16 pb-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="max-w-6xl mx-auto w-full"
        >
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="inline-flex items-center gap-2 text-xs font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full mb-8 shadow-[0_0_15px_rgba(99,102,241,0.15)] "
          >
            <Zap className="w-3.5 h-3.5" /> AI-Powered · ATS-Optimized · Free to Start
          </motion.div>
          <motion.h1 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-5xl md:text-[76px] font-black tracking-tight leading-[1.05] mb-6 drop-shadow-2xl"
          >
            Your resume,<br />
            <span className="bg-gradient-to-br from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              perfected by AI.
            </span>
          </motion.h1>
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-lg md:text-xl text-neutral-400 max-w-xl mx-auto mb-10 leading-relaxed font-light"
          >
            Build ATS-beating resumes in minutes. AI writes your bullets, scores your match, and crafts your cover letter — automatically.
          </motion.p>
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Link href="/dashboard">
              <Button size="lg" className="relative group h-14 px-8 bg-white hover:bg-neutral-100 text-neutral-900 font-bold rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.15)] text-base transition-all hover:scale-[1.02]">
                <span className="relative z-10 flex items-center">Build My Resume <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 rounded-xl bg-white blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
              </Button>
            </Link>
            <a href="#templates">
              <Button size="lg" variant="outline" className="h-14 px-8 border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:border-neutral-500 rounded-xl text-base transition-all bg-neutral-900/50 backdrop-blur-sm">
                See Templates
              </Button>
            </a>
          </motion.div>
          <motion.div 
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-neutral-500 font-medium"
          >
            {["No credit card", "PDF export", "ATS optimized", "AI-powered"].map(t => (
              <span key={t} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-indigo-400/80" />{t}</span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── SLIDE 2: ANIMATED FEATURE SHOWCASE ── */}
      <section id="features" className="min-h-screen w-full snap-always snap-center flex flex-col justify-center items-center px-6 relative z-10 pt-16 pb-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="max-w-5xl mx-auto w-full"
        >
          {/* Slide selector tabs */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {SLIDES.map((s, idx) => {
              const Icon = s.icon;
              const isActive = idx === activeSlide;
              return (
                <button
                  key={s.id}
                  onClick={() => goToSlide(idx)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border
                    ${isActive
                      ? "bg-indigo-600/20 text-indigo-300 border-indigo-500/40 shadow-lg shadow-indigo-500/5"
                      : "text-neutral-600 border-transparent hover:text-neutral-400 hover:bg-neutral-900"
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {s.tag}
                </button>
              );
            })}
            {/* Progress dots */}
            <div className="flex items-center gap-1.5 ml-4">
              {SLIDES.map((_, idx) => (
                <div key={idx} className={`rounded-full transition-all duration-300 ${idx === activeSlide ? "w-5 h-1.5 bg-indigo-500" : "w-1.5 h-1.5 bg-neutral-700"}`} />
              ))}
            </div>
          </div>

          {/* Slide label */}
          <div className={`text-center mb-6 transition-all duration-300 ${animating ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"}`}>
            <div className="text-sm text-neutral-400">{slide.description}</div>
          </div>

          {/* Window frame */}
          <div className="relative rounded-2xl border border-white/[0.06] bg-neutral-900/40 backdrop-blur overflow-hidden shadow-2xl"
            style={{ minHeight: 520 }}>
            {/* Window chrome */}
            <div className="flex items-center gap-1.5 px-5 py-3 border-b border-white/[0.05]">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
              <div className="ml-4 flex items-center gap-2">
                <div className="h-5 w-48 bg-neutral-800/80 rounded-md flex items-center px-2 gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/60" />
                  <div className="text-[9px] text-neutral-600">resumeai.app / {slide.id}</div>
                </div>
              </div>
              <div className="ml-auto text-[9px] text-neutral-600 flex items-center gap-1">
                <ChevronRight className="w-3 h-3" />
                {slide.tag}
              </div>
            </div>

            {/* Slide content */}
            <div
              className="transition-all duration-300 ease-in-out"
              style={{ height: 500, opacity: animating ? 0 : 1, transform: animating ? "translateY(6px)" : "translateY(0)" }}
            >
              <SlideScreen />
            </div>

            {/* Progress bar at bottom */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neutral-800">
              <div
                key={activeSlide}
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                style={{ animation: "slideProgress 5s linear forwards" }}
              />
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button onClick={() => goToSlide((activeSlide - 1 + SLIDES.length) % SLIDES.length)}
              className="w-8 h-8 rounded-full bg-neutral-900 border border-white/[0.07] flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-800 hover:border-white/20 transition-all shadow-sm">
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <span className="text-xs text-neutral-600 font-medium">{activeSlide + 1} / {SLIDES.length}</span>
            <button onClick={() => goToSlide((activeSlide + 1) % SLIDES.length)}
              className="w-8 h-8 rounded-full bg-neutral-900 border border-white/[0.07] flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-800 hover:border-white/20 transition-all shadow-sm">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </section>


      {/* ── SLIDE 3: TEMPLATES ── */}
      <section id="templates" className="min-h-screen w-full snap-always snap-center flex flex-col justify-center items-center px-6 relative z-10 pt-16 pb-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="max-w-5xl mx-auto w-full"
        >
          <div className="text-center mb-10">
            <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-3">Templates</p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">Pick your style.</h2>
            <p className="text-neutral-500 text-sm max-w-sm mx-auto">ATS-optimized, fully customizable — colors, fonts, and layout all yours.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto w-full">
            {[
              { name: "Modern", badge: "Popular", badgeClr: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20", desc: "Bold header · Color accents", accent: "indigo", preview: <div className="flex flex-col gap-2 p-4"><div className="h-7 bg-indigo-600/35 rounded-lg" /><div className="h-px bg-white/5" />{[1,2,3].map(i=><div key={i} className="h-1 w-full bg-neutral-700/50 rounded"/>)}<div className="flex gap-1 mt-1">{[28,22,30].map((w,i)=><div key={i} className="h-3 bg-indigo-500/20 rounded" style={{width:w}}/>)}</div></div> },
              { name: "Classic", badge: "Featured ⭐", badgeClr: "text-amber-400 bg-amber-500/10 border-amber-500/20", desc: "Traditional · Timeless", accent: "amber", preview: <div className="flex flex-col gap-2 p-4"><div className="text-center pb-2 border-b border-white/10"><div className="h-2 w-20 bg-neutral-300/15 rounded mx-auto mb-1.5"/><div className="h-1 w-16 bg-neutral-600 rounded mx-auto"/></div><div className="h-1 w-14 bg-amber-400/25 rounded mt-1"/>{[1,2,3].map(i=><div key={i} className="h-1 w-full bg-neutral-700/50 rounded"/>)}</div> },
              { name: "Minimal", badge: "Sidebar", badgeClr: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", desc: "Two-column · Modern", accent: "emerald", preview: <div className="flex gap-0 p-0 h-full overflow-hidden"><div className="w-[36%] bg-neutral-800/50 p-3 flex flex-col gap-1.5"><div className="w-6 h-6 rounded-full bg-emerald-500/20 mb-1"/><div className="h-1 w-12 bg-neutral-600 rounded"/><div className="h-px bg-white/5 my-1"/>{[1,2,3].map(i=><div key={i} className="h-1 w-full bg-neutral-700/50 rounded"/>)}</div><div className="flex-1 p-3 flex flex-col gap-1.5"><div className="h-1 w-14 bg-emerald-400/25 rounded"/>{[1,2,3,4].map(i=><div key={i} className="h-1 w-full bg-neutral-700/40 rounded"/>)}</div></div> },
            ].map(({ name, badge, badgeClr, desc, accent, preview }) => (
              <motion.div key={name} whileHover={{ y: -8 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                <Link href="/dashboard" className="group block">
                  <div className={`relative aspect-[3/4] rounded-2xl overflow-hidden border border-neutral-800 transition-all duration-300 group-hover:border-${accent}-500/40 group-hover:shadow-[0_20px_40px_-15px_rgba(var(--${accent}-500),0.2)]`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-950" />
                    <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-${accent}-500 to-${accent}-400 opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <div className="absolute inset-0">{preview}</div>
                    <div className="absolute inset-0 bg-neutral-950/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <span className={`bg-${accent}-600 text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300`}>Use Template →</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between px-1">
                    <div>
                      <span className="font-semibold text-white text-sm">{name}</span>
                      <p className="text-xs text-neutral-600 mt-0.5">{desc}</p>
                    </div>
                    <span className={`text-[10px] font-medium ${badgeClr} border px-2 py-0.5 rounded-full`}>{badge}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/dashboard">
              <Button className="bg-white text-neutral-900 hover:bg-neutral-100 font-semibold px-10 h-11 rounded-xl">Start Building Free →</Button>
            </Link>
            <p className="text-neutral-700 text-xs mt-3">No account required to explore</p>
          </div>
        </motion.div>
      </section>

      {/* ── SLIDE 4: PRICING ── */}
      <section id="pricing" className="min-h-screen w-full snap-always snap-center flex flex-col justify-center items-center px-6 relative z-10 pt-16 pb-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="max-w-4xl mx-auto w-full"
        >
          <div className="text-center mb-10">
            <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">Simple. Transparent.</h2>
            <p className="text-neutral-500 text-sm">Start free. Upgrade when you're ready.</p>
          </div>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <motion.div 
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="p-8 rounded-2xl border border-white/[0.06] bg-neutral-900/40 backdrop-blur-sm flex flex-col hover:border-white/10 hover:shadow-2xl hover:bg-neutral-900/60 transition-colors"
            >
              <div className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-4">Free</div>
              <div className="text-5xl font-black mb-1">$0</div>
              <div className="text-neutral-500 text-sm mb-7">Forever. No credit card.</div>
              <ul className="space-y-4 mb-10 flex-1">
                {["3 AI resume generations", "PDF export", "ATS score checker", "Shareable link"].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-neutral-400 font-medium">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/dashboard" className="block mt-auto">
                <Button className="w-full bg-neutral-800 hover:bg-neutral-700 text-white h-12 rounded-xl text-base font-semibold transition-colors">Get Started Free</Button>
              </Link>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="p-8 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/80 to-neutral-900/80 relative overflow-hidden backdrop-blur-sm flex flex-col shadow-[0_0_40px_rgba(99,102,241,0.1)] hover:shadow-[0_0_60px_rgba(99,102,241,0.2)] hover:border-indigo-500/50 transition-all"
            >
              <div className="absolute top-0 right-0 bg-gradient-to-l from-indigo-500 to-violet-500 text-white text-[10px] font-bold px-4 py-2 rounded-bl-xl shadow-md">POPULAR</div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_70%)] pointer-events-none" />
              <div className="relative flex flex-col h-full">
                <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-4">Pro</div>
                <div className="text-5xl font-black mb-1 text-white">$12<span className="text-lg font-medium text-neutral-500">/mo</span></div>
                <div className="text-neutral-400 text-sm mb-7">Everything in Free, plus:</div>
                <ul className="space-y-4 mb-10 flex-1">
                  {["Unlimited AI generations", "AI Cover Letter writer", "Job match optimizer", "Priority support"].map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-indigo-100 font-medium">
                      <CheckCircle className="w-5 h-5 text-indigo-400 flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Button className="relative group w-full h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold shadow-lg shadow-amber-500/20 border-0 text-base mt-auto overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-2">⚡ Upgrade to Pro</span>
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── SLIDE 5: FOOTER CTA ── */}
      <section className="min-h-screen w-full snap-always snap-center flex flex-col justify-end items-center relative z-10 pt-16 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08),transparent_70%)]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
          className="max-w-3xl mx-auto px-6 text-center flex-1 flex flex-col justify-center w-full"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/20">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">Ready to land your dream job?</h2>
          <p className="text-neutral-400 mb-10 text-base max-w-lg mx-auto leading-relaxed">Join thousands of job seekers who built winning resumes with ResumeAI. Fast, simple, and incredibly effective.</p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-white hover:bg-neutral-100 text-neutral-900 px-12 h-14 rounded-2xl shadow-xl font-bold text-lg">
              Build Your Resume Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
        
        {/* FOOTER - Pinned to bottom of the 5th slide */}
        <footer className="w-full border-t border-white/[0.04] py-8 mt-auto bg-black/20 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center"><Sparkles className="w-3.5 h-3.5 text-white" /></div>
              Resume<span className="text-indigo-400">AI</span>
            </div>
            <div className="flex gap-6 text-xs text-neutral-500 font-medium">
              <Link href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-neutral-300 transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-neutral-300 transition-colors">Contact</Link>
            </div>
            <p className="text-neutral-600 text-xs">© 2025 ResumeAI · All rights reserved.</p>
          </div>
        </footer>
      </section>

      <style>{`
        @keyframes slideProgress {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </div>
  );
}
