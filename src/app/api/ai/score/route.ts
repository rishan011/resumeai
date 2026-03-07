import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "placeholder-key",
});

export async function POST(req: Request) {
  try {
    const { resumeData, jobDescription } = await req.json();

    if (!resumeData || !jobDescription) {
      return NextResponse.json(
        { error: "Both resume data and job description are required" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      // Mock response for development if no key
      return NextResponse.json({
        score: 75,
        matchAnalysis: "[MOCK] Your resume shows strong foundational skills but lacks direct mentions of some key tools required by the job.",
        missingKeywords: ["GraphQL", "Docker", "CI/CD"],
        improvements: [
          "Explicitly mention your experience with CI/CD pipelines in your most recent role.",
          "Add Docker to your skills section if you have used it in projects."
        ]
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert technical recruiter and ATS (Applicant Tracking System) software.
Your task is to analyze the provided resume against the provided job description.
You must return your analysis strictly as a JSON object matching this schema:
{
  "score": number (0 to 100),
  "matchAnalysis": string (A concise paragraph summarizing the match quality),
  "missingKeywords": string[] (Array of important keywords from the job description missing in the resume),
  "improvements": string[] (Actionable suggestions to improve the resume for this specific job)
}
Do not return any text outside of the JSON block.`
        },
        {
          role: "user",
          content: `Job Description:\n${jobDescription}\n\nResume Data (JSON):\n${JSON.stringify(resumeData)}`
        }
      ],
      temperature: 0.2,
      response_format: { type: "json_object" },
    });

    const resultString = completion.choices[0].message.content;
    const resultJson = JSON.parse(resultString || "{}");

    return NextResponse.json(resultJson);
  } catch (error) {
    console.error("Error in ATS scoring route:", error);
    return NextResponse.json(
      { error: "Failed to perform ATS analysis" },
      { status: 500 }
    );
  }
}
