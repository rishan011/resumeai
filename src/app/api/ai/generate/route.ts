import { NextResponse } from "next/server";
import OpenAI from "openai";

// Note: Requires OPENAI_API_KEY in environment variables

export async function POST(req: Request) {
  try {
    const { prompt, context } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      // Return mock response if no API key is set to allow UI testing
      return NextResponse.json({
        content: `[MOCK AI RESPONSE] Generated professional bullet points based on: "${prompt}". \n- Orchestrated cross-functional teams to deliver project on time.\n- Improved performance by 40% using modern web technologies.\n- Developed scalable architecture for high-traffic environments.`,
      });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "placeholder-key",
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Using gpt-4o-mini for speed and cost efficiency
      messages: [
        {
          role: "system",
          content: "You are an expert resume writer. Generate highly professional, impactful, and ATS-optimized bullet points based on the user's input. Ensure they start with strong action verbs and include metrics where implied. Keep them concise.",
        },
        {
          role: "user",
          content: `Context: ${context || "Work Experience"}\nTask: Expand this into professional resume bullets.\nInput: ${prompt}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 250,
    });

    const content = completion.choices[0].message.content;

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Error in AI generate route:", error);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}
