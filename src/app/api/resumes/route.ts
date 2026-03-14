import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const resumes = await prisma.resume.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(resumes);
  } catch (error) {
    console.error("GET_RESUMES_ERROR", error);
    return NextResponse.json({ error: "Failed to fetch resumes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { title, content } = await req.json();

    const resume = await prisma.resume.create({
      data: {
        title: title || "Untitled Resume",
        userId,
        content: typeof content === 'string' ? content : JSON.stringify(content || {}),
      },
    });

    return NextResponse.json(resume);
  } catch (error) {
    console.error("CREATE_RESUME_ERROR", error);
    return NextResponse.json({ error: "Failed to create resume" }, { status: 500 });
  }
}
