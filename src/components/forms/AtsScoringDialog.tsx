"use client";

import { useState, useRef } from "react";
import { Sparkles, Loader2, CheckCircle2, AlertTriangle, Info, XCircle, Upload, FileText, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Tab = "builder" | "upload";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AtsScoringDialog({ resumeData }: { resumeData: any }) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("builder");
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    matchAnalysis: string;
    missingKeywords: string[];
    improvements: string[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setError("Please paste a job description.");
      return;
    }
    if (activeTab === "upload" && !extractedText) {
      setError("Please upload a resume file first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const body = activeTab === "builder"
        ? { resumeData, jobDescription }
        : { resumeData: { rawText: extractedText }, jobDescription };

      const response = await fetch("/api/ai/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Failed to analyze resume.");
      const data = await response.json();
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred during analysis.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = async (file: File) => {
    const allowed = ["application/pdf", "image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      setError("Unsupported file type. Please upload a PDF or image (JPG, PNG, WEBP).");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File is too large. Maximum size is 10MB.");
      return;
    }

    setUploadedFile(file);
    setExtractedText(null);
    setError(null);
    setIsExtracting(true);

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/resume/extract", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to extract text from file.");
      setExtractedText(data.text);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to read the file.");
      setUploadedFile(null);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const resetState = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTimeout(() => {
        setJobDescription("");
        setResult(null);
        setError(null);
        setUploadedFile(null);
        setExtractedText(null);
        setActiveTab("builder");
      }, 300);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-amber-400";
    return "text-red-400";
  };

  const getScoreRingColor = (score: number) => {
    if (score >= 80) return "border-emerald-500";
    if (score >= 60) return "border-amber-400";
    return "border-red-500";
  };

  const canAnalyze = jobDescription.trim() && (activeTab === "builder" || (activeTab === "upload" && extractedText && !isExtracting));

  return (
    <Dialog open={open} onOpenChange={resetState}>
      <DialogTrigger
        render={
          <Button variant="outline" className="w-full flex items-center justify-center text-indigo-400 hover:bg-indigo-500/10 border-indigo-500/30 shadow-sm mb-2 group transition-all" />
        }
      >
        <Sparkles className="w-4 h-4 mr-2 group-hover:animate-pulse" />
        Match against Job
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-neutral-950 border border-neutral-800 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-white">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            ATS Resume Analyzer
          </DialogTitle>
          <DialogDescription className="text-neutral-400">
            Analyze your resume against a job description to get an ATS compatibility score.
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
            {/* Tab Switcher */}
            <div className="flex gap-1 p-1 bg-neutral-900 rounded-lg border border-neutral-800">
              <button
                onClick={() => { setActiveTab("builder"); setError(null); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  activeTab === "builder"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                }`}
              >
                <FileText className="w-4 h-4" />
                My Resume
              </button>
              <button
                onClick={() => { setActiveTab("upload"); setError(null); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  activeTab === "upload"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                }`}
              >
                <Upload className="w-4 h-4" />
                Upload Resume
              </button>
            </div>

            {/* Upload Tab Content */}
            {activeTab === "upload" && (
              <div className="space-y-3">
                {!uploadedFile ? (
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                      isDragging
                        ? "border-indigo-500 bg-indigo-500/10"
                        : "border-neutral-700 hover:border-neutral-600 hover:bg-neutral-900"
                    }`}
                  >
                    <div className="w-14 h-14 rounded-full bg-neutral-800 flex items-center justify-center">
                      <Upload className="w-7 h-7 text-neutral-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-white">Drop your resume here</p>
                      <p className="text-xs text-neutral-500 mt-1">PDF, JPG, PNG or WEBP · Max 10MB</p>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 rounded-full text-xs text-neutral-400">
                        <FileText className="w-3.5 h-3.5" /> PDF
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 rounded-full text-xs text-neutral-400">
                        <ImageIcon className="w-3.5 h-3.5" /> Photo / Image
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.webp"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                    />
                  </div>
                ) : (
                  <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                      {uploadedFile.type.startsWith("image/") ? (
                        <ImageIcon className="w-5 h-5 text-indigo-400" />
                      ) : (
                        <FileText className="w-5 h-5 text-indigo-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{uploadedFile.name}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {isExtracting ? (
                          <span className="flex items-center gap-1.5 text-indigo-400">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Extracting text...
                          </span>
                        ) : extractedText ? (
                          <span className="flex items-center gap-1.5 text-emerald-400">
                            <CheckCircle2 className="w-3 h-3" />
                            Text extracted successfully ({Math.round(extractedText.length / 100) / 10}k chars)
                          </span>
                        ) : (
                          `${(uploadedFile.size / 1024).toFixed(0)} KB`
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => { setUploadedFile(null); setExtractedText(null); setError(null); }}
                      className="text-neutral-500 hover:text-neutral-300 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Job Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">Job Description</label>
              <textarea
                className="w-full min-h-[160px] p-3 text-sm border border-neutral-800 bg-neutral-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y placeholder:text-neutral-500"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={handleAnalyze}
              disabled={!canAnalyze}
            >
              {isExtracting ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Extracting Resume...</>
              ) : (
                <><Sparkles className="w-4 h-4 mr-2" /> Analyze ATS Match</>
              )}
            </Button>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
            <div className="text-sm text-neutral-500 text-center animate-pulse">
              Analyzing your resume...<br/>
              Checking keywords &amp; formatting requirements.
            </div>
          </div>
        )}

        {result && !isLoading && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 py-2">
            {/* Score */}
            <div className={`flex flex-col items-center justify-center p-6 bg-neutral-900 rounded-xl border-2 ${getScoreRingColor(result.score)}`}>
              <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">ATS Match Score</div>
              <div className={`text-7xl font-black ${getScoreColor(result.score)}`}>
                {result.score}<span className="text-3xl">%</span>
              </div>
              <p className="text-center text-sm text-neutral-400 mt-4 leading-relaxed max-w-md">
                {result.matchAnalysis}
              </p>
            </div>

            {/* Missing Keywords */}
            {result.missingKeywords?.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold flex items-center gap-2 text-white">
                  <XCircle className="w-4 h-4 text-red-400" />
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
            {result.improvements?.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold flex items-center gap-2 text-white">
                  <Info className="w-4 h-4 text-indigo-400" />
                  Actionable Improvements
                </h4>
                <ul className="space-y-2">
                  {result.improvements.map((imp, i) => (
                    <li key={i} className="flex gap-2 text-[13px] text-neutral-300 bg-neutral-900 p-3 border border-neutral-800 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {imp}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button variant="outline" className="w-full mt-4 border-neutral-700 text-neutral-300 hover:bg-neutral-900" onClick={() => setResult(null)}>
              Try Another / Revise
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
