"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sparkles, ArrowRight, CheckCircle, Zap, FileText,
  Target, BarChart3, Shield, Palette, ChevronRight
} from "lucide-react";
import Link from "next/link";

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
      <div className="w-48 border-r border-white/[0.05] bg-neutral-950/60 p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">AJ</div>
          <div>
            <div className="text-[11px] text-white font-semibold">Alex Johnson</div>
            <div className="text-[9px] text-neutral-500">Senior Engineer</div>
          </div>
        </div>
        <div className="space-y-0.5">
          {[
            { label: "Personal Info", icon: "👤" },
            { label: "Summary", icon: "📝" },
            { label: "Experience", icon: "💼", active: true },
            { label: "Education", icon: "🎓" },
            { label: "Skills", icon: "⚡" },
          ].map(({ label, icon, active }) => (
            <div key={label} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[10px] font-medium ${active ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/20" : "text-neutral-600"}`}>
              <span>{icon}</span>{label}
              {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />}
            </div>
          ))}
        </div>
        <div className="mt-auto pt-3 border-t border-white/[0.05]">
          <div className="flex items-center gap-1.5 px-1">
            <div className="w-4 h-4 rounded bg-amber-500/20 flex items-center justify-center text-[8px]">⚡</div>
            <span className="text-[9px] text-amber-400 font-medium">Upgrade to Pro</span>
          </div>
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 p-5 flex items-start gap-3 bg-neutral-950/20">
        {/* Resume card */}
        <div className="flex-1 bg-[#13131f] border border-white/10 rounded-xl overflow-hidden shadow-xl">
          <div className="bg-gradient-to-r from-indigo-700/40 to-violet-700/30 border-b border-white/[0.06] px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">Alex Johnson</div>
                <div className="text-[9px] text-indigo-300">Senior Software Engineer</div>
                <div className="text-[8px] text-neutral-400 mt-0.5">alex@email.com · San Francisco, CA</div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/20 flex items-center justify-center text-xs font-bold text-indigo-300">AJ</div>
            </div>
          </div>
          <div className="px-4 py-3 space-y-2.5">
            <div>
              <div className="text-[8px] font-bold text-indigo-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <div className="w-2 h-px bg-indigo-500" /> EXPERIENCE
              </div>
              <div className="text-[9px] font-semibold text-neutral-200">Lead Engineer · TechCorp</div>
              <div className="text-[8px] text-neutral-500 mb-1">2021 – Present</div>
              <div className="space-y-0.5">
                <div className="text-[8px] text-neutral-400 flex gap-1"><span className="text-indigo-400">·</span> Led React migration, improved perf by 40%</div>
                <div className="text-[8px] text-neutral-400 flex gap-1"><span className="text-indigo-400">·</span> Mentored 6 engineers, reduced bugs by 35%</div>
              </div>
            </div>
            <div className="border-t border-white/[0.04] pt-2">
              <div className="text-[8px] font-bold text-indigo-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <div className="w-2 h-px bg-indigo-500" /> SKILLS
              </div>
              <div className="flex flex-wrap gap-1">
                {["React", "TypeScript", "Node.js", "AWS", "Docker"].map(s => (
                  <span key={s} className="text-[8px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div className="w-[160px] flex flex-col gap-2.5">
          <div className="bg-neutral-900 border border-white/[0.07] rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-4 h-4 rounded bg-violet-500/20 flex items-center justify-center"><Sparkles className="w-2.5 h-2.5 text-violet-400" /></div>
              <span className="text-[9px] font-bold text-violet-300">AI Suggestion</span>
            </div>
            <div className="text-[8px] text-neutral-400 leading-relaxed">Add a quantified result to your 2nd bullet to boost ATS score.</div>
            <button className="mt-1.5 text-[8px] font-semibold text-violet-400">Apply fix →</button>
          </div>
          <div className="bg-gradient-to-br from-indigo-900/50 to-violet-900/30 border border-indigo-500/25 rounded-xl p-3">
            <div className="text-[8px] text-neutral-400 mb-0.5">ATS Match Score</div>
            <div className="text-xl font-black text-white">98<span className="text-xs text-indigo-400">%</span></div>
            <div className="w-full h-1 rounded-full bg-neutral-800 overflow-hidden mt-1">
              <div className="h-full w-[98%] bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full" />
            </div>
            <div className="text-[8px] text-emerald-400 mt-1 font-medium">✓ Excellent match</div>
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
      <div className="w-1/2 border-r border-white/[0.05] p-5 bg-neutral-950/40 flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-lg bg-violet-500/20 flex items-center justify-center"><Target className="w-3.5 h-3.5 text-violet-400" /></div>
          <span className="text-xs font-bold text-white">Job Description</span>
          <span className="ml-auto text-[9px] text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded-full">Optional</span>
        </div>
        <div className="flex-1 rounded-xl border border-white/[0.07] bg-neutral-900/60 p-3 space-y-1.5">
          {["We're looking for a Senior Frontend Engineer...", "Strong experience with React, TypeScript...", "3+ years of production experience...", "Experience with CI/CD pipelines, Docker...", "Excellent communication skills..."].map((line, i) => (
            <div key={i} className="text-[8px] text-neutral-500 leading-relaxed">{line}</div>
          ))}
        </div>
        <button className="self-start text-[9px] font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1.5 rounded-lg hover:bg-violet-500/20 transition-colors">
          ⚡ Analyze Match →
        </button>
      </div>

      {/* Right: Results */}
      <div className="flex-1 p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center"><BarChart3 className="w-3.5 h-3.5 text-emerald-400" /></div>
          <span className="text-xs font-bold text-white">Analysis Results</span>
        </div>

        {/* Score ring visual */}
        <div className="flex items-center gap-4 p-3 bg-neutral-900/50 rounded-xl border border-white/[0.06]">
          <div className="relative w-14 h-14 flex-shrink-0">
            <svg viewBox="0 0 40 40" className="w-full h-full -rotate-90">
              <circle cx="20" cy="20" r="16" fill="none" stroke="#1f2937" strokeWidth="4" />
              <circle cx="20" cy="20" r="16" fill="none" stroke="url(#scoreGrad)" strokeWidth="4" strokeLinecap="round"
                strokeDasharray={`${0.94 * 100.5} 100.5`} />
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-black text-white">94%</span>
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-white mb-0.5">Strong Match</div>
            <div className="text-[9px] text-neutral-400">Your resume matches 12 of 13 required keywords.</div>
          </div>
        </div>

        {/* Keyword breakdown */}
        <div className="space-y-1.5">
          {[
            { kw: "React", hit: true }, { kw: "TypeScript", hit: true },
            { kw: "Docker", hit: true }, { kw: "Kubernetes", hit: false },
            { kw: "CI/CD", hit: true },
          ].map(({ kw, hit }) => (
            <div key={kw} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full flex items-center justify-center text-[7px] ${hit ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}>
                {hit ? "✓" : "✗"}
              </div>
              <span className={`text-[9px] font-medium ${hit ? "text-neutral-300" : "text-rose-400"}`}>{kw}</span>
              {!hit && <span className="text-[8px] text-neutral-600 ml-auto">Missing — add to resume</span>}
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
      <div className="w-[200px] border-r border-white/[0.05] p-4 bg-neutral-950/40 flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-5 h-5 rounded bg-cyan-500/20 flex items-center justify-center"><Sparkles className="w-3 h-3 text-cyan-400" /></div>
          <span className="text-[11px] font-bold text-white">Cover Letter AI</span>
        </div>
        <div className="space-y-2">
          {[{ label: "Company", val: "Google" }, { label: "Role", val: "Sr. Frontend Eng." }, { label: "Tone", val: "Professional" }].map(({ label, val }) => (
            <div key={label}>
              <div className="text-[8px] text-neutral-600 mb-0.5">{label}</div>
              <div className="text-[9px] text-neutral-200 bg-neutral-900 border border-white/[0.07] rounded-lg px-2.5 py-1.5">{val}</div>
            </div>
          ))}
        </div>
        <button className="mt-auto text-[9px] font-bold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 px-3 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5">
          <Sparkles className="w-3 h-3" /> Generate
        </button>
        <div className="text-[8px] text-neutral-600 text-center">Generated in ~5 seconds</div>
      </div>

      {/* Right: generated letter */}
      <div className="flex-1 p-4 bg-neutral-950/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] text-emerald-400 font-semibold">Generated</span>
          </div>
          <div className="flex gap-1.5">
            <button className="text-[8px] text-neutral-500 bg-neutral-800 px-2 py-1 rounded-md hover:bg-neutral-700">Copy</button>
            <button className="text-[8px] text-white bg-indigo-600 px-2 py-1 rounded-md hover:bg-indigo-500">Download</button>
          </div>
        </div>
        <div className="bg-[#13131f] border border-white/[0.07] rounded-xl p-4 h-[calc(100%-36px)] overflow-hidden">
          <div className="text-[8px] text-neutral-300 leading-[1.7] space-y-2">
            <p className="text-neutral-400">March 8, 2025</p>
            <p className="font-semibold text-neutral-200">Dear Google Hiring Team,</p>
            <p>I am excited to apply for the <span className="text-cyan-400 font-medium">Senior Frontend Engineer</span> role at Google. With over 6 years of experience building high-performance web applications using <span className="text-indigo-400">React</span> and <span className="text-indigo-400">TypeScript</span>, I am confident I can contribute meaningfully to your team.</p>
            <p>At TechCorp, I led a full React migration that improved page load performance by <span className="text-emerald-400 font-semibold">40%</span> and mentored a team of 6 engineers, reducing bug count by 35%...</p>
            <p className="text-neutral-500">Sincerely,<br />Alex Johnson</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const SLIDE_COMPONENTS = [BuilderSlide, AtsSlide, CoverLetterSlide];

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
    <div className="min-h-screen bg-[#09090b] text-neutral-50 font-sans antialiased">

      {/* Ambient bg */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-100px] left-1/4 w-[700px] h-[700px] bg-indigo-600/8 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/3 right-1/5 w-[500px] h-[500px] bg-violet-600/6 rounded-full blur-[110px]" />
      </div>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#09090b]/85 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
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
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-4 h-8">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-12 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full mb-8">
          <Zap className="w-3 h-3" /> AI-Powered · ATS-Optimized · Free to Start
        </div>
        <h1 className="text-5xl md:text-[68px] font-black tracking-tight leading-[1.05] mb-6">
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
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-xs text-neutral-600">
          {["No credit card", "PDF export", "ATS optimized", "AI-powered"].map(t => (
            <span key={t} className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" />{t}</span>
          ))}
        </div>
      </section>

      {/* ── ANIMATED FEATURE SHOWCASE ── */}
      <section id="features" className="max-w-6xl mx-auto px-6 pb-28">

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
        <div className={`text-center mb-4 transition-all duration-300 ${animating ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"}`}>
          <div className="text-sm text-neutral-400">{slide.description}</div>
        </div>

        {/* Window frame */}
        <div className="relative rounded-2xl border border-white/[0.06] bg-neutral-900/40 backdrop-blur overflow-hidden shadow-2xl"
          style={{ minHeight: 400 }}>
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
            style={{ height: 380, opacity: animating ? 0 : 1, transform: animating ? "translateY(6px)" : "translateY(0)" }}
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
        <div className="flex items-center justify-center gap-3 mt-5">
          <button onClick={() => goToSlide((activeSlide - 1 + SLIDES.length) % SLIDES.length)}
            className="w-8 h-8 rounded-full bg-neutral-900 border border-white/[0.07] flex items-center justify-center text-neutral-500 hover:text-white hover:border-white/20 transition-all">
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
          <span className="text-xs text-neutral-600">{activeSlide + 1} / {SLIDES.length}</span>
          <button onClick={() => goToSlide((activeSlide + 1) % SLIDES.length)}
            className="w-8 h-8 rounded-full bg-neutral-900 border border-white/[0.07] flex items-center justify-center text-neutral-500 hover:text-white hover:border-white/20 transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ── FEATURE GRID ── */}
      <section className="max-w-6xl mx-auto px-6 pb-28">
        <div className="text-center mb-12">
          <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-3">What you get</p>
          <h2 className="text-3xl font-bold">Everything to land the job.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Zap, title: "AI Bullet Writer", desc: "Get polished, quantified achievement bullets from rough notes." },
            { icon: Target, title: "ATS Score Checker", desc: "Instant match score against any job description." },
            { icon: FileText, title: "Cover Letter AI", desc: "Personalized cover letters ready in under 30 seconds." },
            { icon: Palette, title: "Theme Customizer", desc: "8 accent colors, 6 font styles, drag-and-drop section order." },
            { icon: Shield, title: "PDF Export", desc: "Pixel-perfect, ATS-safe PDF that looks great everywhere." },
            { icon: BarChart3, title: "Resume Analytics", desc: "Compare your resume against multiple job descriptions." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 rounded-2xl border border-white/[0.05] bg-neutral-900/30 hover:bg-neutral-900/60 hover:border-white/10 transition-all duration-200 group">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center mb-4 group-hover:bg-indigo-500/15 transition-colors">
                <Icon className="w-4.5 h-4.5 text-indigo-400" />
              </div>
              <h3 className="font-semibold text-white mb-1.5">{title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEMPLATES ── */}
      <section id="templates" className="max-w-6xl mx-auto px-6 pb-28 border-t border-white/[0.03] pt-24">
        <div className="text-center mb-12">
          <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-3">Templates</p>
          <h2 className="text-3xl font-bold mb-3">Pick your style.</h2>
          <p className="text-neutral-500 text-sm max-w-xs mx-auto">ATS-optimized, fully customizable — colors, fonts, and layout all yours.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {[
            { name: "Modern", badge: "Popular", badgeClr: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20", desc: "Bold header · Color accents", accent: "indigo", preview: <div className="flex flex-col gap-2 p-4"><div className="h-7 bg-indigo-600/35 rounded-lg" /><div className="h-px bg-white/5" />{[1,2,3].map(i=><div key={i} className="h-1 w-full bg-neutral-700/50 rounded"/>)}<div className="flex gap-1 mt-1">{[28,22,30].map((w,i)=><div key={i} className="h-3 bg-indigo-500/20 rounded" style={{width:w}}/>)}</div></div> },
            { name: "Classic", badge: "Featured ⭐", badgeClr: "text-amber-400 bg-amber-500/10 border-amber-500/20", desc: "Traditional · Timeless", accent: "amber", preview: <div className="flex flex-col gap-2 p-4"><div className="text-center pb-2 border-b border-white/10"><div className="h-2 w-20 bg-neutral-300/15 rounded mx-auto mb-1.5"/><div className="h-1 w-16 bg-neutral-600 rounded mx-auto"/></div><div className="h-1 w-14 bg-amber-400/25 rounded mt-1"/>{[1,2,3].map(i=><div key={i} className="h-1 w-full bg-neutral-700/50 rounded"/>)}</div> },
            { name: "Minimal", badge: "Sidebar", badgeClr: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", desc: "Two-column · Modern", accent: "emerald", preview: <div className="flex gap-0 p-0 h-full overflow-hidden"><div className="w-[36%] bg-neutral-800/50 p-3 flex flex-col gap-1.5"><div className="w-6 h-6 rounded-full bg-emerald-500/20 mb-1"/><div className="h-1 w-12 bg-neutral-600 rounded"/><div className="h-px bg-white/5 my-1"/>{[1,2,3].map(i=><div key={i} className="h-1 w-full bg-neutral-700/50 rounded"/>)}</div><div className="flex-1 p-3 flex flex-col gap-1.5"><div className="h-1 w-14 bg-emerald-400/25 rounded"/>{[1,2,3,4].map(i=><div key={i} className="h-1 w-full bg-neutral-700/40 rounded"/>)}</div></div> },
          ].map(({ name, badge, badgeClr, desc, accent, preview }) => (
            <Link key={name} href="/dashboard" className="group block">
              <div className={`relative aspect-[3/4] rounded-2xl overflow-hidden border border-neutral-800 transition-all duration-300 group-hover:border-${accent}-500/40 group-hover:shadow-lg group-hover:shadow-${accent}-500/10 group-hover:-translate-y-1.5`}>
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-950" />
                <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-${accent}-500 to-${accent}-400 opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="absolute inset-0">{preview}</div>
                <div className="absolute inset-0 bg-neutral-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className={`bg-${accent}-600 text-white text-xs font-semibold px-5 py-2 rounded-full shadow-lg`}>Use Template →</span>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between px-0.5">
                <div>
                  <span className="font-semibold text-white text-sm">{name}</span>
                  <p className="text-xs text-neutral-600 mt-0.5">{desc}</p>
                </div>
                <span className={`text-xs ${badgeClr} border px-2 py-0.5 rounded-full`}>{badge}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/dashboard">
            <Button className="bg-white text-neutral-900 hover:bg-neutral-100 font-semibold px-10 h-11 rounded-xl">Start Building Free →</Button>
          </Link>
          <p className="text-neutral-700 text-xs mt-2">No account required to explore</p>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 pb-28 border-t border-white/[0.03] pt-24">
        <div className="text-center mb-12">
          <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-3xl font-bold mb-3">Simple. Transparent.</h2>
          <p className="text-neutral-500 text-sm">Start free. Upgrade when you&apos;re ready.</p>
        </div>
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-7 rounded-2xl border border-white/[0.06] bg-neutral-900/30">
            <div className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-4">Free</div>
            <div className="text-4xl font-black mb-1">$0</div>
            <div className="text-neutral-500 text-sm mb-7">Forever. No credit card.</div>
            <ul className="space-y-3 mb-8">
              {["3 AI resume generations", "PDF export", "ATS score checker", "Shareable link"].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-neutral-400">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />{f}
                </li>
              ))}
            </ul>
            <Link href="/dashboard" className="block">
              <Button className="w-full bg-neutral-800 hover:bg-neutral-700 text-white h-11 rounded-xl">Get Started Free</Button>
            </Link>
          </div>
          <div className="p-7 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 to-neutral-900/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-xl">POPULAR</div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_60%)]" />
            <div className="relative">
              <div className="text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-4">Pro</div>
              <div className="text-4xl font-black mb-1 text-white">$12<span className="text-lg font-medium text-neutral-500">/mo</span></div>
              <div className="text-neutral-500 text-sm mb-7">Everything in Free, plus:</div>
              <ul className="space-y-3 mb-8">
                {["Unlimited AI generations", "AI Cover Letter writer", "Job match optimizer", "Priority support"].map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-indigo-200">
                    <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Button className="w-full h-11 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold shadow-lg shadow-amber-500/20 border-0">⚡ Upgrade to Pro</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="border-t border-white/[0.03] py-20 bg-gradient-to-b from-transparent to-indigo-950/10">
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

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.04] py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center"><Sparkles className="w-3 h-3 text-white" /></div>
            Resume<span className="text-indigo-400">AI</span>
          </div>
          <p className="text-neutral-700 text-xs">© 2025 ResumeAI · All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        @keyframes slideProgress {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </div>
  );
}
