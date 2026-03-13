"use client";

import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ChevronLeft, Sparkles, Loader2, Save, Copy, Check, FileSignature, Download } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock resume data to feed to the AI
const mockResumeData = {
  personalInfo: {
    fullName: "Jane Smith",
    jobTitle: "Senior Product Designer",
    email: "jane.smith@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA"
  },
  summary: "Results-driven designer with over 8 years of experience building stunning digital experiences.",
  experience: [
    {
      jobTitle: "Senior Product Designer",
      company: "TechCorp Inc.",
      description: "Led the redesign of the core SaaS platform, increasing user retention by 22% within Q1."
    }
  ],
  skills: ["UI/UX Design", "Figma", "User Research"]
};

export default function NewCoverLetter() {
  const [jobDescription, setJobDescription] = useState("");
  const [selectedResumeId, setSelectedResumeId] = useState("1");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Cover_Letter",
  });

  const handleGenerate = async () => {
    if (!jobDescription.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch("/api/ai/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Passing mock data since database integration is not complete
        body: JSON.stringify({ resumeData: mockResumeData, jobDescription }),
      });

      if (!response.ok) throw new Error("Generation failed");

      const data = await response.json();
      setGeneratedText(data.coverLetter || "Failed to parse cover letter.");
    } catch (error) {
      console.error(error);
      setGeneratedText("An error occurred while generating your cover letter. Please check your API keys or try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setIsCopied(true);
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
                <CardTitle className="text-lg text-white">Select Resume Form</CardTitle>
                <CardDescription className="text-neutral-400">Choose the resume to base this cover letter on.</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <Select value={selectedResumeId} onValueChange={(v) => v && setSelectedResumeId(v)}>
                  <SelectTrigger className="w-full bg-neutral-950 border-neutral-800 text-white">
                    <SelectValue placeholder="Select a resume" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                    <SelectItem value="1">Frontend Developer Resume</SelectItem>
                    <SelectItem value="2" className="focus:bg-neutral-800 focus:text-white">Product Manager Draft</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="border-neutral-800 bg-neutral-900 shadow-sm overflow-hidden transform-gpu">
              <CardHeader className="pb-4 border-b border-neutral-800">
                <CardTitle className="text-lg text-white">Job Description</CardTitle>
                <CardDescription className="text-neutral-400">Paste the job requirements to tailor the letter.</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 p-0">
                <textarea
                  className="w-full min-h-[300px] p-4 text-sm bg-neutral-950 text-white border-0 border-b border-neutral-800 focus:outline-none focus:ring-0 resize-y placeholder:text-neutral-600"
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </CardContent>
              <CardFooter className="bg-neutral-900/50 py-4 flex justify-end">
                <Button 
                  onClick={handleGenerate} 
                  disabled={!jobDescription.trim() || isGenerating}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md relative overflow-hidden group border-none"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                      Generate with AI
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Right Column: Editor */}
          <div className="lg:h-full lg:min-h-[600px] flex flex-col">
            <Card className="border-neutral-800 bg-neutral-900 shadow-sm flex-1 flex flex-col overflow-hidden">
              <CardHeader className="border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-sm py-4 flex flex-row items-center justify-between sticky top-0 z-10">
                <div>
                  <CardTitle className="text-lg text-white">Editor</CardTitle>
                  <CardDescription className="text-neutral-400">Review and refine your generated letter.</CardDescription>
                </div>
                {generatedText && (
                  <Button variant="outline" size="sm" onClick={handleCopy} className="h-8 transition-all border-neutral-700 hover:bg-neutral-800 text-white bg-neutral-900">
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
                    <FileSignature className="w-12 h-12 mb-4 text-neutral-700" />
                    <p className="font-medium text-neutral-300 mb-1">Your letter will appear here</p>
                    <p className="text-sm">Click &quot;Generate with AI&quot; to create a tailored cover letter.</p>
                  </div>
                ) : isGenerating ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950/80 backdrop-blur-sm z-10 transition-all">
                    <div className="w-16 h-16 relative flex items-center justify-center">
                      <div className="absolute inset-0 border-4 border-indigo-900 rounded-full" />
                      <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin" />
                      <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
                    </div>
                    <p className="mt-6 text-sm font-medium text-indigo-300 animate-pulse">Drafting your perfect letter...</p>
                    <p className="text-xs text-indigo-400/70 mt-1">Analyzing job requirements</p>
                  </div>
                ) : null}
                
                <div ref={printRef} className="w-full h-full p-6 bg-neutral-950 overflow-hidden print:m-0 print:p-10">
                  <textarea
                    className="w-full h-[600px] lg:h-full text-sm text-neutral-200 bg-transparent border-none focus:outline-none focus:ring-0 resize-none font-serif leading-loose print:text-black print:text-base print:overflow-hidden print:h-auto"
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
