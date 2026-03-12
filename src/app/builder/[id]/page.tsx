"use client";

import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { 
  User, FileText, Briefcase, GraduationCap, 
  Wrench, Layers, ChevronLeft, ChevronRight, Download, Sparkles, Palette, Youtube
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TemplateType = "modern" | "minimal" | "professional" | "creative";

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
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTemplate, setActiveTemplate] = useState<TemplateType>("modern");

  // Ref for printing
  const printRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Resume",
  });

  // Setup initial mock state to illustrate Live Preview binding
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: "Jane Smith",
      jobTitle: "Senior Product Designer",
      email: "jane.smith@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      portfolio: "janesmith.design",
      linkedin: "linkedin.com/in/janesmith"
    },
    summary: "Results-driven designer with over 8 years of experience building stunning digital experiences. Proven track record of improving user engagement metrics by 35% through intuitive interface designs and seamless user journeys.",
    experience: [
      {
        id: "1",
        jobTitle: "Senior Product Designer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        startDate: "Jan 2021",
        endDate: "",
        current: true,
        description: "Led the redesign of the core SaaS platform, increasing user retention by 22% within Q1.\nEstablished a comprehensive design system utilized by 4 cross-functional development teams.\nMentored 3 junior designers and led weekly critique sessions to foster a culture of quality."
      }
    ],
    education: [
      {
        id: "1",
        degree: "B.S. in Human-Computer Interaction",
        school: "University of California, Berkeley",
        location: "Berkeley, CA",
        startDate: "Aug 2013",
        endDate: "May 2017",
        gpa: "3.8",
        description: "Graduated with Honors. President of the Design Society."
      }
    ],
    skills: ["UI/UX Design", "Figma", "Prototyping", "User Research", "Wireframing", "Design Systems"],
    projects: [
      {
        id: "1",
        name: "EcoTrack Mobile App",
        description: "Designed a mobile application that helps users track their daily carbon footprint. Created wireframes, high-fidelity mockups, and interactive prototypes.",
        url: "https://dribbble.com/janesmith/ecotrack",
        technologies: "Figma, Principle, UserTesting"
      }
    ],
    themeConfig: {
      accentColor: "#4F46E5",
      fontFamily: "Inter, sans-serif",
      sectionOrder: [...DEFAULT_SECTIONS],
    } as ThemeConfig,
  });

  const handlePersonalInfoChange = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const handleSummaryChange = (value: string) => {
    setResumeData(prev => ({
      ...prev,
      summary: value
    }));
  };

  const handleExperienceChange = (data: Experience[]) => {
    setResumeData(prev => ({
      ...prev,
      experience: data
    }));
  };

  const handleEducationChange = (data: Education[]) => {
    setResumeData(prev => ({
      ...prev,
      education: data
    }));
  };

  const handleSkillsChange = (data: string[]) => {
    setResumeData(prev => ({
      ...prev,
      skills: data
    }));
  };

  const handleProjectsChange = (data: Project[]) => {
    setResumeData(prev => ({
      ...prev,
      projects: data
    }));
  };

  const handleThemeChange = (config: ThemeConfig) => {
    setResumeData(prev => ({
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
            <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/20">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                     <Sparkles className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                     <h3 className="text-lg font-bold text-white">AI Tools Hub</h3>
                     <p className="text-xs text-neutral-400">Boost your resume with external data</p>
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/dashboard/youtube-summarizer" target="_blank" className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-500/30 transition-all group">
                     <Youtube className="w-6 h-6 text-neutral-500 group-hover:text-red-500 mb-2 transition-colors" />
                     <div className="text-sm font-bold text-white">YouTube Summarizer</div>
                     <div className="text-[10px] text-neutral-500 mt-1">Extract results from tech tutorials to add to your experience.</div>
                  </Link>
                  <Link href="/dashboard/job-search" target="_blank" className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-blue-500/30 transition-all group">
                     <Briefcase className="w-6 h-6 text-neutral-500 group-hover:text-blue-500 mb-2 transition-colors" />
                     <div className="text-sm font-bold text-white">Smart Job Search</div>
                     <div className="text-[10px] text-neutral-500 mt-1">Find jobs that match this resume using Firecrawl AI.</div>
                  </Link>
               </div>
            </div>
          </div>
        );
      case 7:
        return <ThemeCustomizer config={resumeData.themeConfig} onChange={handleThemeChange} />;
      default:
        // Render placeholders for steps not yet implemented
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-4 w-24 bg-neutral-100 rounded animate-pulse" />
                <div className="h-10 w-full bg-neutral-50 border border-neutral-200 rounded-md" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-neutral-100 rounded animate-pulse" />
                <div className="h-10 w-full bg-neutral-50 border border-neutral-200 rounded-md" />
              </div>
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                   <div className="h-4 w-32 bg-neutral-100 rounded animate-pulse" />
                   <div className="flex items-center gap-1 text-xs text-indigo-600 font-medium">
                      <Sparkles className="w-3 h-3" /> Optimize with AI
                   </div>
                </div>
                <div className="h-32 w-full bg-neutral-50 border border-neutral-200 rounded-md" />
            </div>
            {currentStep === 2 && (
              <Button variant="outline" className="w-full border-dashed border-2 py-6 text-neutral-500 hover:bg-neutral-50 group">
                <span className="group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                   + Add Another Experience
                </span>
              </Button>
            )}
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-neutral-950 overflow-hidden font-sans text-neutral-100">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col hidden md:flex h-full z-10 shadow-sm relative">
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
          <Link href="/dashboard" className="text-sm font-medium flex items-center text-neutral-400 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" /> Dashboard
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4 px-2">Resume Sections</h2>
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isPast = index < currentStep;

            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? "bg-indigo-600/10 text-indigo-400 font-semibold border border-indigo-500/20" 
                    : isPast 
                      ? "text-neutral-300 hover:bg-neutral-800" 
                      : "text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800"
                }`}
              >
                <div className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${isActive ? 'bg-indigo-600/20 text-indigo-400' : isPast ? 'bg-neutral-800 text-neutral-300' : 'bg-transparent text-neutral-500'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                {step.label}
                {isPast && !isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />
                )}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-neutral-800">
          <AtsScoringDialog resumeData={resumeData} />
        </div>
      </aside>

      {/* Main Form Area */}
      <main className="flex-1 flex flex-col h-full bg-neutral-950 relative z-20 border-r border-neutral-800 overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-neutral-800 bg-neutral-950">
           <Link href="/dashboard" className="text-neutral-400 hover:text-white transition-colors">
             <ChevronLeft className="w-5 h-5" />
           </Link>
           <div className="font-semibold text-sm text-white">Step {currentStep + 1} of {steps.length}</div>
           <Button variant="ghost" size="icon" className="hover:bg-neutral-900 border-none"><Sparkles className="w-4 h-4 text-indigo-400" /></Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 relative">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-white mb-2">{steps[currentStep].label}</h1>
              <p className="text-neutral-400 text-sm">Fill in your {steps[currentStep].label.toLowerCase()} details to populate your resume.</p>
            </div>
            
            {/* Dynamic Form Content */}
            {renderCurrentForm()}
            
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-4 md:p-6 border-t border-neutral-800 bg-neutral-950 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="w-full md:w-auto text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors border-none"
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button variant="secondary" className="w-full md:w-auto md:hidden bg-neutral-800 text-white hover:bg-neutral-700 border-none">
               Preview
            </Button>
            <Button 
              className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 shadow-sm text-white border-none"
              onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
            >
              {currentStep === steps.length - 1 ? "Finish" : "Next Step"}
              {currentStep !== steps.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </main>

      {/* Live Preview Pane */}
      <aside className="hidden lg:flex flex-1 max-w-2xl bg-neutral-950/50 flex-col relative h-full border-l border-neutral-800">
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/80 backdrop-blur-md shadow-sm z-30 sticky top-0">
          <div className="text-sm font-semibold text-white flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Preview
          </div>
          <div className="flex items-center gap-2">
            <Select value={activeTemplate} onValueChange={(v) => setActiveTemplate(v as TemplateType)}>
              <SelectTrigger className="w-[140px] h-8 text-xs bg-neutral-900 border-neutral-700 text-white shadow-sm focus:ring-indigo-500">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                <SelectItem value="modern" className="focus:bg-neutral-800 focus:text-white">Modern</SelectItem>
                <SelectItem value="professional" className="focus:bg-neutral-800 focus:text-white">Professional</SelectItem>
                <SelectItem value="minimal" className="focus:bg-neutral-800 focus:text-white">Minimal</SelectItem>
                <SelectItem value="creative" className="focus:bg-neutral-800 focus:text-white">Creative</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 shadow-sm bg-neutral-900 border-neutral-700 text-white hover:bg-neutral-800 transition-colors"
              onClick={() => handlePrint()}
            >
              <Download className="w-3.5 h-3.5 mr-2" /> PDF
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-sm h-8 text-white transition-colors border-none" size="sm">
              Save
            </Button>
          </div>
        </div>
        
        {/* Preview Canvas */}
        <div className="flex-1 overflow-y-auto p-8 flex justify-center bg-neutral-950/50 selection:bg-indigo-500/30">
          <div 
            ref={printRef}
            className="w-[210mm] min-h-[297mm] bg-white shadow-2xl origin-top sm:scale-[0.85] xl:scale-100 transition-transform flex flex-col print:shadow-none print:scale-100 print:m-0 print:border-none ring-1 ring-neutral-800"
          >
            {/* Live Rendered Template */}
            {activeTemplate === 'modern' && <ModernTemplate data={resumeData} />}
            {activeTemplate === 'professional' && <ProfessionalTemplate data={resumeData} />}
            {activeTemplate === 'minimal' && <MinimalTemplate data={resumeData} />}
            {activeTemplate === 'creative' && <CreativeTemplate data={resumeData} />}
          </div>
        </div>
      </aside>
    </div>
  );
}
