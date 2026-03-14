"use client";

import { motion } from "framer-motion";

export function PremiumBackground() {
  return (
    <div className="fixed inset-0 z-[-10] overflow-hidden bg-[#020202]">
      {/* 1. Base Noise Texture Layer */}
      <div className="absolute inset-0 opacity-[0.4] mix-blend-overlay pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="premiumNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#premiumNoise)" />
        </svg>
      </div>

      {/* 2. Curved Surface 1 (Top Left) */}
      <motion.div 
        animate={{ 
          rotate: [0, 5, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] -left-[10%] w-[80%] h-[70%] opacity-[0.07] pointer-events-none"
      >
        <svg viewBox="0 0 1000 1000" className="w-full h-full fill-white">
          <path d="M0,0 C300,0 700,400 1000,1000 L0,1000 Z" opacity="0.5" />
          <filter id="blurFilter">
            <feGaussianBlur stdDeviation="80" />
          </filter>
          <rect width="100%" height="100%" filter="url(#blurFilter)" fill="url(#grad1)" />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 3. Curved Surface 2 (Bottom Right) */}
      <motion.div 
        animate={{ 
          rotate: [0, -3, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-[20%] -right-[10%] w-[90%] h-[80%] opacity-[0.05] pointer-events-none"
      >
        <svg viewBox="0 0 1000 1000" className="w-full h-full fill-white">
          <path d="M1000,1000 C700,1000 300,600 0,0 L1000,0 Z" opacity="0.3" />
          <rect width="100%" height="100%" filter="url(#blurFilter)" fill="url(#grad2)" />
          <defs>
            <linearGradient id="grad2" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#808080" stopOpacity="0.6" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 4. Ambient Orion Glow (Central) */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.06, 0.03] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-[#ff0000] rounded-full blur-[180px] pointer-events-none"
      />

      {/* 5. Vignette Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-80 pointer-events-none" />
    </div>
  );
}
