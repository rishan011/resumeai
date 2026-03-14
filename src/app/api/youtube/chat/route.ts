import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { question, transcript } = await req.json();

    if (!question || !transcript) {
      return NextResponse.json({ error: "Context required" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are a video intelligence assistant. Answer the user's question accurately based ONLY on the provided transcript context.
    
    Context: ${transcript}
    
    Question: ${question}`;

    const result = await model.generateContent(prompt);
    const answer = result.response.text();

    return NextResponse.json({ answer });
  } catch (error: any) {
    console.error("[API] Chat Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
