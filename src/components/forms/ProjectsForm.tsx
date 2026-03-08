import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  technologies: string;
}

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export function ProjectsForm({ data, onChange }: ProjectsFormProps) {
  const [generatingId, setGeneratingId] = useState<string | null>(null);

  const handleUpdate = (id: string, field: keyof Project, value: string) => {
    onChange(data.map(proj => proj.id === id ? { ...proj, [field]: value } : proj));
  };

  const handleAdd = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      url: "",
      technologies: ""
    };
    onChange([...data, newProject]);
  };

  const handleRemove = (id: string) => {
    onChange(data.filter(proj => proj.id !== id));
  };

  const handleAIOptimize = async (proj: Project) => {
    if (!proj.description) return;
    
    setGeneratingId(proj.id);
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: proj.description,
          context: `Project description for: ${proj.name}. Tech used: ${proj.technologies}`
        }),
      });
      
      const result = await response.json();
      if (result.content) {
        handleUpdate(proj.id, "description", result.content);
      }
    } catch (error) {
      console.error("Failed to generate description:", error);
    } finally {
      setGeneratingId(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
      <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-sm text-indigo-400">
         Projects are a great way to show practical application of your skills. Add 2-3 significant projects relevant to your target role.
      </div>
      
      {data.map((proj, index) => (
        <div key={proj.id} className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl relative group shadow-sm">
          {/* Delete Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500 hover:bg-red-50"
            onClick={() => handleRemove(proj.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-sm font-semibold text-neutral-500">
               {index + 1}
            </div>
            <h3 className="font-semibold text-lg text-white">{proj.name || "New Project"}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div className="space-y-2">
              <Label>Project Name</Label>
              <Input 
                placeholder="E-commerce Analytics Dashboard" 
                value={proj.name}
                onChange={(e) => handleUpdate(proj.id, "name", e.target.value)}
                className="bg-neutral-900 border-neutral-800 text-white focus-visible:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label>Project URL (Optional)</Label>
              <Input 
                placeholder="https://github.com/..." 
                value={proj.url}
                onChange={(e) => handleUpdate(proj.id, "url", e.target.value)}
                className="bg-neutral-900 border-neutral-800 text-white focus-visible:ring-indigo-500"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Technologies Used</Label>
              <Input 
                placeholder="React, Node.js, PostgreSQL, Tailwind..." 
                value={proj.technologies}
                onChange={(e) => handleUpdate(proj.id, "technologies", e.target.value)}
                className="bg-neutral-900 border-neutral-800 text-white focus-visible:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-3">
             <div className="flex items-center justify-between">
                <Label>Description</Label>
                <Button 
                   variant="ghost" 
                   size="sm"
                   onClick={() => handleAIOptimize(proj)}
                   disabled={generatingId === proj.id || !proj.description}
                   className="h-8 text-xs font-medium text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 px-2"
                >
                   {generatingId === proj.id ? (
                     <><Loader2 className="w-3 h-3 animate-spin mr-1.5" /> Optimizing...</>
                   ) : (
                     <><Sparkles className="w-3 h-3 mr-1.5" /> Fix with AI</>
                   )}
                </Button>
             </div>
             
             <textarea 
               placeholder="What did this project solve? What was your contribution? Try detailing it briefly and use AI to make it professional." 
               value={proj.description}
               onChange={(e) => handleUpdate(proj.id, "description", e.target.value)}
               className="w-full min-h-[120px] p-3 rounded-md border border-neutral-800 bg-neutral-900 text-white text-sm shadow-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 resize-y"
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
           <Plus className="w-5 h-5 group-hover:scale-125 transition-transform" /> Add Another Project
        </span>
      </Button>
    </div>
  );
}
