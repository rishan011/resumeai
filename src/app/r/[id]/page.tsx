import { notFound } from "next/navigation";
import { ThemeConfig, SectionItem } from "@/components/forms/ThemeCustomizer";

// In a real application, you would fetch this data from your database using `params.id`
// For the mock MVP, we will demonstrate the capability with static realistic data.

const DEFAULT_SECTION_ORDER = [
  { id: "summary",    label: "Summary",    visible: true },
  { id: "experience", label: "Experience", visible: true },
  { id: "education",  label: "Education",  visible: true },
  { id: "projects",   label: "Projects",   visible: true },
  { id: "skills",     label: "Skills",     visible: true },
];

const mockSharedResume = {
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
    sectionOrder: [...DEFAULT_SECTION_ORDER],
  } as ThemeConfig,
  template: "modern" as const
};

export default async function SharedResumePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // In a real application, you would fetch this data from your database using `id`
  // For the mock MVP, we will demonstrate the capability with static realistic data.
  // const resume = await prisma.resume.findUnique({
  //   where: { id },
  // });

  // If the ID doesn't match our mock, return a 404
  if (id !== "jane-smith-123") { // Assuming the instruction meant to update this line to use the new 'id' variable
    notFound();
  }

  // Determine which template component to render based on saved preferences
  // We're doing a simple dynamic import to keep the client cleanly separated
  // from the builder logic
  
  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col items-center py-12 px-4 selection:bg-indigo-100/50">
       <div className="w-full max-w-[210mm] min-h-[297mm] bg-white shadow-2xl origin-top sm:scale-[0.85] xl:scale-100 transition-transform flex flex-col border border-neutral-200">
         {/* Render the ModernTemplate for the MVP Shared Link Demonstration */}
         <div className="p-8 h-full flex flex-col" style={{ fontFamily: mockSharedResume.themeConfig.fontFamily }}>
            {/* Template Header */}
            <header className="mb-6 pb-6 border-b-2 border-neutral-100">
                <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 mb-1" style={{ color: mockSharedResume.themeConfig.accentColor }}>
                    {mockSharedResume.personalInfo.fullName}
                </h1>
                <h2 className="text-xl text-neutral-500 font-medium mb-4">
                    {mockSharedResume.personalInfo.jobTitle}
                </h2>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-neutral-600">
                    {mockSharedResume.personalInfo.email && <span>{mockSharedResume.personalInfo.email}</span>}
                    {mockSharedResume.personalInfo.phone && <span>• {mockSharedResume.personalInfo.phone}</span>}
                    {mockSharedResume.personalInfo.location && <span>• {mockSharedResume.personalInfo.location}</span>}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm mt-2 font-medium" style={{ color: mockSharedResume.themeConfig.accentColor }}>
                    {mockSharedResume.personalInfo.linkedin && <a href={`https://${mockSharedResume.personalInfo.linkedin}`}>{mockSharedResume.personalInfo.linkedin}</a>}
                    {mockSharedResume.personalInfo.portfolio && <a href={`https://${mockSharedResume.personalInfo.portfolio}`}>• {mockSharedResume.personalInfo.portfolio}</a>}
                </div>
            </header>

            {/* Template Body */}
            <div className="flex-1 space-y-6">
                {mockSharedResume.themeConfig.sectionOrder.map((sectionId) => {
                    switch (sectionId as SectionItem) {
                        case 'summary' as unknown as SectionItem:
                            if (!mockSharedResume.summary) return null;
                            return (
                                <section key="summary">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-3" style={{ color: mockSharedResume.themeConfig.accentColor }}>
                                        Professional Summary
                                    </h3>
                                    <p className="text-sm text-neutral-700 leading-relaxed">
                                        {mockSharedResume.summary}
                                    </p>
                                </section>
                            );
                        case 'experience' as unknown as SectionItem:
                            if (!mockSharedResume.experience.length) return null;
                            return (
                                <section key="experience">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-4" style={{ color: mockSharedResume.themeConfig.accentColor }}>
                                        Experience
                                    </h3>
                                    <div className="space-y-5">
                                        {mockSharedResume.experience.map((exp) => (
                                            <div key={exp.id}>
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <h4 className="font-bold text-neutral-900">{exp.jobTitle}</h4>
                                                    <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                                                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-neutral-600 font-medium mb-2">
                                                    {exp.company} {exp.location && <span>• {exp.location}</span>}
                                                </div>
                                                <ul className="list-disc list-outside ml-4 space-y-1.5 text-sm text-neutral-700 marker:text-neutral-300">
                                                    {exp.description.split('\\n').map((bullet, idx) => (
                                                        <li key={idx} className="pl-1 relative leading-relaxed">{bullet}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            );
                         // Note: We omit standard sections for brevity in this MVP shared layout
                         default: return null;
                    }
                })}
            </div>
         </div>
       </div>
       
       {/* Shareable Link Branding Footer */}
       <div className="mt-8 text-center text-sm text-neutral-500 font-medium">
         Powered by <span className="text-indigo-600 font-bold">NeeDee</span>
       </div>
    </div>
  );
}
