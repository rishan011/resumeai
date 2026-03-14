import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  const isVercel = process.env.VERCEL === "1";
  const url = process.env.DATABASE_URL || "";
  
  if (isVercel && url.startsWith("file:")) {
    console.warn("⚠️ CRITICAL: SQLite detected in Vercel environment. Database is READ-ONLY. Authentication and persistence will fail. Please switch to a PostgreSQL database (e.g., Neon/Supabase).");
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
