"use client";

import { motion } from "framer-motion";

export function DashboardAmbientBg({ accentColor = "indigo" }: { accentColor?: "indigo" | "violet" | "red" | "blue" }) {
  const colorMap = {
    indigo: "bg-indigo-600",
    violet: "bg-violet-600",
    red: "bg-red-600",
    blue: "bg-blue-600",
  };

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#030303]">
      {/* Dynamic Grid */}
      <motion.div 
        animate={{ backgroundPosition: ["0px 0px", "24px 24px"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
      />
      
      {/* Primary Orb */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.12, 0.08],
          y: [0, 20, 0]
        }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-[-20%] left-[-10%] w-[50%] h-[50%] ${colorMap[accentColor]} rounded-full blur-[120px]`}
      />
      
      {/* Secondary Orb */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.1, 0.05],
          y: [0, -20, 0]
        }} 
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-violet-600 rounded-full blur-[120px]" 
      />
    </div>
  );
}
