import { NextResponse } from "next/server";
import OpenAI from "openai";



export async function POST(req: Request) {
  try {
    const { resumeData, jobDescription } = await req.json();

    if (!resumeData) {
      return NextResponse.json(
        { error: "Resume data is required" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      // Mock response for development
      return NextResponse.json({
        score: 72,
        matchAnalysis: jobDescription
          ? "[MOCK] Your resume shows strong foundational skills but lacks direct mentions of some key tools required by the job."
          : "[MOCK] Your resume has good structure but is missing key ATS optimization elements like quantified achievements and standard section headings.",
        missingKeywords: jobDescription ? ["GraphQL", "Docker", "CI/CD"] : ["Quantified results", "Action verbs", "Skills section"],
        improvements: [
          "Add measurable achievements to your experience section (e.g. 'Increased performance by 40%').",
          "Ensure your resume uses standard section headings like 'Experience', 'Education', 'Skills'.",
        ],
      });
    }

    // Two modes: targeted match (with job description) or general audit (without)
    const hasJobDescription = jobDescription && jobDescription.trim().length > 0;

    const systemPrompt = `You are an expert ATS (Applicant Tracking System) analyst and technical recruiter.
Your task is to analyze the provided resume${hasJobDescription ? " against the provided job description" : " for general ATS compatibility and quality"}.
You must return your analysis strictly as a JSON object matching this schema:
{
  "score": number (0 to 100),
  "matchAnalysis": string (A concise paragraph summarizing the ${hasJobDescription ? "match quality" : "overall ATS compatibility and resume quality"}),
  "missingKeywords": string[] (Array of ${hasJobDescription ? "important keywords from the job description missing in the resume" : "common ATS-required elements or keywords that are missing"}),
  "improvements": string[] (Actionable suggestions to improve the resume${hasJobDescription ? " for this specific job" : " for better ATS compatibility"})
}
Do not return any text outside of the JSON block.`;

    const userContent = hasJobDescription
      ? `Job Description:\n${jobDescription}\n\nResume Data:\n${typeof resumeData === "string" ? resumeData : resumeData.rawText || JSON.stringify(resumeData)}`
      : `Resume Data (analyze for general ATS compatibility and quality):\n${typeof resumeData === "string" ? resumeData : resumeData.rawText || JSON.stringify(resumeData)}`;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "placeholder-key",
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
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
