"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle, AlertTriangle, Copy } from "lucide-react";
import { toast } from "sonner";
import { DashboardAmbientBg } from "@/components/dashboard/DashboardAmbientBg";

const Badge = ({ children, className, variant }: any) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
    {children}
  </span>
);

export default function DebugAuthPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/debug-auth")
      .then((res) => res.json())
      .then((d) => {
        setData({ ...d, currentUrl: window.location.origin });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
      </div>
    );
  }

  const StatusBadge = ({ condition, text }: { condition: boolean, text: string }) => (
    <div className="flex items-center gap-2">
      {condition ? (
        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 gap-1">
          <CheckCircle2 className="w-3 h-3" /> {text} set
        </Badge>
      ) : (
        <Badge className="bg-red-500/10 text-red-500 border-red-500/20 gap-1">
          <XCircle className="w-3 h-3" /> {text} missing
        </Badge>
      )}
    </div>
  );

  return (
    <main className="min-h-screen p-8 lg:p-24 relative overflow-hidden bg-transparent text-white grain-overlay">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="flex items-center gap-3 mb-4">
            <div className="h-0.5 w-12 bg-red-500 rounded-full" />
            <span className="text-red-500 font-bold tracking-[0.2em] text-[10px] uppercase">Intelligence Check</span>
        </div>
        <h1 className="text-5xl font-black mb-12 tracking-tighter italic uppercase">
          Auth <span className="text-red-500">Diagnostics</span>
        </h1>

        <div className="grid gap-8">
          {/* Environment Section */}
          <Card className="bg-[#0A0A0B]/40 backdrop-blur-3xl border-white/[0.05] text-white rounded-[2rem] overflow-hidden">
            <CardHeader className="border-b border-white/5 pb-6">
              <CardTitle className="text-xl font-black italic uppercase tracking-tight">Environment Sync</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-neutral-500 font-bold text-xs uppercase tracking-widest">GOOGLE_CLIENT_ID</span>
                <StatusBadge condition={!!data?.googleId} text="ID" />
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-neutral-500 font-bold text-xs uppercase tracking-widest">GOOGLE_CLIENT_SECRET</span>
                <StatusBadge condition={!!data?.googleSecret} text="Secret" />
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-neutral-500 font-bold text-xs uppercase tracking-widest">NEXTAUTH_SECRET</span>
                <StatusBadge condition={!!data?.nextAuthSecret} text="Secret" />
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-neutral-500 font-bold text-xs uppercase tracking-widest">POSTGRES_PRISMA_URL</span>
                <StatusBadge condition={!!data?.postgresPrisma} text="Pool URL" />
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-neutral-500 font-bold text-xs uppercase tracking-widest">POSTGRES_DIRECT_URL</span>
                <StatusBadge condition={!!data?.postgresDirect} text="Direct URL" />
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-neutral-500 font-bold text-xs uppercase tracking-widest">Environment</span>
                <Badge className="bg-white/5 text-white border-white/10 uppercase font-black px-4">{data?.env}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* URL Mismatch Check */}
          <Card className="bg-[#0A0A0B]/40 backdrop-blur-3xl border-white/[0.05] text-white rounded-[2rem] overflow-hidden">
            <CardHeader className="border-b border-white/5 pb-6">
              <CardTitle className="text-xl font-black italic uppercase tracking-tight">Configuration Link</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                        <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-2">NEXTAUTH_URL</p>
                        <p className="text-xs font-mono text-red-400 break-all">{data?.nextAuthUrl || "NOT SET"}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                        <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-2">Current Browser URL</p>
                        <p className="text-xs font-mono text-emerald-400 break-all">{data?.currentUrl}</p>
                    </div>
                </div>

                {data?.nextAuthUrl && data?.currentUrl && !data.currentUrl.includes(data.nextAuthUrl.replace('http://', '').replace('https://', '')) && (
                    <div className="flex items-start gap-4 p-5 bg-red-500/5 border border-red-500/20 rounded-2xl">
                        <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                        <div>
                            <p className="text-sm font-black text-red-500 uppercase tracking-wider mb-1 italic">URL Mismatch Detected</p>
                            <p className="text-xs text-neutral-400 leading-relaxed">
                                Your <b>NEXTAUTH_URL</b> is set to a different domain than what you are currently visiting. This will cause Google Sign-in to fail. Ensure they match exactly in Vercel.
                            </p>
                        </div>
                    </div>
                )}
            </CardContent>
          </Card>

          {/* Database Section */}
          <Card className="bg-[#0A0A0B]/40 backdrop-blur-3xl border-white/[0.05] text-white rounded-[2rem] overflow-hidden">
            <CardHeader className="border-b border-white/5 pb-6">
              <CardTitle className="text-xl font-black italic uppercase tracking-tight">Storage Intelligence</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-neutral-500 font-bold text-xs uppercase tracking-widest">Database Engine</span>
                <Badge className="bg-red-500/10 text-red-500 border-red-500/20 font-black uppercase px-4">{data?.dbType}</Badge>
              </div>

              {data?.dbType === "sqlite" && (
                <div className="flex items-start gap-4 p-5 bg-amber-500/5 border border-amber-500/20 rounded-2xl">
                   <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                   <div>
                      <p className="text-sm font-black text-amber-500 uppercase tracking-wider mb-1 italic">Production Limitation</p>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        SQLite is read-only on Vercel. You must switch to a PostgreSQL database (like Neon or Supabase) for user sign-in to work permanently.
                      </p>
                   </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-red-600/10 to-transparent border border-red-500/20">
              <h3 className="font-black italic uppercase tracking-tight text-white mb-4">Required Action</h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                Copy this URI and paste it into your <b>Google Cloud Console</b> under "Authorized Redirect URIs":
              </p>
              <div className="group relative">
                <div className="p-5 bg-black/40 rounded-2xl font-mono text-xs text-red-400 break-all border border-white/5 group-hover:border-red-500/30 transition-all">
                    {data?.currentUrl}/api/auth/callback/google
                </div>
                <button 
                    onClick={() => {
                        navigator.clipboard.writeText(`${data?.currentUrl}/api/auth/callback/google`);
                        toast.success("Redirect URI copied to clipboard");
                    }}
                    className="absolute right-3 top-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all shadow-xl"
                >
                    <Copy className="w-4 h-4" />
                </button>
              </div>
          </div>
        </div>
      </div>
    </main>
  );
}
