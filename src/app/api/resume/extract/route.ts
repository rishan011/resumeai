import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "placeholder-key",
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const mimeType = file.type;
    const buffer = Buffer.from(await file.arrayBuffer());
    let extractedText = "";

    // --- PDF Extraction ---
    if (mimeType === "application/pdf") {
      // pdf-parse is a CommonJS module; use require to avoid ESM interop issues
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require("pdf-parse");
      const data = await pdfParse(buffer);
      extractedText = data.text;

      if (!extractedText.trim()) {
        return NextResponse.json(
          { error: "Could not extract text from PDF. The file may be scanned or image-based. Try uploading it as an image instead." },
          { status: 422 }
        );
      }
    }
    // --- Image Extraction via OpenAI Vision ---
    else if (["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(mimeType)) {
      if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json(
          { error: "OpenAI API key is required for image-based resume extraction." },
          { status: 503 }
        );
      }

      const base64Image = buffer.toString("base64");
      const dataUrl = `data:${mimeType};base64,${base64Image}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "This is an image of a resume. Please extract ALL text content from it exactly as it appears, preserving sections, bullet points and structure. Return only the extracted text, nothing else.",
              },
              {
                type: "image_url",
                image_url: { url: dataUrl, detail: "high" },
              },
            ],
          },
        ],
        max_tokens: 4000,
      });

      extractedText = response.choices[0].message.content || "";

      if (!extractedText.trim()) {
        return NextResponse.json(
          { error: "Could not extract text from the image. Please ensure it is a clear photo of a resume." },
          { status: 422 }
        );
      }
    } else {
      return NextResponse.json(
        { error: `Unsupported file type: ${mimeType}. Please upload a PDF or image (JPG, PNG, WEBP).` },
        { status: 400 }
      );
    }

    return NextResponse.json({ text: extractedText });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error in resume extract route:", message);
    return NextResponse.json(
      { error: `Failed to extract resume content: ${message}` },
      { status: 500 }
    );
  }
}
