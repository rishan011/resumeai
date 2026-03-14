import React from 'react';
import { Brain, Clock, Zap, Target, Sparkles, BookOpen } from "lucide-react";

interface SummaryReportProps {
  result: {
    summary: string;
    keyPoints: string[];
    chapters?: { time: string; label: string; info: string }[];
    quotes?: string[];
    actionableTakeaways?: string[];
    complexityScore?: string;
    readingTime?: string;
    metadata?: {
      title: string;
      author: string;
      thumbnail: string;
      duration: string;
    };
  };
  langName: string;
}

export const SummaryReport = React.forwardRef<HTMLDivElement, SummaryReportProps>(({ result, langName }, ref) => {
  return (
    <div ref={ref} className="p-16 bg-white text-black font-sans max-w-[900px] mx-auto print:p-8">
      {/* Branding Header */}
      <div className="border-b-4 border-red-600 pb-8 mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic mb-2">
            NeeDee <span className="text-red-600">Insights</span>
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">
            Intelligence Report • Orion V31 Protocol • {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Language: {langName}</p>
        </div>
      </div>

      {/* Video Hero */}
      <div className="mb-12 flex gap-8 items-start">
        <div className="flex-1">
          <h2 className="text-3xl font-black leading-tight mb-4 uppercase">{result.metadata?.title}</h2>
          <p className="text-lg font-bold text-neutral-600 uppercase tracking-widest mb-6">{result.metadata?.author}</p>
          
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100">
              <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400 block mb-1">Duration</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-600" />
                <span className="font-bold">{result.metadata?.duration}</span>
              </div>
            </div>
            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100">
              <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400 block mb-1">Complexity</span>
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-red-600" />
                <span className="font-bold">{result.complexityScore || "Intermediate"}</span>
              </div>
            </div>
            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100">
              <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400 block mb-1">Reading Time</span>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-red-600" />
                <span className="font-bold">{result.readingTime || "5 min"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <section className="mb-12">
        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-neutral-400 mb-6 flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-red-600" /> Executive Synthesis
        </h3>
        <p className="text-xl leading-relaxed font-medium text-neutral-800 italic border-l-4 border-red-100 pl-8">
          {result.summary}
        </p>
      </section>

      {/* Grid: Key Points & Actionable Takeaways */}
      <div className="grid grid-cols-2 gap-12 mb-12">
        <section>
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-neutral-400 mb-6 flex items-center gap-3">
            <Zap className="w-4 h-4 text-red-600" /> Key Insights
          </h3>
          <ul className="space-y-4">
            {result.keyPoints.map((point, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="w-2 h-2 rounded-full bg-red-600 mt-2 shrink-0" />
                <p className="font-bold text-neutral-700">{point}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-neutral-400 mb-6 flex items-center gap-3">
            <Target className="w-4 h-4 text-red-600" /> Actionable Advice
          </h3>
          <div className="space-y-4">
            {(result.actionableTakeaways || []).map((takeaway, i) => (
              <div key={i} className="bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                <p className="text-sm font-black text-neutral-800">{takeaway}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Segmentation Timeline */}
      {result.chapters && result.chapters.length > 0 && (
        <section className="mb-12 page-break-before">
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-neutral-400 mb-8 flex items-center gap-3">
            <Clock className="w-4 h-4 text-red-600" /> Specific Part Segmentation
          </h3>
          <div className="space-y-6">
            {result.chapters.map((chapter, i) => (
              <div key={i} className="flex gap-8">
                <div className="shrink-0 w-20 text-right">
                  <span className="text-xs font-black text-red-600">{chapter.time}</span>
                </div>
                <div className="flex-1 pb-6 border-b border-neutral-100 last:border-0">
                  <h4 className="font-black uppercase tracking-tighter mb-1">{chapter.label}</h4>
                  <p className="text-xs text-neutral-500 font-bold leading-relaxed">{chapter.info}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quotes */}
      {result.quotes && result.quotes.length > 0 && (
        <section>
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-neutral-400 mb-8 flex items-center gap-3">
             Verbatim Highlights
          </h3>
          <div className="grid grid-cols-1 gap-6">
            {result.quotes.map((quote, i) => (
              <div key={i} className="relative pl-12">
                <span className="absolute left-0 top-0 text-5xl text-red-100 font-serif leading-none">“</span>
                <p className="text-lg font-medium text-neutral-700 italic border-b border-neutral-50 pb-4">{quote}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-neutral-100 text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-neutral-300">
          Generated via NeeDee Insights • Confidential Intelligence Report
        </p>
      </div>
    </div>
  );
});

SummaryReport.displayName = 'SummaryReport';
