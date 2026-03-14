"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FileText, 
  LogOut, 
  Settings, 
  LayoutDashboard, 
  Crown, 
  Sparkles, 
  Youtube, 
  Search,
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";

export function DashboardHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on path change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { label: "My Resumes", href: "/dashboard", icon: FileText },
    { label: "Cover Letters", href: "/dashboard/cover-letters", icon: Sparkles },
    { label: "YouTube Summarizer", href: "/dashboard/youtube-summarizer", icon: Youtube },
    { label: "Job Search", href: "/dashboard/job-search", icon: Search },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.04] bg-[#050505]/60 backdrop-blur-xl px-4 sm:px-6 h-16 flex items-center justify-between transition-all duration-300">
      <div className="flex items-center gap-4 lg:gap-10">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-400 hover:text-white transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <Link href="/" className="shrink-0">
          <Logo size="md" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 relative px-1 py-1 bg-white/[0.02] border border-white/[0.05] rounded-full">
          {navItems.map((item) => {
            const isActive = item.href === "/dashboard" 
              ? pathname === "/dashboard" 
              : pathname.startsWith(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredPath(item.href)}
                onMouseLeave={() => setHoveredPath(null)}
                className={`relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-colors duration-300 z-10 ${
                  isActive ? "text-white" : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? "text-red-500" : "text-neutral-500"}`} />
                {item.label}
                
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-white/5 rounded-full shadow-[inset_0_0_20px_rgba(255,0,0,0.05),0_0_30px_rgba(239,68,68,0.1)] -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  >
                    <div className="absolute inset-0 rounded-full border border-white/[0.12]" />
                    <div className="absolute inset-x-4 -bottom-1 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent blur-[1px]" />
                  </motion.div>
                )}
                
                {hoveredPath === item.href && !isActive && (
                  <motion.div
                    layoutId="nav-hover"
                    className="absolute inset-0 bg-white/5 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <Button variant="outline" size="sm" className="hidden sm:flex border-amber-500/20 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 hover:text-amber-300 gap-2 h-9 rounded-full px-4 border font-bold text-xs ring-offset-[#030303] focus-visible:ring-amber-500">
          <Crown className="w-3.5 h-3.5" />
          Pro
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="relative h-9 w-9 rounded-full border border-white/10 p-0 overflow-hidden hover:bg-white/5 ring-offset-[#030303] focus-visible:ring-indigo-500 flex items-center justify-center cursor-pointer">
            <Avatar className="h-full w-full">
              <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-[10px] font-bold text-white">
                {session?.user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-neutral-900 border-neutral-800 text-white shadow-2xl rounded-xl p-1.5" align="end">
            <div className="flex flex-col space-y-1 p-3">
              <p className="text-sm font-bold leading-none">{session?.user?.name}</p>
              <p className="text-xs leading-none text-neutral-500 mt-1">{session?.user?.email}</p>
            </div>
            <DropdownMenuSeparator className="bg-neutral-800 my-1.5" />
            <DropdownMenuItem className="focus:bg-white/5 rounded-lg cursor-pointer">
              <Link href="/dashboard" className="flex items-center gap-2 w-full font-medium">
                <LayoutDashboard className="w-4 h-4 text-neutral-400" /> Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-white/5 rounded-lg cursor-pointer">
              <Link href="/dashboard/settings" className="flex items-center gap-2 w-full font-medium">
                <Settings className="w-4 h-4 text-neutral-400" /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-neutral-800 my-1.5" />
            <DropdownMenuItem 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 font-bold text-red-500 focus:bg-red-500/10 focus:text-red-400 rounded-lg cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[51] lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-[#030303] border-r border-white/5 z-[52] lg:hidden flex flex-col p-6 shadow-2xl"
            >
              <div className="mb-10 pb-6 border-b border-white/5">
                <Logo size="md" />
              </div>

              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = item.href === "/dashboard" 
                    ? pathname === "/dashboard" 
                    : pathname.startsWith(item.href);
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between p-4 rounded-xl text-sm font-bold transition-all ${
                        isActive 
                          ? "bg-white/5 text-white border border-white/10" 
                          : "text-neutral-400 hover:text-white hover:bg-white/[0.02]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-4 h-4 ${isActive ? "text-red-500" : "text-neutral-500"}`} />
                        {item.label}
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "text-red-500 translate-x-1" : "text-neutral-600 opacity-0 group-hover:opacity-100"}`} />
                    </Link>
                  );
                })}
              </div>

              <div className="mt-auto pt-6 border-t border-white/5">
                <Button className="w-full bg-red-600 hover:bg-red-500 text-white font-bold h-12 rounded-xl gap-2 shadow-lg shadow-red-600/20 transition-all active:scale-[0.98]">
                  <Crown className="w-4 h-4" />
                  Upgrade to Pro intelligence
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
