"use client";

import { useState } from "react";
import { Sparkles, Loader2, CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AtsScoringDialog({ resumeData }: { resumeData: any }) {
  const [open, setOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    matchAnalysis: string;
    missingKeywords: string[];
    improvements: string[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setError("Please paste a job description.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/ai/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData, jobDescription }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze resume.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An error occurred during analysis.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTimeout(() => {
        setJobDescription("");
        setResult(null);
        setError(null);
      }, 300); // clear after animation
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <Dialog open={open} onOpenChange={resetState}>
      <DialogTrigger
        render={
          <Button variant="outline" className="w-full flex items-center justify-center text-indigo-600 hover:bg-indigo-50 border-indigo-200 shadow-sm mb-2 group transition-all" />
        }
      >
        <Sparkles className="w-4 h-4 mr-2 group-hover:animate-pulse" /> 
        Match against Job
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            ATS Resume Analyzer
          </DialogTitle>
          <DialogDescription>
            Paste the job description you are applying for. The AI will analyze your resume and provide a match score along with tailored improvement suggestions.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-950/30 border border-red-900/50 rounded-md flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        {!result && !isLoading && (
          <div className="space-y-4">
            <textarea
              className="w-full min-h-[200px] p-3 text-sm border border-neutral-800 bg-neutral-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y placeholder:text-neutral-500"
              placeholder="Paste the Job Description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            <Button 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
              onClick={handleAnalyze}
              disabled={!jobDescription.trim()}
            >
              Analyze Resume Match
            </Button>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            <div className="text-sm text-neutral-500 text-center animate-pulse">
              Analyzing your resume...<br/>
              Checking keywords & formatting requirements.
            </div>
          </div>
        )}

        {result && !isLoading && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 py-2">
            {/* Score Ring */}
            <div className="flex flex-col items-center justify-center p-6 bg-neutral-900 rounded-xl border border-neutral-800">
               <div className="text-sm font-semibold text-neutral-500 uppercase tracking-widest mb-4">ATS Match Score</div>
               <div className={`text-6xl font-black ${getScoreColor(result.score)}`}>
                 {result.score}%
               </div>
               <p className="text-center text-sm text-neutral-600 mt-4 leading-relaxed max-w-md">
                 {result.matchAnalysis}
               </p>
            </div>

            {/* Missing Keywords */}
            {result.missingKeywords && result.missingKeywords.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold flex items-center gap-2 text-neutral-800">
                  <XCircle className="w-4 h-4 text-red-500" />
                  Missing Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.missingKeywords.map((kw, i) => (
                    <span key={i} className="px-2.5 py-1 bg-red-950/30 text-red-400 border border-red-900/50 rounded-md text-xs font-medium">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Improvements */}
            {result.improvements && result.improvements.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold flex items-center gap-2 text-neutral-800">
                  <Info className="w-4 h-4 text-indigo-500" />
                  Actionable Improvements
                </h4>
                <ul className="space-y-2">
                  {result.improvements.map((imp, i) => (
                    <li key={i} className="flex gap-2 text-[13px] text-neutral-300 bg-neutral-900 p-3 border border-neutral-800 rounded-lg shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {imp}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button variant="outline" className="w-full mt-4" onClick={() => setResult(null)}>
              Revise Job Description / Try Again
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
