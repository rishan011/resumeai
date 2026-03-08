import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";

interface SummaryProps {
  data: string;
  onChange: (value: string) => void;
  personalInfo?: { jobTitle?: string }; // To pass context to AI
}

export function ProfessionalSummary({ data, onChange, personalInfo }: SummaryProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handleAIGenerate = async () => {
    if (!prompt) return;
    
    setIsGenerating(true);
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: `Generate a short professional summary for a ${personalInfo?.jobTitle || "professional"}. Focus on: ${prompt}`,
          context: "Professional Summary Section"
        }),
      });
      
      const result = await response.json();
      if (result.content) {
        onChange(result.content);
        setPrompt(""); // Clear prompt after success
      }
    } catch (error) {
      console.error("Failed to generate summary:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4 rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-6">
        <div className="flex items-center gap-2 text-indigo-400 font-medium mb-2">
           <Sparkles className="w-4 h-4" /> AI Summary Assistant
        </div>
        <div className="flex gap-3">
          <input 
            type="text"
            className="flex-1 rounded-md border border-neutral-700 bg-neutral-900 text-white px-3 py-2 text-sm shadow-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500"
            placeholder="E.g. 5+ years building React apps, focused on performance"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAIGenerate()}
          />
          <Button 
            onClick={handleAIGenerate} 
            disabled={isGenerating || !prompt}
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Generate"}
          </Button>
        </div>
        <p className="text-xs text-indigo-400/70">
          Tell the AI your key strengths or let it know what kind of role you&apos;re targeting.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Your Professional Summary</Label>
        <textarea 
          id="summary" 
          placeholder="I am a highly motivated professional..." 
          value={data}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-h-[250px] p-4 rounded-md border border-neutral-800 bg-neutral-900 text-white text-sm shadow-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 resize-y"
        />
        <div className="text-right text-xs text-neutral-400">
           {data.length} characters
        </div>
      </div>
    </div>
  );
}
