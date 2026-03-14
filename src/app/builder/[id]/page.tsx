"use client";

import { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { 
  User, FileText, Briefcase, GraduationCap, 
  Wrench, Layers, ChevronLeft, ChevronRight, Download, Sparkles, Palette, Youtube, CheckCircle2, CloudFog, Loader2, Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { PersonalInformation } from "@/components/forms/PersonalInformation";
import { ProfessionalSummary } from "@/components/forms/ProfessionalSummary";
import { ExperienceForm, Experience } from "@/components/forms/ExperienceForm";
import { EducationForm, Education } from "@/components/forms/EducationForm";
import { SkillsForm } from "@/components/forms/SkillsForm";
import { ProjectsForm, Project } from "@/components/forms/ProjectsForm";
import { ThemeCustomizer, ThemeConfig, DEFAULT_SECTIONS } from "@/components/forms/ThemeCustomizer";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { MinimalTemplate } from "@/components/templates/MinimalTemplate";
import { ProfessionalTemplate } from "@/components/templates/ProfessionalTemplate";
import { CreativeTemplate } from "@/components/templates/CreativeTemplate";
import { AtsScoringDialog } from "@/components/forms/AtsScoringDialog";
import { Logo } from "@/components/brand/Logo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

type TemplateType = "modern" | "minimal" | "professional" | "creative";

export interface ResumeData {
  personalInfo: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    portfolio: string;
    linkedin: string;
  };
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  themeConfig: ThemeConfig;
}

const steps = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "summary", label: "Summary", icon: FileText },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "projects", label: "Projects", icon: Layers },
  { id: "tools", label: "AI Tools", icon: Sparkles },
  { id: "customize", label: "Customize", icon: Palette },
];

export default function BuilderPage() {
  const params = useParams();
  const router = useRouter();
  const resumeId = params.id as string;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTemplate, setActiveTemplate] = useState<TemplateType>("modern");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Ref for printing
  const printRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Resume",
  });

  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      location: "",
      portfolio: "",
      linkedin: ""
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    themeConfig: {
      accentColor: "#4F46E5",
      fontFamily: "Inter, sans-serif",
      sectionOrder: [...DEFAULT_SECTIONS],
    } as ThemeConfig,
  });

  // Fetch initial data
  useEffect(() => {
    const fetchResume = async () => {
      if (!resumeId || resumeId === "new") return;
      
      try {
        const res = await fetch(`/api/resumes/${resumeId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.content) {
            setResumeData(JSON.parse(data.content));
          }
        } else {
          toast.error("Failed to load resume");
        }
      } catch (error) {
        console.error("Load error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResume();
  }, [resumeId]);

  // Auto-save mechanism
  useEffect(() => {
    if (isLoading || !resumeId || resumeId === "new") return;

    const saveTimeout = setTimeout(async () => {
      setIsSaving(true);
      try {
        const res = await fetch(`/api/resumes/${resumeId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: JSON.stringify(resumeData),
            title: resumeData.personalInfo.fullName ? `${resumeData.personalInfo.fullName}'s Resume` : "Untitled Resume"
          })
        });

        if (res.ok) {
          setLastSaved(new Date());
        }
      } catch (error) {
        console.error("Save error:", error);
      } finally {
        setIsSaving(false);
      }
    }, 2000); // 2 second debounce

    return () => clearTimeout(saveTimeout);
  }, [resumeData, resumeId, isLoading]);

  const handlePersonalInfoChange = (field: string, value: string) => {
    setResumeData((prev: ResumeData) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const handleSummaryChange = (value: string) => {
    setResumeData((prev: ResumeData) => ({
      ...prev,
      summary: value
    }));
  };

  const handleExperienceChange = (data: Experience[]) => {
    setResumeData((prev: ResumeData) => ({
      ...prev,
      experience: data
    }));
  };

  const handleEducationChange = (data: Education[]) => {
    setResumeData((prev: ResumeData) => ({
      ...prev,
      education: data
    }));
  };

  const handleSkillsChange = (data: string[]) => {
    setResumeData((prev: ResumeData) => ({
      ...prev,
      skills: data
    }));
  };

  const handleProjectsChange = (data: Project[]) => {
    setResumeData((prev: ResumeData) => ({
      ...prev,
      projects: data
    }));
  };

  const handleThemeChange = (config: ThemeConfig) => {
    setResumeData((prev: ResumeData) => ({
      ...prev,
      themeConfig: config
    }));
  };

  const renderCurrentForm = () => {
    switch(currentStep) {
      case 0:
        return <PersonalInformation data={resumeData.personalInfo} onChange={handlePersonalInfoChange} />;
      case 1:
        return <ProfessionalSummary data={resumeData.summary} onChange={handleSummaryChange} personalInfo={resumeData.personalInfo} />;
      case 2:
        return <ExperienceForm data={resumeData.experience} onChange={handleExperienceChange} personalTitle={resumeData.personalInfo.jobTitle} />;
      case 3:
        return <EducationForm data={resumeData.education} onChange={handleEducationChange} />;
      case 4:
        return <SkillsForm data={resumeData.skills} onChange={handleSkillsChange} jobTitle={resumeData.personalInfo.jobTitle} />;
      case 5:
        return <ProjectsForm data={resumeData.projects} onChange={handleProjectsChange} />;
      case 6:
        return (
          <div className="space-y-8">
            <div className="p-8 rounded-[2rem] bg-indigo-500/[0.03] border border-indigo-500/10 relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-lg shadow-indigo-500/10">
                     <Sparkles className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                     <h3 className="text-xl font-black text-white leading-tight">AI Tools Hub</h3>
                     <p className="text-sm text-neutral-400 font-medium">Elevate your resume with expert AI assistance</p>
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                  <Link href="/dashboard/youtube-summarizer" target="_blank" className="p-5 rounded-2xl bg-[#030303]/60 border border-white/[0.05] hover:border-red-500/30 transition-all group/card shadow-xl">
                     <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                          <Youtube className="w-5 h-5 text-red-500" />
                        </div>
                        <div className="text-base font-bold text-white group-hover/card:text-red-400 transition-colors">YouTube Summarizer</div>
                     </div>
                     <div className="text-xs text-neutral-500 font-medium leading-relaxed">Instantly convert tech tutorials into professional bullet points for your experience sections.</div>
                  </Link>
                  <Link href="/dashboard/job-search" target="_blank" className="p-5 rounded-2xl bg-[#030303]/60 border border-white/[0.05] hover:border-blue-500/30 transition-all group/card shadow-xl">
                     <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                          <Briefcase className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="text-base font-bold text-white group-hover/card:text-blue-400 transition-colors">Smart Job Search</div>
                     </div>
                     <div className="text-xs text-neutral-500 font-medium leading-relaxed">Find high-paying roles that match your tailored resume using our AI-driven Firecrawl engine.</div>
                  </Link>
               </div>
            </div>
          </div>
        );
      case 7:
        return <ThemeCustomizer config={resumeData.themeConfig} onChange={handleThemeChange} />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-neutral-950 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-6 relative z-10" />
        <div className="flex flex-col items-center relative z-10">
          <p className="text-white font-black tracking-[0.3em] text-xs uppercase mb-2">Initializing Premium Canvas</p>
          <div className="h-0.5 w-48 bg-neutral-900 rounded-full overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="h-full w-24 bg-indigo-500 rounded-full"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-neutral-950 overflow-hidden font-sans text-neutral-100 selection:bg-indigo-500/30">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
      
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-neutral-950 border-r border-white/[0.06] flex flex-col hidden md:flex h-full z-10 shadow-2xl relative transition-all">
        <div className="p-6 border-b border-white/[0.04] bg-neutral-950/50 backdrop-blur-md">
          <Link href="/dashboard" className="group flex items-center text-xs font-black tracking-widest text-neutral-500 hover:text-white transition-all uppercase mb-2">
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Dashboard
          </Link>
          <div className="flex items-center justify-between mt-4">
            <Logo size="sm" />
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase tracking-tighter">
              <CloudFog className="w-3 h-3" />
              Pro Sync
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-8 px-4 space-y-1 custom-scrollbar">
          <h2 className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em] mb-4 px-3">Resume Architecture</h2>
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isPast = index < currentStep;

            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`w-full group flex items-center gap-4 px-4 py-3 rounded-2xl text-sm transition-all duration-300 ${
                  isActive 
                    ? "bg-white/5 text-white font-bold border border-white/[0.08] shadow-lg shadow-black/20" 
                    : "text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.02]"
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]' : 'bg-neutral-900 group-hover:bg-neutral-800'}`}>
                  <Icon className={`w-4 h-4 ${isActive ? 'scale-110' : ''}`} />
                </div>
                {step.label}
                {isPast && !isActive && (
                  <div className="ml-auto">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500/70" />
                  </div>
                )}
                {isActive && (
                  <motion.div layoutId="activeStep" className="ml-auto w-1 h-4 bg-indigo-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        <div className="p-6 bg-neutral-950/80 border-t border-white/[0.04]">
          <AtsScoringDialog resumeData={resumeData} />
        </div>
      </aside>

      {/* Main Form Area */}
      <main className="flex-1 flex flex-col h-full bg-neutral-950 relative z-20 border-r border-white/[0.06] overflow-hidden">
        {/* Header with Save Status */}
        <header className="h-20 border-b border-white/[0.04] bg-neutral-950/50 backdrop-blur-xl flex items-center justify-between px-8 z-30">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-black tracking-tight text-white hidden sm:block">Editor</h2>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <AnimatePresence mode="wait">
                {isSaving ? (
                  <motion.div 
                    key="saving"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400"
                  >
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Synchronizing...</span>
                  </motion.div>
                ) : lastSaved ? (
                  <motion.div 
                    key="saved"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500/70"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Securely Saved</span>
                  </motion.div>
                ) : (
                  <div key="idle" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600">
                    <Save className="w-3 h-3" />
                    <span>Auto-save Active</span>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <Button variant="ghost" size="sm" className="h-10 px-4 rounded-xl text-neutral-400 hover:text-white border-none group">
               <Sparkles className="w-4 h-4 mr-2 text-indigo-400 group-hover:animate-pulse" />
               AI Optimize
             </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
          <motion.div 
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-2xl mx-auto"
          >
            <div className="mb-12">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">
                 Step 0{currentStep + 1}
               </div>
               <h1 className="text-4xl font-black tracking-tight text-white mb-3 leading-tight">{steps[currentStep].label}</h1>
               <p className="text-neutral-400 font-medium leading-relaxed">Provide your details to architect your professional identity.</p>
            </div>
            
            {renderCurrentForm()}
          </motion.div>
        </div>

        {/* Footer Navigation */}
        <footer className="p-8 border-t border-white/[0.04] bg-neutral-950/80 backdrop-blur-md flex items-center justify-between z-30">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="text-neutral-500 hover:text-white font-black uppercase text-xs tracking-widest border-none h-12"
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          
          <div className="flex gap-2">
            <Button 
              className="bg-white text-black hover:bg-indigo-600 hover:text-white font-black h-12 px-8 rounded-2xl transition-all duration-300 uppercase text-xs tracking-widest shadow-xl border-none"
              onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
            >
              {currentStep === steps.length - 1 ? "Finish Design" : "Next Step"}
              {currentStep !== steps.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </footer>
      </main>

      {/* Live Preview Pane */}
      <aside className="hidden lg:flex flex-1 max-w-3xl bg-neutral-900/10 flex-col relative h-full border-l border-white/[0.04] transition-all overflow-hidden">
        <div className="h-20 px-8 border-b border-white/[0.04] flex items-center justify-between bg-neutral-950/80 backdrop-blur-md z-30">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-neutral-400">Master Preview</span>
          </div>
          <div className="flex items-center gap-3">
            <Select value={activeTemplate} onValueChange={(v) => setActiveTemplate(v as TemplateType)}>
              <SelectTrigger className="w-[160px] h-11 bg-neutral-900/50 border-white/[0.08] text-white font-bold rounded-xl focus:ring-indigo-500 text-xs">
                <SelectValue placeholder="Chose Identity" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900/90 backdrop-blur-2xl border-white/[0.08] text-white rounded-xl">
                <SelectItem value="modern" className="hover:bg-indigo-600 focus:bg-indigo-600 rounded-lg">Modern Pro</SelectItem>
                <SelectItem value="professional" className="hover:bg-indigo-600 focus:bg-indigo-600 rounded-lg">Executive</SelectItem>
                <SelectItem value="minimal" className="hover:bg-indigo-600 focus:bg-indigo-600 rounded-lg">Minimalist</SelectItem>
                <SelectItem value="creative" className="hover:bg-indigo-600 focus:bg-indigo-600 rounded-lg">Creative Edge</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              size="icon"
              className="h-11 w-11 bg-neutral-900 border border-white/[0.08] text-white hover:bg-indigo-600 transition-all rounded-xl shadow-lg"
              onClick={() => handlePrint()}
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-black h-11 px-6 rounded-xl transition-all border-none shadow-lg shadow-indigo-500/20"
              onClick={() => router.push('/dashboard')}
            >
              Finish
            </Button>
          </div>
        </div>
        
        {/* Preview Canvas */}
        <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-[#050505] selection:bg-indigo-500/30 custom-scrollbar relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] to-transparent pointer-events-none" />
          <div 
            ref={printRef}
            className="w-[210mm] min-h-[297mm] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.5)] origin-top sm:scale-[0.8] xl:scale-100 transition-transform flex flex-col print:shadow-none print:scale-100 print:m-0 print:border-none relative z-10"
          >
            {/* Live Rendered Template */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTemplate}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                {activeTemplate === 'modern' && <ModernTemplate data={resumeData} />}
                {activeTemplate === 'professional' && <ProfessionalTemplate data={resumeData} />}
                {activeTemplate === 'minimal' && <MinimalTemplate data={resumeData} />}
                {activeTemplate === 'creative' && <CreativeTemplate data={resumeData} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </aside>
    </div>
  );
}
