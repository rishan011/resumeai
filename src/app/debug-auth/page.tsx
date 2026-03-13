"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
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
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
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
        <Badge variant="destructive" className="bg-red-500/10 text-red-500 border-red-500/20 gap-1">
          <XCircle className="w-3 h-3" /> {text} missing
        </Badge>
      )}
    </div>
  );

  return (
    <main className="min-h-screen p-8 lg:p-24 relative overflow-hidden bg-black text-white">
      <DashboardAmbientBg accentColor="indigo" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <h1 className="text-4xl font-black mb-8 tracking-tight">
          Auth <span className="text-indigo-500">Diagnostics</span>
        </h1>

        <div className="grid gap-6">
          {/* Environment Section */}
          <Card className="bg-[#0A0A0B]/60 backdrop-blur-2xl border-white/[0.08] text-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Environment Variables</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-neutral-400 font-medium">GOOGLE_CLIENT_ID</span>
                <StatusBadge condition={!!data?.googleId} text="ID" />
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-neutral-400 font-medium">GOOGLE_CLIENT_SECRET</span>
                <StatusBadge condition={!!data?.googleSecret} text="Secret" />
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-neutral-400 font-medium">NEXTAUTH_SECRET</span>
                <StatusBadge condition={!!data?.nextAuthSecret} text="Secret" />
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-neutral-400 font-medium">NEXTAUTH_URL</span>
                <div className="text-right">
                    <StatusBadge condition={!!data?.nextAuthUrl} text="URL" />
                    {data?.nextAuthUrl && (
                        <p className="text-[10px] text-neutral-500 mt-1 font-mono">{data.nextAuthUrl}</p>
                    )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Database Section */}
          <Card className="bg-[#0A0A0B]/60 backdrop-blur-2xl border-white/[0.08] text-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Database Connectivity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 font-medium">Prisma Connection</span>
                {data?.dbStatus === "success" ? (
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Connected
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="bg-red-500/10 text-red-500 border-red-500/20 gap-1">
                    <XCircle className="w-3 h-3" /> Failed
                  </Badge>
                )}
              </div>
              {data?.dbError && (
                <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl">
                  <p className="text-xs text-red-400 font-mono break-all">{data.dbError}</p>
                </div>
              )}
              {data?.dbType === "sqlite" && (
                <div className="flex items-start gap-3 p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl">
                   <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                   <div>
                      <p className="text-sm font-bold text-amber-500 uppercase tracking-wider mb-1">Warning: SQLite on Vercel</p>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        You are using SQLite. On Vercel, SQLite databases are **read-only** and reset on every deploy. This **will** prevent Google Authentication from saving users.
                      </p>
                   </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-indigo-500/5 border-indigo-500/20 text-white">
            <CardContent className="pt-6">
              <h3 className="font-bold mb-2">Recommended Action</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                If all environment variables are green but you still see `OAuthSignin`, ensure your **Authorized Redirect URI** in Google Cloud Console matches exactly:
              </p>
              <div className="mt-4 p-3 bg-black/50 rounded-lg font-mono text-xs text-indigo-400 break-all border border-indigo-500/10">
                https://resumeai-aqf6.vercel.app/api/auth/callback/google
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
