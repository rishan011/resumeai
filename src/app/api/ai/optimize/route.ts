import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { resumeText, jobDescription } = await req.json();

    if (!resumeText || !jobDescription) {
      return NextResponse.json({ error: "Both resume text and job description are required" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      // Return mock response if no API key is set
      return NextResponse.json({
        score: 85,
        missingKeywords: ["React Hooks", "GraphQL", "Agile Methodologies"],
        suggestions: [
          "Consider adding metrics to your second experience bullet.",
          "Highlight your experience with cross-functional team collaboration."
        ],
        optimizedSummary: "[MOCK] An experienced software engineer with a proven track record of delivering scalable web applications using React and Node.js..."
      });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "placeholder-key",
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Using full model for complex analysis
      messages: [
        {
          role: "system",
          content: "You are an expert ATS system and technical recruiter. Analyze the provided resume against the job description. Return your response ONLY as a valid JSON object matching this schema: { score: number (0-100), missingKeywords: string[], suggestions: string[], optimizedSummary: string }. Do not include anymarkdown formatting or text outside the JSON object.",
        },
        {
          role: "user",
          content: `Job Description:\n${jobDescription}\n\nResume Text:\n${resumeText}`,
        },
      ],
      temperature: 0.2,
      response_format: { type: "json_object" },
    });

    const resultString = completion.choices[0].message.content;
    const resultJson = JSON.parse(resultString || "{}");

    return NextResponse.json(resultJson);
  } catch (error) {
    console.error("Error in AI optimize route:", error);
    return NextResponse.json({ error: "Failed to optimize content" }, { status: 500 });
  }
}
