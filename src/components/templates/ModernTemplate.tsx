import { Experience } from "../forms/ExperienceForm";
import { Education } from "../forms/EducationForm";
import { Project } from "../forms/ProjectsForm";
import { ThemeConfig, SectionItem } from "../forms/ThemeCustomizer";

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
  themeConfig?: ThemeConfig;
}

export function ModernTemplate({ data }: { data: ResumeData }) {
  const accent = data.themeConfig?.accentColor || "#4F46E5";
  const font = data.themeConfig?.fontFamily || "Inter, sans-serif";
  const sections = data.themeConfig?.sectionOrder?.filter(s => s.visible) || [
    { id: "summary", label: "Summary", visible: true },
    { id: "experience", label: "Experience", visible: true },
    { id: "education", label: "Education", visible: true },
    { id: "projects", label: "Projects", visible: true },
    { id: "skills", label: "Skills", visible: true },
  ];

  const renderSection = (section: SectionItem) => {
    switch (section.id) {
      case "summary":
        return data.summary ? (
          <div key="summary" className="space-y-3 pb-6 border-b border-neutral-200">
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-widest">Professional Summary</h3>
            <p className="text-[13px] leading-relaxed text-neutral-700 whitespace-pre-wrap">{data.summary}</p>
          </div>
        ) : null;

      case "experience":
        return data.experience?.length > 0 ? (
          <div key="experience" className="space-y-5 pt-2">
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-widest pb-3 border-b border-neutral-200">Experience</h3>
            {data.experience.map((exp: Experience, idx: number) => (
              <div key={exp.id || idx} className="flex gap-4">
                <div className="space-y-1 mt-1">
                  <div className="w-2.5 h-2.5 rounded-full mt-1.5" style={{ backgroundColor: accent, boxShadow: `0 0 0 4px ${accent}15` }} />
                  <div className="w-0.5 h-full bg-neutral-200 mx-auto" />
                </div>
                <div className="space-y-2 flex-1 pb-6">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-neutral-900 text-[15px]">{exp.jobTitle || "Job Title"}</h4>
                    <span className="text-xs text-neutral-500 font-medium whitespace-nowrap">
                      {exp.startDate || "Start"} - {exp.current ? "Present" : (exp.endDate || "End")}
                    </span>
                  </div>
                  <div className="text-[13px] font-semibold mb-2" style={{ color: accent }}>
                    {exp.company || "Company"}{exp.location ? ` • ${exp.location}` : ""}
                  </div>
                  <ul className="text-[13px] leading-relaxed text-neutral-700 list-disc list-inside space-y-1.5 ml-1 whitespace-pre-line">
                    {exp.description ? exp.description.split('\n').filter((b: string) => b.trim() !== '').map((bullet: string, i: number) => (
                      <li key={i}>{bullet.replace(/^[-*]\s*/, '')}</li>
                    )) : <li>Description &amp; achievements...</li>}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : null;

      case "education":
        return data.education?.length > 0 ? (
          <div key="education" className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-widest pb-3 border-b border-neutral-200">Education</h3>
            {data.education.map((edu: Education, idx: number) => (
              <div key={edu.id || idx} className="flex gap-4">
                <div className="space-y-1 mt-1">
                  <div className="w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: accent, opacity: 0.7, boxShadow: `0 0 0 4px ${accent}10` }} />
                  <div className="w-0.5 h-full bg-neutral-200 mx-auto" />
                </div>
                <div className="space-y-1.5 flex-1 pb-4">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-neutral-900 text-[14px]">{edu.school || "University/School"}</h4>
                    <span className="text-xs text-neutral-500 font-medium whitespace-nowrap">
                      {edu.startDate || "Start"} - {edu.endDate || "End"}
                    </span>
                  </div>
                  <div className="text-[13px] font-medium" style={{ color: accent }}>
                    {edu.degree || "Degree"}{edu.gpa ? ` • GPA: ${edu.gpa}` : ""}{edu.location ? ` • ${edu.location}` : ""}
                  </div>
                  {edu.description && (
                    <p className="text-[12px] leading-relaxed text-neutral-600 whitespace-pre-wrap mt-1">{edu.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : null;

      case "projects":
        return data.projects?.length > 0 ? (
          <div key="projects" className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-widest pb-3 border-b border-neutral-200">Projects</h3>
            {data.projects.map((proj: Project, idx: number) => (
              <div key={proj.id || idx} className="flex gap-4">
                <div className="space-y-1 mt-1">
                  <div className="w-2.5 h-2.5 rounded-full mt-1.5" style={{ backgroundColor: accent, boxShadow: `0 0 0 4px ${accent}15` }} />
                  <div className="w-0.5 h-full bg-neutral-200 mx-auto" />
                </div>
                <div className="space-y-1.5 flex-1 pb-4">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-neutral-900 text-[14px]">{proj.name || "Project Name"}</h4>
                    {proj.url && (
                      <a href={proj.url} target="_blank" rel="noreferrer" className="text-xs hover:underline" style={{ color: accent }}>
                        {proj.url.replace(/^https?:\/\//, '')}
                      </a>
                    )}
                  </div>
                  {proj.technologies && (
                    <div className="text-[12px] font-medium" style={{ color: accent, opacity: 0.8 }}>{proj.technologies}</div>
                  )}
                  {proj.description && (
                    <p className="text-[12px] leading-relaxed text-neutral-600 whitespace-pre-wrap mt-1">{proj.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : null;

      case "skills":
        return data.skills?.length > 0 ? (
          <div key="skills" className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-widest pb-3 border-b border-neutral-200">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill: string, index: number) => (
                <div key={index} className="px-2.5 py-1 bg-neutral-100 text-neutral-700 rounded-md text-[12px] font-medium border border-neutral-200/60">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-white flex flex-col" style={{ fontFamily: font }}>
      <div className="w-full h-auto min-h-[140px] flex flex-col justify-center px-12 py-10 text-white shrink-0" style={{ backgroundColor: '#171717' }}>
        <h1 className="text-[32px] font-bold tracking-tight mb-1 text-white/95">
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <h2 className="text-lg font-medium mb-4" style={{ color: `${accent}99` }}>
          {data.personalInfo.jobTitle || "Job Title"}
        </h2>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-300">
          {data.personalInfo.email && <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full flex flex-shrink-0" style={{ backgroundColor: `${accent}55` }} />{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full flex flex-shrink-0" style={{ backgroundColor: `${accent}55` }} />{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full flex flex-shrink-0" style={{ backgroundColor: `${accent}55` }} />{data.personalInfo.location}</div>}
          {data.personalInfo.linkedin && <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full flex flex-shrink-0" style={{ backgroundColor: `${accent}55` }} />{data.personalInfo.linkedin}</div>}
          {data.personalInfo.portfolio && <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full flex flex-shrink-0" style={{ backgroundColor: `${accent}55` }} />{data.personalInfo.portfolio}</div>}
        </div>
      </div>

      <div className="flex-1 p-12 space-y-8 min-h-0 text-black">
        {sections.map(section => renderSection(section))}
      </div>
    </div>
  );
}
