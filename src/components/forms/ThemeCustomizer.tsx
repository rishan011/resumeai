"use client";

import { useState, useCallback } from "react";
import { GripVertical, Check, Palette, Type, ArrowUpDown, Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// ─── Theme Config Types ───
export interface ThemeConfig {
  accentColor: string;
  fontFamily: string;
  sectionOrder: SectionItem[];
}

export interface SectionItem {
  id: string;
  label: string;
  visible: boolean;
}

// ─── Presets ───
const COLOR_PRESETS = [
  { name: "Indigo",   value: "#4F46E5", bg: "bg-indigo-600" },
  { name: "Emerald",  value: "#059669", bg: "bg-emerald-600" },
  { name: "Rose",     value: "#E11D48", bg: "bg-rose-600" },
  { name: "Amber",    value: "#D97706", bg: "bg-amber-600" },
  { name: "Sky",      value: "#0284C7", bg: "bg-sky-600" },
  { name: "Violet",   value: "#7C3AED", bg: "bg-violet-600" },
  { name: "Slate",    value: "#475569", bg: "bg-slate-600" },
  { name: "Fuchsia",  value: "#C026D3", bg: "bg-fuchsia-600" },
];

const FONT_OPTIONS = [
  { label: "Inter (Sans)",      value: "Inter, sans-serif" },
  { label: "Georgia (Serif)",   value: "Georgia, serif" },
  { label: "Merriweather",      value: "'Merriweather', serif" },
  { label: "Roboto Mono",       value: "'Roboto Mono', monospace" },
  { label: "Playfair Display",  value: "'Playfair Display', serif" },
  { label: "System Default",    value: "system-ui, sans-serif" },
];

// ─── Default Section Order ───
export const DEFAULT_SECTIONS: SectionItem[] = [
  { id: "summary",    label: "Summary",    visible: true },
  { id: "experience", label: "Experience", visible: true },
  { id: "education",  label: "Education",  visible: true },
  { id: "projects",   label: "Projects",   visible: true },
  { id: "skills",     label: "Skills",     visible: true },
];

interface ThemeCustomizerProps {
  config: ThemeConfig;
  onChange: (config: ThemeConfig) => void;
}

export function ThemeCustomizer({ config, onChange }: ThemeCustomizerProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // ── Color ──
  const setAccentColor = (color: string) => {
    onChange({ ...config, accentColor: color });
  };

  // ── Font ──
  const setFont = (font: string) => {
    onChange({ ...config, fontFamily: font });
  };

  // ── Section Visibility ──
  const toggleVisibility = (id: string) => {
    onChange({
      ...config,
      sectionOrder: config.sectionOrder.map(s =>
        s.id === id ? { ...s, visible: !s.visible } : s
      ),
    });
  };

  // ── Drag & Drop ──
  const handleDragStart = useCallback((index: number) => {
    setDraggedIndex(index);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const newOrder = [...config.sectionOrder];
    const [moved] = newOrder.splice(draggedIndex, 1);
    newOrder.splice(index, 0, moved);
    onChange({ ...config, sectionOrder: newOrder });
    setDraggedIndex(index);
  }, [draggedIndex, config, onChange]);

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
      {/* ─── Accent Color ─── */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Palette className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-bold text-white">Accent Color</h2>
        </div>
        <p className="text-sm text-neutral-500 -mt-2">Choose a primary color for headings, highlights, and accents.</p>

        <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
          {COLOR_PRESETS.map(c => (
            <button
              key={c.value}
              onClick={() => setAccentColor(c.value)}
              className={`group relative w-full aspect-square rounded-xl border-2 transition-all duration-200 ${
                config.accentColor === c.value
                  ? "border-neutral-900 scale-110 shadow-lg ring-2 ring-neutral-900/10"
                  : "border-transparent hover:border-neutral-300 hover:scale-105"
              }`}
              title={c.name}
            >
              <div className={`${c.bg} w-full h-full rounded-lg`} />
              {config.accentColor === c.value && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white drop-shadow-md" />
                </div>
              )}
              <span className="text-[10px] font-medium text-neutral-500 block mt-1 text-center">{c.name}</span>
            </button>
          ))}
        </div>

        {/* Custom color input */}
        <div className="flex items-center gap-3 mt-2">
          <Label className="text-xs text-neutral-500">Custom:</Label>
          <input
            type="color"
            value={config.accentColor}
            onChange={e => setAccentColor(e.target.value)}
            className="w-8 h-8 rounded-lg cursor-pointer border-2 border-neutral-200 hover:border-neutral-400 transition-colors"
          />
          <span className="text-xs text-neutral-400 font-mono">{config.accentColor}</span>
        </div>
      </section>

      {/* ─── Font Family ─── */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Type className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-bold text-white">Font Family</h2>
        </div>
        <p className="text-sm text-neutral-500 -mt-2">Set the typeface for your resume content.</p>

        <div className="grid grid-cols-2 gap-3">
          {FONT_OPTIONS.map(f => (
            <button
              key={f.value}
              onClick={() => setFont(f.value)}
              className={`px-4 py-3 rounded-xl border-2 text-left transition-all ${
                config.fontFamily === f.value
                  ? "border-indigo-500 bg-indigo-500/10 shadow-sm"
                  : "border-neutral-800 hover:border-neutral-700 bg-neutral-900"
              }`}
            >
              <span className="text-sm font-semibold text-white" style={{ fontFamily: f.value }}>
                {f.label}
              </span>
              <p className="text-[11px] text-neutral-500 mt-1" style={{ fontFamily: f.value }}>
                The quick brown fox jumps over the lazy dog
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* ─── Section Order (Drag & Drop) ─── */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <ArrowUpDown className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-bold text-white">Section Order</h2>
        </div>
        <p className="text-sm text-neutral-500 -mt-2">Drag to reorder and toggle visibility of resume sections.</p>

        <div className="space-y-2">
          {config.sectionOrder.map((section, index) => (
            <div
              key={section.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 bg-neutral-900 cursor-grab active:cursor-grabbing transition-all ${
                draggedIndex === index
                  ? "border-indigo-500 bg-indigo-500/10 shadow-md scale-[1.02]"
                  : section.visible
                    ? "border-neutral-800 hover:border-neutral-700"
                    : "border-dashed border-neutral-800 opacity-50"
              }`}
            >
              <GripVertical className="w-4 h-4 text-neutral-500 flex-shrink-0" />
              <span className="flex-1 text-sm font-medium text-white">{section.label}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => toggleVisibility(section.id)}
              >
                {section.visible ? (
                  <Eye className="w-4 h-4 text-indigo-600" />
                ) : (
                  <EyeOff className="w-4 h-4 text-neutral-400" />
                )}
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
