import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  let dbStatus = "failed";
  let dbError = null;
  let dbType = "unknown";

  try {
    // 1. Connection check
    await prisma.user.count();
    dbStatus = "connected";
    
    // 2. Write test (using a dummy diagnostic ID)
    const testUser = await prisma.user.upsert({
      where: { email: "diagnostic@test.com" },
      update: { name: "Diagnostic Test " + new Date().toISOString() },
      create: { 
        email: "diagnostic@test.com",
        name: "Diagnostic Test User"
      }
    });
    
    if (testUser) {
      dbStatus = "success (write verified)";
    }

    // Check provider
    // @ts-ignore
    dbType = prisma._activeProvider || "postgresql";
  } catch (error) {
    dbStatus = "failed";
    dbError = error instanceof Error ? error.message : "Unknown database error";
  }

  return NextResponse.json({
    googleId: !!process.env.GOOGLE_CLIENT_ID,
    googleClientIdPrefix: process.env.GOOGLE_CLIENT_ID ? `${process.env.GOOGLE_CLIENT_ID.substring(0, 15)}...` : null,
    googleSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    googleClientSecretSuffix: process.env.GOOGLE_CLIENT_SECRET ? `...${process.env.GOOGLE_CLIENT_SECRET.slice(-4)}` : null,
    nextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    nextAuthUrl: process.env.NEXTAUTH_URL || null,
    dbStatus,
    dbError,
    dbType,
    env: process.env.NODE_ENV,
    postgresPrisma: !!process.env.POSTGRES_PRISMA_URL,
    postgresDirect: !!process.env.POSTGRES_URL_NON_POOLING || !!process.env.POSTGRES_DIRECT_URL
  });
}
