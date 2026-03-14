"use client";

import { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ChevronLeft, Sparkles, Loader2, Save, Copy, Check, FileSignature, Download } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NewCoverLetter() {
  const searchParams = useSearchParams();
  const [jobDescription, setJobDescription] = useState("");
  const [resumes, setResumes] = useState<any[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<string>("");
  const [isLoadingResumes, setIsLoadingResumes] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Cover_Letter",
  });

  useEffect(() => {
    // Auto-fill from URL params
    const title = searchParams.get("title");
    const company = searchParams.get("company");
    const desc = searchParams.get("description");

    if (title || company || desc) {
      let fullDesc = "";
      if (title) fullDesc += `Role: ${title}\n`;
      if (company) fullDesc += `Company: ${company}\n\n`;
      if (desc) fullDesc += desc;
      setJobDescription(fullDesc);
    }

    // Fetch real resumes
    const fetchResumes = async () => {
      try {
        const res = await fetch("/api/resumes");
        if (res.ok) {
          const data = await res.json();
          setResumes(data);
          if (data.length > 0) {
            setSelectedResumeId(data[0].id);
          }
        }
      } catch (error) {
        console.error("Failed to fetch resumes", error);
        toast.error("Failed to load your resumes");
      } finally {
        setIsLoadingResumes(false);
      }
    };

    fetchResumes();
  }, [searchParams]);

  const handleGenerate = async () => {
    if (!jobDescription.trim() || !selectedResumeId) {
      toast.error("Please provide both a job description and select a resume.");
      return;
    }

    const selectedResume = resumes.find(r => r.id === selectedResumeId);
    if (!selectedResume) return;

    setIsGenerating(true);
    setGeneratedText(""); // Clear previous

    try {
      const response = await fetch("/api/ai/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          resumeData: JSON.parse(selectedResume.content), 
          jobDescription 
        }),
      });

      if (!response.ok) throw new Error("Generation failed");

      const data = await response.json();
      setGeneratedText(data.coverLetter || "Failed to parse cover letter.");
      toast.success("Cover letter generated successfully!");
    } catch (error) {
      console.error(error);
      setGeneratedText("An error occurred while generating your cover letter. Please try again.");
      toast.error("Failed to generate cover letter");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setIsCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <main className="container mx-auto px-6 py-12 max-w-6xl relative z-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
        <div>
          <Link href="/dashboard/cover-letters" className="inline-flex items-center text-sm font-bold text-neutral-400 hover:text-indigo-400 transition-colors mb-4 group">
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> 
            Back to Cover Letters
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-white mb-2 drop-shadow-md">
            Generate <span className="text-indigo-500">Cover Letter</span>
          </h1>
          <p className="text-neutral-300 font-medium">AI-powered tailoring for your next career move.</p>
        </div>
        <Button 
          disabled={!generatedText} 
          onClick={() => handlePrint()}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-12 px-6 rounded-xl transition-all shadow-lg shadow-indigo-500/20 gap-2 hover:scale-[1.02]"
        >
          <Download className="w-5 h-5" />
          Download PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Input */}
          <div className="space-y-6">
            <Card className="border-neutral-800 bg-neutral-900 shadow-sm">
              <CardHeader className="pb-4 border-b border-neutral-800">
                <CardTitle className="text-lg text-white">Select Resume</CardTitle>
                <CardDescription className="text-neutral-400">Choose the resume to base this cover letter on.</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                {isLoadingResumes ? (
                  <div className="flex items-center gap-2 text-neutral-500 py-2">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-500" /> 
                    <span className="text-sm font-medium">Fetching resumes...</span>
                  </div>
                ) : resumes.length > 0 ? (
                  <Select value={selectedResumeId} onValueChange={(v) => v && setSelectedResumeId(v)}>
                    <SelectTrigger className="w-full bg-neutral-950 border-neutral-800 text-white h-12 rounded-xl">
                      <SelectValue placeholder="Select a resume" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                      {resumes.map(resume => (
                        <SelectItem key={resume.id} value={resume.id} className="focus:bg-neutral-800 focus:text-white uppercase text-[10px] font-black tracking-widest">
                          {resume.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="text-sm text-neutral-500 py-2 bg-neutral-950/50 rounded-lg px-4 border border-dashed border-neutral-800">
                    No resumes found. <Link href="/builder/new" className="text-indigo-500 hover:underline">Create one first.</Link>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-neutral-800 bg-neutral-900 shadow-sm overflow-hidden transform-gpu">
              <CardHeader className="pb-4 border-b border-neutral-800">
                <CardTitle className="text-lg text-white">Job Description</CardTitle>
                <CardDescription className="text-neutral-400">Paste the job requirements to tailor the letter.</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 p-0">
                <textarea
                  className="w-full min-h-[300px] p-4 text-sm bg-neutral-950 text-white border-0 border-b border-neutral-800 focus:outline-none focus:ring-0 resize-y placeholder:text-neutral-600 font-medium leading-relaxed"
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </CardContent>
              <CardFooter className="bg-neutral-900/50 py-4 flex justify-end">
                <Button 
                  onClick={handleGenerate} 
                  disabled={!jobDescription.trim() || !selectedResumeId || isGenerating}
                  className="bg-white hover:bg-neutral-100 text-neutral-900 font-black rounded-xl h-11 px-6 shadow-md relative overflow-hidden group border-none"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Crafting...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                      Generate with AI
                    </>
                  )}
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-neutral-300/40 to-transparent transition-transform duration-1000 ease-in-out" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Right Column: Editor */}
          <div className="lg:h-full lg:min-h-[600px] flex flex-col">
            <Card className="border-neutral-800 bg-neutral-900 shadow-sm flex-1 flex flex-col overflow-hidden rounded-2xl">
              <CardHeader className="border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-sm py-4 flex flex-row items-center justify-between sticky top-0 z-10">
                <div>
                  <CardTitle className="text-lg text-white">Editor</CardTitle>
                  <CardDescription className="text-neutral-400">Review and refine your generated letter.</CardDescription>
                </div>
                {generatedText && (
                  <Button variant="outline" size="sm" onClick={handleCopy} className="h-8 transition-all border-neutral-700 hover:bg-neutral-800 text-white bg-neutral-900 font-bold rounded-lg px-4">
                    {isCopied ? (
                      <><Check className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> Copied</>
                    ) : (
                      <><Copy className="w-3.5 h-3.5 mr-1.5" /> Copy Text</>
                    )}
                  </Button>
                )}
              </CardHeader>
              <CardContent className="p-0 flex-1 relative bg-neutral-950">
                {!generatedText && !isGenerating ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500 p-8 text-center bg-neutral-950/50">
                    <div className="w-20 h-20 rounded-full bg-neutral-900 border border-white/[0.05] flex items-center justify-center mb-6">
                      <FileSignature className="w-8 h-8 text-neutral-700" />
                    </div>
                    <p className="font-bold text-white mb-2 tracking-tight text-lg">Your letter will appear here</p>
                    <p className="text-sm text-neutral-500 max-w-[240px]">Click &quot;Generate with AI&quot; to create a perfectly tailored cover letter using your resume data.</p>
                  </div>
                ) : isGenerating ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950/80 backdrop-blur-sm z-10 transition-all">
                    <div className="w-20 h-20 relative flex items-center justify-center">
                      <div className="absolute inset-0 border-4 border-indigo-950 rounded-full" />
                      <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin" />
                      <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
                    </div>
                    <p className="mt-8 text-base font-black text-white tracking-widest uppercase animate-pulse">Designing Perfection</p>
                    <p className="text-xs text-indigo-400/70 mt-2 font-bold">Matching skills with expectations...</p>
                  </div>
                ) : null}
                
                <div ref={printRef} className="w-full h-full p-8 bg-neutral-950 overflow-hidden print:m-0 print:p-10">
                  <textarea
                    className="w-full h-[600px] lg:h-full text-base text-neutral-200 bg-transparent border-none focus:outline-none focus:ring-0 resize-none font-serif leading-relaxed print:text-black print:text-base print:overflow-hidden print:h-auto"
                    value={generatedText}
                    onChange={(e) => setGeneratedText(e.target.value)}
                    placeholder="Your cover letter text..."
                    spellCheck="false"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
      </div>
    </main>
  );
}
