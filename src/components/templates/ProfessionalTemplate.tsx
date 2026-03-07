import { ResumeData } from "./ModernTemplate";
import { Experience } from "../forms/ExperienceForm";
import { Education } from "../forms/EducationForm";
import { Project } from "../forms/ProjectsForm";

import { SectionItem } from "../forms/ThemeCustomizer";

export function ProfessionalTemplate({ data }: { data: ResumeData }) {
  const accent = data.themeConfig?.accentColor || "#4F46E5";
  const font = data.themeConfig?.fontFamily || "Inter, sans-serif";
  const sections = data.themeConfig?.sectionOrder?.filter((s) => s.visible) || [
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
          <div key="summary" className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b-2 pb-1" style={{ borderColor: `${accent}40` }}>Professional Summary</h2>
            <p className="text-[13px] leading-relaxed whitespace-pre-wrap text-slate-800">{data.summary}</p>
          </div>
        ) : null;

      case "experience":
        return data.experience?.length > 0 ? (
          <div key="experience" className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b-2 pb-1" style={{ borderColor: `${accent}40` }}>Experience</h2>
            <div className="space-y-4">
              {data.experience.map((exp: Experience, idx: number) => (
                <div key={exp.id || idx}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-[14px] text-slate-900">{exp.jobTitle || "Job Title"}</h3>
                    <span className="text-[12px] font-medium text-slate-600 whitespace-nowrap">
                      {exp.startDate || "Start"} - {exp.current ? "Present" : exp.endDate || "End"}
                    </span>
                  </div>
                  <div className="text-[13px] font-medium mb-1.5" style={{ color: accent }}>
                    {exp.company || "Company"}
                    {exp.location ? ` | ${exp.location}` : ""}
                  </div>
                  <ul className="text-[13px] leading-relaxed list-disc list-outside ml-4 space-y-1 text-slate-700">
                    {exp.description ? (
                      exp.description.split("\n").filter((b: string) => b.trim() !== "").map((bullet: string, i: number) => (
                        <li key={i}>{bullet.replace(/^[-\*]\s*/, "")}</li>
                      ))
                    ) : (
                      <li>Description & achievements...</li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case "projects":
        return data.projects?.length > 0 ? (
          <div key="projects" className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b-2 pb-1" style={{ borderColor: `${accent}40` }}>Key Projects</h2>
            <div className="space-y-3">
              {data.projects.map((proj: Project, idx: number) => (
                <div key={proj.id || idx}>
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <h3 className="font-bold text-[13px] text-slate-900">{proj.name || "Project Name"}</h3>
                    {proj.technologies && <span className="text-[11px] font-medium" style={{ color: `${accent}99` }}>({proj.technologies})</span>}
                  </div>
                  {proj.description && <p className="text-[12px] leading-relaxed text-slate-700 whitespace-pre-wrap">{proj.description}</p>}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case "skills":
        return data.skills?.length > 0 ? (
          <div key="skills" className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b-2 pb-1" style={{ borderColor: `${accent}40` }}>Skills</h2>
            <div className="flex flex-col gap-1">
              {data.skills.map((skill: string, index: number) => (
                <div key={index} className="text-[12px] text-slate-700">
                  <span style={{ color: accent }} className="mr-1.5">•</span>{skill}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case "education":
        return data.education?.length > 0 ? (
          <div key="education" className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b-2 pb-1" style={{ borderColor: `${accent}40` }}>Education</h2>
            <div className="space-y-3">
              {data.education.map((edu: Education, idx: number) => (
                <div key={edu.id || idx}>
                  <h3 className="font-bold text-[12px] text-slate-900 leading-tight mb-0.5">{edu.degree || "Degree"}</h3>
                  <div className="text-[11px] text-slate-700 leading-tight">{edu.school || "School"}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {edu.startDate || "Start"} - {edu.endDate || "End"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      default:
        return null;
    }
  };

  // Group sections for the two-column layout
  const mainColSections = ["summary", "experience", "projects"];
  const sideColSections = ["skills", "education"];

  const mainCol = sections.filter((s) => mainColSections.includes(s.id));
  const sideCol = sections.filter((s) => sideColSections.includes(s.id));

  return (
    <div className="w-full h-full bg-white flex flex-col p-12 text-slate-900 border-t-8" style={{ fontFamily: font, borderColor: accent }}>
      <div className="w-full mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <h2 className="text-lg font-medium mb-4" style={{ color: accent }}>
          {data.personalInfo.jobTitle || "Job Title"}
        </h2>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
          {data.personalInfo.email && (
            <span className="flex items-center gap-1.5"><strong className="text-slate-700">Email:</strong> {data.personalInfo.email}</span>
          )}
          {data.personalInfo.phone && (
            <span className="flex items-center gap-1.5"><strong className="text-slate-700">Phone:</strong> {data.personalInfo.phone}</span>
          )}
          {data.personalInfo.location && (
            <span className="flex items-center gap-1.5"><strong className="text-slate-700">Location:</strong> {data.personalInfo.location}</span>
          )}
          {data.personalInfo.linkedin && (
            <span className="flex items-center gap-1.5"><strong className="text-slate-700">LinkedIn:</strong> {data.personalInfo.linkedin.replace(/^(https?:\/\/)?(www\.)?linkedin\.com\/(in\/)?/, "")}</span>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-0 text-slate-800">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {mainCol.map((section) => renderSection(section))}
          </div>

          <div className="col-span-1 space-y-6">
            {sideCol.map((section) => renderSection(section))}
          </div>
        </div>
      </div>
    </div>
  );
}
