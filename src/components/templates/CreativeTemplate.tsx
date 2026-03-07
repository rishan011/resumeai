import { ResumeData } from "./ModernTemplate";
import { Experience } from "../forms/ExperienceForm";
import { Education } from "../forms/EducationForm";
import { Project } from "../forms/ProjectsForm";

import { SectionItem } from "../forms/ThemeCustomizer";

export function CreativeTemplate({ data }: { data: ResumeData }) {
  const accent = data.themeConfig?.accentColor || "#4F46E5"; // Default Indigo
  const font = data.themeConfig?.fontFamily || "ui-sans-serif, system-ui, sans-serif";
  const sections = data.themeConfig?.sectionOrder?.filter((s) => s.visible) || [
    { id: "summary", label: "Summary", visible: true },
    { id: "experience", label: "Experience", visible: true },
    { id: "projects", label: "Projects", visible: true },
    { id: "education", label: "Education", visible: true },
    { id: "skills", label: "Skills", visible: true },
  ];

  // Helper to safely get color variations based on the hex accent
  // In a real app we might use a color library, but inline we'll stick to the base accent
  // and use opacity for lighter/darker shades where needed.

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const renderMainSection = (section: SectionItem) => {
    switch (section.id) {
      case "summary":
        return data.summary ? (
          <div key="summary" className="relative">
            <div className="absolute -left-4 top-0 text-7xl font-serif leading-none select-none" style={{ color: `${accent}33` }}>
              &quot;
            </div>
            <p className="text-[15px] leading-relaxed text-neutral-600 relative z-10 font-medium italic pt-4">
              {data.summary}
            </p>
          </div>
        ) : null;

      case "experience":
        return data.experience?.length > 0 ? (
          <div key="experience" className="space-y-6">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-black text-neutral-900">Experience</h3>
              <div className="h-0.5 flex-1" style={{ background: `linear-gradient(to right, ${accent}40, transparent)` }} />
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5" style={{ '--tw-gradient-from': `${accent}00`, '--tw-gradient-via': `${accent}40`, '--tw-gradient-to': `${accent}00`, backgroundImage: 'linear-gradient(to bottom, var(--tw-gradient-from), var(--tw-gradient-via), var(--tw-gradient-to))' } as React.CSSProperties}>
              {data.experience.map((exp: Experience, idx: number) => (
                <div key={exp.id || idx} className="relative pl-10">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 w-5 h-5 bg-white border-4 rounded-full shadow-sm" style={{ borderColor: accent, boxShadow: `0 1px 2px 0 ${accent}40` }} />

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-[16px] text-neutral-900">{exp.jobTitle || "Job Title"}</h4>
                        <div className="text-[14px] font-semibold mt-0.5" style={{ color: accent }}>{exp.company || "Company"}</div>
                      </div>
                      <div className="px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap" style={{ backgroundColor: `${accent}15`, color: accent }}>
                        {exp.startDate || "Start"} — {exp.current ? "Present" : exp.endDate || "End"}
                      </div>
                    </div>
                    <ul className="text-[13px] leading-relaxed list-none space-y-2 mt-4 text-neutral-600">
                      {exp.description ? (
                        exp.description.split("\n").filter((b: string) => b.trim() !== "").map((bullet: string, i: number) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-1 flex-shrink-0" style={{ color: accent }}>✦</span>
                            <span>{bullet.replace(/^[-\*]\s*/, "")}</span>
                          </li>
                        ))
                      ) : (
                        <li>Description & achievements...</li>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case "projects":
        return data.projects?.length > 0 ? (
          <div key="projects" className="space-y-6">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-black text-neutral-900">Featured Work</h3>
              <div className="h-0.5 flex-1" style={{ background: `linear-gradient(to right, ${accent}40, transparent)` }} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {data.projects.map((proj: Project, idx: number) => (
                <div key={proj.id || idx} className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm">
                  <h4 className="font-bold text-[14px] text-neutral-900 mb-1">{proj.name || "Project"}</h4>
                  {proj.technologies && (
                    <div className="text-[11px] font-medium mb-3" style={{ color: accent }}>{proj.technologies}</div>
                  )}
                  {proj.description && (
                    <p className="text-[12px] leading-relaxed text-neutral-600 line-clamp-4">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      default:
        return null; // Education and Skills go in the sidebar by default in this template
    }
  };

  const renderSidebarSection = (section: SectionItem) => {
    switch (section.id) {
      case "skills":
        return data.skills?.length > 0 ? (
          <div key="skills" className="space-y-4 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
            <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: `${accent}99` }}>Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill: string, index: number) => (
                <span key={index} className="px-3 py-1.5 rounded-xl text-[12px] font-medium border" style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderColor: 'rgba(255,255,255,0.1)' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ) : null;

      case "education":
        return data.education?.length > 0 ? (
          <div key="education" className="space-y-4 pt-4 border-t pb-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
            <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: `${accent}99` }}>Education</h3>
            <div className="space-y-3">
              {data.education.map((edu: Education, idx: number) => (
                <div key={edu.id || idx}>
                  <div className="text-[13px] font-bold text-white mb-0.5">{edu.degree || "Degree"}</div>
                  <div className="text-[12px]" style={{ color: 'rgba(255,255,255,0.8)' }}>{edu.school || "School"}</div>
                  <div className="text-[11px] mt-1" style={{ color: `${accent}99` }}>{edu.endDate || "Date"}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      default:
        return null; // Handled in main
    }
  };

  const mainSections = ["summary", "experience", "projects"];
  const sideSections = ["skills", "education"];

  const mainArea = sections.filter(s => mainSections.includes(s.id));
  const sideArea = sections.filter(s => sideSections.includes(s.id));

  return (
    <div className="w-full h-full bg-[#FAFAFA] flex p-8 gap-8 text-neutral-800" style={{ fontFamily: font }}>
      
      {/* Left Sidebar (Dark, creative accent) */}
      <div className="w-1/3 text-white rounded-3xl p-8 flex flex-col shadow-xl relative overflow-hidden" style={{ backgroundColor: '#1E1B4B' }}>
        {/* Subtle background glow effect using accent color */}
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ backgroundColor: accent }} />
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Logo / Initials */}
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black mb-8 shadow-lg transform rotate-3" style={{ background: `linear-gradient(135deg, ${accent}, #1E1B4B)` }}>
            {getInitials(data.personalInfo.fullName || "Your Name")}
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight mb-2 leading-tight">
            {data.personalInfo.fullName || "Your Name"}
          </h1>
          <h2 className="text-[15px] font-medium uppercase tracking-widest mb-10" style={{ color: `${accent}ee` }}>
            {data.personalInfo.jobTitle || "Job Title"}
          </h2>

          <div className="space-y-8 flex-1">
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: `${accent}99` }}>Contact</h3>
              <div className="space-y-3 text-[13px]" style={{ color: 'rgba(255,255,255,0.85)' }}>
                {data.personalInfo.email && <div className="break-all">{data.personalInfo.email}</div>}
                {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
                {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
                {data.personalInfo.portfolio && (
                  <a href={data.personalInfo.portfolio} className="hover:text-white block truncate transition-colors">
                    {data.personalInfo.portfolio.replace(/^https?:\/\//, "")}
                  </a>
                )}
                {data.personalInfo.linkedin && (
                  <a href={data.personalInfo.linkedin} className="hover:text-white block truncate transition-colors">
                    {data.personalInfo.linkedin.replace(/^(https?:\/\/)?(www\.)?linkedin\.com\/(in\/)?/, "")}
                  </a>
                )}
              </div>
            </div>

            {/* Render Sidebar Ordered Sections */}
            {sideArea.map(section => renderSidebarSection(section))}

          </div>
        </div>
      </div>

      {/* Right Main Content */}
      <div className="flex-1 py-4 pr-4 space-y-10 overflow-y-auto">
        {mainArea.map(section => renderMainSection(section))}
      </div>
    </div>
  );
}
