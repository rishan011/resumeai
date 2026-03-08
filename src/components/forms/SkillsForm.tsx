import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, Plus, Sparkles } from "lucide-react";

interface SkillsFormProps {
  data: string[];
  onChange: (data: string[]) => void;
  jobTitle?: string;
}

export function SkillsForm({ data, onChange, jobTitle }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAdd = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
    }
    setNewSkill("");
  };

  const handleRemove = (skillToRemove: string) => {
    onChange(data.filter(skill => skill !== skillToRemove));
  };

  const handleAIGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: `Suggest 10 highly relevant skills (both hard and soft) for a ${jobTitle || 'professional'}. Return ONLY a comma-separated list of skills, nothing else.`,
          context: "Skills Section generation"
        }),
      });
      
      const result = await response.json();
      if (result.content) {
        // Parse CSV and filter out existing skills
        const suggestedSkills = result.content
          .split(",")
          .map((s: string) => s.trim())
          .filter((s: string) => s.length > 0 && !data.includes(s));
          
        if (suggestedSkills.length > 0) {
          onChange([...data, ...suggestedSkills]);
        }
      }
    } catch (error) {
      console.error("Failed to generate skills:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4 rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-6">
         <div className="flex items-center justify-between">
           <div className="flex items-center gap-2 text-indigo-400 font-medium">
             <Sparkles className="w-4 h-4" /> Auto-Suggest Skills
           </div>
           <Button 
             variant="outline"
             size="sm"
             onClick={handleAIGenerate} 
             disabled={isGenerating}
             className="text-xs bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/20"
           >
             {isGenerating ? "Generating..." : "Generate with AI"}
           </Button>
         </div>
         <p className="text-xs text-indigo-400/70">
           Stuck? We can automatically suggest relevant skills based on your target job title ({jobTitle || 'Not set'}).
         </p>
      </div>

      <div className="space-y-4">
        <Label>Add a Skill</Label>
        <form onSubmit={handleAdd} className="flex gap-2">
          <Input 
            placeholder="E.g. React.js, Project Management, User Research..." 
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="flex-1 bg-neutral-900 border-neutral-800 text-white focus-visible:ring-indigo-500"
          />
          <Button type="submit" disabled={!newSkill.trim()}>
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </form>
      </div>

      <div className="pt-4">
         <Label className="mb-3 block">Your Skills ({data.length})</Label>
         <div className="flex flex-wrap gap-2">
           {data.length === 0 && (
             <div className="text-sm text-neutral-500 italic py-4 w-full text-center border-2 border-dashed border-neutral-700 rounded-lg">
                No skills added yet. Type above or use AI to generate some!
              </div>
           )}
           {data.map((skill, index) => (
             <div 
               key={index}
               className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-full text-sm font-medium text-neutral-300 group hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-colors shadow-sm"
             >
               {skill}
               <button 
                 onClick={() => handleRemove(skill)}
                 className="text-neutral-400 group-hover:text-indigo-500 hover:bg-indigo-100 rounded-full p-0.5 transition-colors"
               >
                 <X className="w-3.5 h-3.5" />
               </button>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
}
