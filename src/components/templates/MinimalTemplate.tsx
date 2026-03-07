import { ResumeData } from "./ModernTemplate";
import { Experience } from "../forms/ExperienceForm";
import { Education } from "../forms/EducationForm";
import { Project } from "../forms/ProjectsForm";

import { SectionItem } from "../forms/ThemeCustomizer";

export function MinimalTemplate({ data }: { data: ResumeData }) {
  const accent = data.themeConfig?.accentColor || "#000000";
  const font = data.themeConfig?.fontFamily || "Georgia, serif";
  const sections = data.themeConfig?.sectionOrder?.filter((s) => s.visible) || [
    { id: "summary", label: "Summary", visible: true },
    { id: "experience", label: "Experience", visible: true },
    { id: "projects", label: "Projects", visible: true },
    { id: "education", label: "Education", visible: true },
    { id: "skills", label: "Skills", visible: true },
  ];

  const renderSection = (section: SectionItem) => {
    switch (section.id) {
      case "summary":
        return data.summary ? (
          <div key="summary" className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: accent }}>Summary</h2>
            <p className="text-[13px] leading-relaxed whitespace-pre-wrap">{data.summary}</p>
          </div>
        ) : null;

      case "experience":
        return data.experience?.length > 0 ? (
          <div key="experience" className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest border-b pb-1" style={{ color: accent, borderColor: `${accent}40` }}>Experience</h2>
            <div className="space-y-6">
              {data.experience.map((exp: Experience, idx: number) => (
                <div key={exp.id || idx}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-[14px]">
                      {exp.jobTitle || "Job Title"} <span className="font-normal italic text-neutral-600">at {exp.company || "Company"}</span>
                    </h3>
                    <span className="text-[12px] text-neutral-500 whitespace-nowrap">
                      {exp.startDate || "Start"} - {exp.current ? "Present" : exp.endDate || "End"} {exp.location ? `| ${exp.location}` : ""}
                    </span>
                  </div>
                  <ul className="text-[13px] leading-relaxed list-disc list-outside ml-4 space-y-1 marker:text-neutral-400">
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
            <h2 className="text-sm font-bold uppercase tracking-widest border-b pb-1" style={{ color: accent, borderColor: `${accent}40` }}>Projects</h2>
            <div className="space-y-4">
              {data.projects.map((proj: Project, idx: number) => (
                <div key={proj.id || idx}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-bold text-[14px]">{proj.name || "Project Name"}</h3>
                    {proj.url && <span className="text-[12px] text-neutral-500">{proj.url.replace(/^https?:\/\//, "")}</span>}
                  </div>
                  {proj.technologies && <div className="text-[12px] text-neutral-600 italic mb-1.5">{proj.technologies}</div>}
                  {proj.description && <p className="text-[13px] leading-relaxed whitespace-pre-wrap">{proj.description}</p>}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      // In the Minimal Template, Education & Skills are typically side-by-side at the bottom.
      // We will handle them differently below if they are separated out in the ordering.
      // But if rendered sequentially, they look like this:
      case "education":
        return data.education?.length > 0 ? (
          <div key="education" className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest border-b pb-1" style={{ color: accent, borderColor: `${accent}40` }}>Education</h2>
            <div className="space-y-4">
              {data.education.map((edu: Education, idx: number) => (
                <div key={edu.id || idx}>
                  <h3 className="font-bold text-[13px]">{edu.degree || "Degree"}</h3>
                  <div className="text-[13px]">{edu.school || "School"}</div>
                  <div className="text-[12px] text-neutral-500 mt-0.5">
                    {edu.startDate || "Start"} - {edu.endDate || "End"} {edu.gpa ? `| GPA: ${edu.gpa}` : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case "skills":
        return data.skills?.length > 0 ? (
          <div key="skills" className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest border-b pb-1" style={{ color: accent, borderColor: `${accent}40` }}>Skills</h2>
            <div className="text-[13px] leading-relaxed">{data.skills.join(" • ")}</div>
          </div>
        ) : null;

      default:
        return null;
    }
  };

  // The MinimalTemplate has a unique 2-column layout for the LAST TWO items if they are Education & Skills.
  // To preserve drag/drop ordering but still allow the neat 2-col layout, we'll render everything sequentially.
  // But if the user puts Education and Skills at the very end (default minimal behavior), we'll group them.

  const lastTwo = sections.slice(-2);
  const isDefaultEnding = lastTwo.length === 2 && 
                          lastTwo.some(s => s.id === "education") && 
                          lastTwo.some(s => s.id === "skills");

  const topSections = isDefaultEnding ? sections.slice(0, -2) : sections;

  return (
    <div className="w-full h-full bg-white flex flex-col p-16 text-neutral-900" style={{ fontFamily: font }}>
      <div className="w-full text-center border-b pb-8 mb-8" style={{ borderColor: `${accent}40` }}>
        <h1 className="text-4xl font-normal tracking-wide mb-2 uppercase" style={{ color: accent }}>
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <div className="text-sm text-neutral-600 flex flex-wrap justify-center items-center gap-x-3 gap-y-1">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && (
            <span>• {data.personalInfo.linkedin.replace(/^(https?:\/\/)?(www\.)?linkedin\.com\/(in\/)?/, "")}</span>
          )}
          {data.personalInfo.portfolio && (
            <span>• {data.personalInfo.portfolio.replace(/^https?:\/\//, "")}</span>
          )}
        </div>
      </div>

      <div className="flex-1 space-y-8 min-h-0 text-neutral-800">
        {topSections.map((section) => renderSection(section))}
        
        {isDefaultEnding && (
          <div className="grid grid-cols-2 gap-8">
            {lastTwo.map(section => renderSection(section))}
          </div>
        )}
      </div>
    </div>
  );
}
