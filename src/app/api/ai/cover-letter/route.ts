import { NextResponse } from "next/server";
import OpenAI from "openai";



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
      // Return a mock cover letter if no API key is present
      return NextResponse.json({
        coverLetter: `Dear Hiring Manager,\n\nI am writing to express my strong interest in the open position at your company. With my background in ${resumeData.personalInfo?.jobTitle || "my field"}, I am confident in my ability to contribute effectively to your team.\n\nThank you for your time and consideration. I look forward to the possibility of discussing this exciting opportunity with you.\n\nSincerely,\n${resumeData.personalInfo?.fullName || "Applicant"}`
      });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "placeholder-key",
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert career coach and professional copywriter.
Your task is to write a highly tailored, persuasive, and professional cover letter based on the user's resume and the provided job description.
The cover letter should:
1. Have a professional greeting and closing (using the applicant's name).
2. Highlight 1-2 key experiences from the resume that directly align with the job description.
3. Show enthusiasm for the role and the company.
4. Be concise, engaging, and confident (avoid sounding overly robotic or generic).
5. Be 3-4 paragraphs long.

Respond STRICTLY with a JSON object matching this schema:
{
  "coverLetter": string (The full text of the generated cover letter, using \n for line breaks)
}
Do not include any other text outside this JSON.`
        },
        {
          role: "user",
          content: `Job Description:\n${jobDescription}\n\nResume Data:\n${JSON.stringify(resumeData)}`
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const resultString = completion.choices[0].message.content;
    const resultJson = JSON.parse(resultString || "{}");

    return NextResponse.json(resultJson);
  } catch (error) {
    console.error("Error generating cover letter:", error);
    return NextResponse.json(
      { error: "Failed to generate cover letter" },
      { status: 500 }
    );
  }
}
