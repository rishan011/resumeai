"use client";

import { useState, useRef } from "react";
import {
  Sparkles, Loader2, CheckCircle2, AlertTriangle, Info, XCircle,
  Upload, FileText, Image as ImageIcon, X, FileCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Mode = "choose" | "builder" | "upload";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AtsScoringDialog({ resumeData }: { resumeData: any }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("choose");
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
    if (!jobDescription.trim()) { setError("Please paste a job description."); return; }
    if (mode === "upload" && !extractedText) { setError("Please upload a resume file first."); return; }

    setIsLoading(true); setError(null); setResult(null);
    try {
      const body = mode === "builder"
        ? { resumeData, jobDescription }
        : { resumeData: { rawText: extractedText }, jobDescription };

      const response = await fetch("/api/ai/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Failed to analyze resume.");
      setResult(await response.json());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = async (file: File) => {
    const allowed = ["application/pdf", "image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) { setError("Unsupported file. Upload a PDF or image (JPG, PNG, WEBP)."); return; }
    if (file.size > 10 * 1024 * 1024) { setError("File too large. Maximum 10MB."); return; }

    setUploadedFile(file); setExtractedText(null); setError(null); setIsExtracting(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/resume/extract", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to extract text.");
      setExtractedText(data.text);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to read file.");
      setUploadedFile(null);
    } finally {
      setIsExtracting(false);
    }
  };

  const resetState = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTimeout(() => {
        setJobDescription(""); setResult(null); setError(null);
        setUploadedFile(null); setExtractedText(null); setMode("choose");
      }, 300);
    }
  };

  const getScoreColor = (s: number) => s >= 80 ? "text-emerald-400" : s >= 60 ? "text-amber-400" : "text-red-400";
  const getScoreBorder = (s: number) => s >= 80 ? "border-emerald-500" : s >= 60 ? "border-amber-400" : "border-red-500";
  const canAnalyze = jobDescription.trim() && (mode === "builder" || (mode === "upload" && extractedText && !isExtracting));

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
            Match your resume against a job description to get an ATS compatibility score and improvement tips.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-950/30 border border-red-900/50 rounded-md flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" /> {error}
          </div>
        )}

        {/* ── Step 1: Choose mode ── */}
        {mode === "choose" && !result && (
          <div className="space-y-4">
            <p className="text-sm text-neutral-400 font-medium">Choose your preferred way to analyze</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Upload Card */}
              <button
                onClick={() => setMode("upload")}
                className="group flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border-2 border-dashed border-neutral-700 hover:border-indigo-500 hover:bg-indigo-500/5 transition-all duration-200 cursor-pointer text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-neutral-800 group-hover:bg-indigo-500/10 flex items-center justify-center transition-colors">
                  <Upload className="w-8 h-8 text-neutral-400 group-hover:text-indigo-400 transition-colors" />
                </div>
                <div>
                  <p className="font-bold text-white text-base">Upload Your Resume</p>
                  <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                    Analyze any existing resume<br/>
                    <span className="text-neutral-600">Supports: PDF, JPG, PNG, WEBP</span>
                  </p>
                </div>
              </button>

              {/* Builder Card */}
              <button
                onClick={() => setMode("builder")}
                className="group flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border-2 border-neutral-700 hover:border-indigo-500 hover:bg-indigo-500/5 transition-all duration-200 cursor-pointer text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-neutral-800 group-hover:bg-indigo-500/10 flex items-center justify-center transition-colors">
                  <FileText className="w-8 h-8 text-neutral-400 group-hover:text-indigo-400 transition-colors" />
                </div>
                <div>
                  <p className="font-bold text-white text-base">Use My Builder Resume</p>
                  <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                    Analyze the resume you&apos;re<br/>
                    <span className="text-neutral-600">currently building here</span>
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2a: Upload mode ── */}
        {mode === "upload" && !result && !isLoading && (
          <div className="space-y-4">
            <button onClick={() => { setMode("choose"); setUploadedFile(null); setExtractedText(null); setError(null); }} className="text-xs text-neutral-500 hover:text-neutral-300 flex items-center gap-1 transition-colors">
              ← Back
            </button>

            {/* File Drop Zone */}
            {!uploadedFile ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); e.dataTransfer.files[0] && handleFileSelect(e.dataTransfer.files[0]); }}
                onClick={() => fileInputRef.current?.click()}
                className={`flex flex-col items-center justify-center gap-4 p-10 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${isDragging ? "border-indigo-500 bg-indigo-500/10" : "border-neutral-700 hover:border-neutral-600 hover:bg-neutral-900/50"}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-neutral-800 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-indigo-400" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-white">Drop your resume here</p>
                  <p className="text-sm text-neutral-500 mt-1">or click to browse</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 rounded-full text-xs text-neutral-400 border border-neutral-700">
                    <FileText className="w-3.5 h-3.5" /> PDF
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 rounded-full text-xs text-neutral-400 border border-neutral-700">
                    <ImageIcon className="w-3.5 h-3.5" /> JPG / PNG / WEBP
                  </span>
                </div>
                <p className="text-xs text-neutral-600">Max file size: 10MB</p>
                <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])} />
              </div>
            ) : (
              /* File Preview */
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  {uploadedFile.type.startsWith("image/") ? <ImageIcon className="w-6 h-6 text-indigo-400" /> : <FileCheck className="w-6 h-6 text-indigo-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{uploadedFile.name}</p>
                  <p className="text-xs mt-0.5">
                    {isExtracting ? (
                      <span className="flex items-center gap-1.5 text-indigo-400"><Loader2 className="w-3 h-3 animate-spin" /> Extracting resume text...</span>
                    ) : extractedText ? (
                      <span className="flex items-center gap-1.5 text-emerald-400"><CheckCircle2 className="w-3 h-3" /> Ready to analyze</span>
                    ) : (
                      <span className="text-neutral-500">{(uploadedFile.size / 1024).toFixed(0)} KB</span>
                    )}
                  </p>
                </div>
                <button onClick={() => { setUploadedFile(null); setExtractedText(null); setError(null); }} className="text-neutral-500 hover:text-neutral-300 transition-colors p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Job Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">Paste Job Description</label>
              <textarea
                className="w-full min-h-[140px] p-3 text-sm border border-neutral-800 bg-neutral-900 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y placeholder:text-neutral-600"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-11" onClick={handleAnalyze} disabled={!canAnalyze}>
              <Sparkles className="w-4 h-4 mr-2" /> Analyze ATS Match
            </Button>
          </div>
        )}

        {/* ── Step 2b: Builder mode ── */}
        {mode === "builder" && !result && !isLoading && (
          <div className="space-y-4">
            <button onClick={() => { setMode("choose"); setError(null); }} className="text-xs text-neutral-500 hover:text-neutral-300 flex items-center gap-1 transition-colors">
              ← Back
            </button>
            <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center gap-3">
              <FileText className="w-5 h-5 text-indigo-400 flex-shrink-0" />
              <p className="text-sm text-indigo-300">Using your current builder resume for analysis</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">Paste Job Description</label>
              <textarea
                className="w-full min-h-[180px] p-3 text-sm border border-neutral-800 bg-neutral-900 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y placeholder:text-neutral-600"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-11" onClick={handleAnalyze} disabled={!canAnalyze}>
              <Sparkles className="w-4 h-4 mr-2" /> Analyze ATS Match
            </Button>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-14 space-y-4">
            <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
            <div className="text-sm text-neutral-500 text-center animate-pulse">
              Analyzing your resume...<br />Checking keywords &amp; ATS requirements.
            </div>
          </div>
        )}

        {/* Results */}
        {result && !isLoading && (
          <div className="space-y-5 animate-in fade-in zoom-in-95 duration-300 py-2">
            <div className={`flex flex-col items-center p-6 bg-neutral-900 rounded-2xl border-2 ${getScoreBorder(result.score)}`}>
              <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">ATS Match Score</div>
              <div className={`text-7xl font-black ${getScoreColor(result.score)}`}>
                {result.score}<span className="text-3xl opacity-70">%</span>
              </div>
              <p className="text-center text-sm text-neutral-400 mt-4 leading-relaxed max-w-md">{result.matchAnalysis}</p>
            </div>

            {result.missingKeywords?.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold flex items-center gap-2 text-white"><XCircle className="w-4 h-4 text-red-400" />Missing Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {result.missingKeywords.map((kw, i) => (
                    <span key={i} className="px-2.5 py-1 bg-red-950/30 text-red-400 border border-red-900/50 rounded-md text-xs font-medium">{kw}</span>
                  ))}
                </div>
              </div>
            )}

            {result.improvements?.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold flex items-center gap-2 text-white"><Info className="w-4 h-4 text-indigo-400" />Actionable Improvements</h4>
                <ul className="space-y-2">
                  {result.improvements.map((imp, i) => (
                    <li key={i} className="flex gap-2 text-[13px] text-neutral-300 bg-neutral-900 p-3 border border-neutral-800 rounded-xl">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />{imp}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button variant="outline" className="w-full border-neutral-700 text-neutral-300 hover:bg-neutral-900" onClick={() => { setResult(null); setMode("choose"); setJobDescription(""); }}>
              Start Over
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
