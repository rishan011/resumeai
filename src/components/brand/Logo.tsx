"use client";

import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export function Logo({ className = "", size = "md", animated = true }: LogoProps) {
  const sizes = {
    sm: { wrapper: "w-8 h-8", text: "text-lg", svgSize: 24 },
    md: { wrapper: "w-10 h-10", text: "text-xl", svgSize: 32 },
    lg: { wrapper: "w-14 h-14", text: "text-3xl", svgSize: 48 },
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center gap-2 group select-none ${className}`}>
      <motion.div
        whileHover={animated ? { scale: 1.05 } : {}}
        whileTap={animated ? { scale: 0.95 } : {}}
        className={`${currentSize.wrapper} flex items-center justify-center relative`}
      >
        <svg
          width={currentSize.svgSize}
          height={currentSize.svgSize}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main "N" - Background segments */}
          {/* Left Vertical Bar with rounded top */}
          <motion.path
            d="M30 80V25C30 22.2386 32.2386 20 35 20H42"
            stroke="url(#grad_cyan)"
            strokeWidth="18"
            strokeLinecap="round"
            initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          
          {/* Right Vertical Bar with rounded bottom */}
          <motion.path
            d="M58 80H65C67.8386 80 70 77.7614 70 75V20"
            stroke="url(#grad_blue)"
            strokeWidth="18"
            strokeLinecap="round"
            initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          {/* Overlapping Diagonal for 3D folded effect */}
          <motion.path
            d="M30 20L70 80"
            stroke="url(#grad_diag)"
            strokeWidth="18"
            strokeLinecap="round"
            initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
          />

          <defs>
            <linearGradient id="grad_cyan" x1="30" y1="20" x2="30" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#22d3ee" />
              <stop offset="1" stopColor="#0ea5e9" />
            </linearGradient>
            <linearGradient id="grad_blue" x1="70" y1="20" x2="70" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0ea5e9" />
              <stop offset="1" stopColor="#22d3ee" />
            </linearGradient>
            <linearGradient id="grad_diag" x1="30" y1="20" x2="70" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="0.5" stopColor="#0ea5e9" />
              <stop offset="1" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
        </svg>

        {animated && (
          <motion.div
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-cyan-500/10 rounded-full blur-2xl -z-10"
          />
        )}
      </motion.div>

      <div className="flex flex-col">
        <motion.span
          className={`${currentSize.text} font-black tracking-tight leading-none font-[family-name:var(--font-plus-jakarta)] flex items-center`}
        >
          <span className="text-white drop-shadow-sm">Nee</span>
          <span className="bg-gradient-to-br from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">
            Dee
          </span>
        </motion.span>
        {size === "lg" && (
          <motion.span className="text-[11px] uppercase tracking-[0.4em] font-bold text-neutral-500/80 mt-2 ml-0.5">
            Premium AI Builder
          </motion.span>
        )}
      </div>
    </div>
  );
}
