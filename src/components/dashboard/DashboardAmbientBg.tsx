"use client";

import { motion } from "framer-motion";

export function DashboardAmbientBg({ accentColor = "red" }: { accentColor?: "indigo" | "violet" | "red" | "blue" }) {
  const colorMap = {
    indigo: "bg-[#6366f1]",
    violet: "bg-[#8b5cf6]",
    red: "bg-[#ff0000]",
    blue: "bg-[#3b82f6]",
  };

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
      <div className="absolute inset-[-24px] z-0 overflow-hidden">
        <motion.div 
          animate={{ x: [0, 24], y: [0, 24] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px]" 
        />
      </div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_0%,#050505_100%)] opacity-90" />
      
      {/* Primary Orion Orb */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.06, 0.1, 0.06],
          y: [0, 40, 0]
        }} 
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-[-25%] left-[-10%] w-[60%] h-[60%] ${colorMap[accentColor]} rounded-full blur-[150px]`}
      />
      
      {/* Secondary Soft Ambient Orb */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.03, 0.06, 0.03],
          y: [0, -30, 0]
        }} 
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-[#400000] rounded-full blur-[120px]" 
      />
    </div>
  );
}
