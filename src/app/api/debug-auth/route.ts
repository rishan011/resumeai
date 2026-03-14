import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  let dbStatus = "failed";
  let dbError = null;
  let dbType = "unknown";

  try {
    // Try a simple query
    await prisma.user.count();
    dbStatus = "success";
    
    // Check provider
    // @ts-ignore
    dbType = prisma._activeProvider || "postgresql";
  } catch (error: any) {
    dbError = error.message;
  }

  return NextResponse.json({
    googleId: !!process.env.GOOGLE_CLIENT_ID,
    googleSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    nextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    nextAuthUrl: process.env.NEXTAUTH_URL || null,
    postgresPrisma: !!process.env.POSTGRES_PRISMA_URL,
    postgresDirect: !!process.env.POSTGRES_URL_NON_POOLING,
    dbStatus,
    dbError,
    dbType,
    env: process.env.NODE_ENV
  });
}
