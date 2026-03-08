import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sparkles, Trash2, Plus, Loader2 } from "lucide-react";

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
  personalTitle?: string;
}

export function ExperienceForm({ data, onChange, personalTitle }: ExperienceFormProps) {
  const [generatingId, setGeneratingId] = useState<string | null>(null);

  const handleUpdate = (id: string, field: keyof Experience, value: string | boolean) => {
    onChange(data.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  const handleAdd = () => {
    const newExp: Experience = {
      id: crypto.randomUUID(),
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    };
    onChange([...data, newExp]);
  };

  const handleRemove = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  const handleAIOptimize = async (exp: Experience) => {
    if (!exp.description) return;
    
    setGeneratingId(exp.id);
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: exp.description,
          context: `Work Experience: ${exp.jobTitle} at ${exp.company}. Overall Profile: ${personalTitle || 'Professional'}`
        }),
      });
      
      const result = await response.json();
      if (result.content) {
        handleUpdate(exp.id, "description", result.content);
      }
    } catch (error) {
      console.error("Failed to generate description:", error);
    } finally {
      setGeneratingId(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
      {data.map((exp, index) => (
        <div key={exp.id} className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl relative group shadow-sm">
          {/* Delete Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500 hover:bg-red-50"
            onClick={() => handleRemove(exp.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-sm font-semibold text-neutral-500">
               {index + 1}
            </div>
            <h3 className="font-semibold text-lg text-white">{exp.jobTitle || "New Experience"}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div className="space-y-2">
              <Label>Job Title</Label>
              <Input 
                placeholder="Senior Product Designer" 
                value={exp.jobTitle}
                onChange={(e) => handleUpdate(exp.id, "jobTitle", e.target.value)}
                  className="bg-neutral-900 border-neutral-800 text-white focus-visible:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label>Company</Label>
              <Input 
                placeholder="TechCorp Inc." 
                value={exp.company}
                onChange={(e) => handleUpdate(exp.id, "company", e.target.value)}
                  className="bg-neutral-900 border-neutral-800 text-white focus-visible:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input 
                placeholder="San Francisco, CA" 
                value={exp.location}
                onChange={(e) => handleUpdate(exp.id, "location", e.target.value)}
                  className="bg-neutral-900 border-neutral-800 text-white focus-visible:ring-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input 
                  placeholder="Jan 2021" 
                  value={exp.startDate}
                  onChange={(e) => handleUpdate(exp.id, "startDate", e.target.value)}
                    className="bg-neutral-900 border-neutral-800 text-white focus-visible:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                {exp.current ? (
                  <div className="flex h-9 w-full items-center rounded-md border border-neutral-700 bg-neutral-800 px-3 text-sm text-neutral-400 italic cursor-not-allowed">
                    Present
                  </div>
                ) : (
                  <Input
                    placeholder="Dec 2023"
                    value={exp.endDate}
                    onChange={(e) => handleUpdate(exp.id, "endDate", e.target.value)}
                    className="bg-neutral-900 border-neutral-800 text-white focus-visible:ring-indigo-500"
                  />
                )}
              </div>
            </div>
            
            {/* Current toggle hack for MVP */}
            <div className="md:col-span-2 flex items-center gap-2">
              <input 
                type="checkbox" 
                id={`current-${exp.id}`}
                checked={exp.current}
                onChange={(e) => handleUpdate(exp.id, "current", e.target.checked)}
                className="rounded border-neutral-300 text-indigo-600 focus:ring-indigo-600 w-4 h-4 cursor-pointer"
              />
              <Label htmlFor={`current-${exp.id}`} className="cursor-pointer text-sm font-medium text-neutral-600">
                 I currently work here
              </Label>
            </div>
          </div>

          <div className="space-y-3">
             <div className="flex items-center justify-between">
                <Label>Description & Achievements</Label>
                <Button 
                   variant="ghost" 
                   size="sm"
                   onClick={() => handleAIOptimize(exp)}
                   disabled={generatingId === exp.id || !exp.description}
                   className="h-8 text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-2"
                >
                   {generatingId === exp.id ? (
                     <><Loader2 className="w-3 h-3 animate-spin mr-1.5" /> Optimizing...</>
                   ) : (
                     <><Sparkles className="w-3 h-3 mr-1.5" /> Fix with AI</>
                   )}
                </Button>
             </div>
             
             <textarea 
               placeholder="Briefly describe what you did. E.g: Built web app, managed 5 people... Use the 'Fix with AI' button to automatically expand this into professional bullet points!" 
               value={exp.description}
               onChange={(e) => handleUpdate(exp.id, "description", e.target.value)}
               className="w-full min-h-[160px] p-3 rounded-md border border-neutral-800 bg-neutral-900 text-white text-sm shadow-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 resize-y"
             />
          </div>
        </div>
      ))}

      <Button 
        variant="outline" 
        onClick={handleAdd}
        className="w-full border-dashed border-2 border-neutral-800 py-8 text-neutral-400 hover:bg-neutral-900 hover:text-indigo-400 hover:border-indigo-500/50 group transition-all bg-transparent"
      >
        <span className="flex items-center gap-2 font-medium">
           <Plus className="w-5 h-5 group-hover:scale-125 transition-transform" /> Add Another Experience
        </span>
      </Button>
    </div>
  );
}
