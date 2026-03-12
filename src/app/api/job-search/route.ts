import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { query, location } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "Search query is required" }, { status: 400 });
    }

    const firecrawlKey = process.env.FIRECRAWL_API_KEY;
    
    if (!firecrawlKey) {
      // Mock response if no key is set
      return NextResponse.json({
        jobs: [
          {
            title: "Frontend Developer (Remote)",
            company: "TechNexus",
            location: location || "Global",
            link: "https://example.com/job/1",
            salary: "$80k - $120k",
            description: "Looking for a React expert to help us build the future of AI resume tools."
          },
          {
            title: "Software Engineer",
            company: "Innovate Solutions",
            location: location || "Global",
            link: "https://example.com/job/2",
            salary: "$100k+",
            description: "Join our core team building scalable backend systems with Node.js and PostgreSQL."
          }
        ]
      });
    }

    // Firecrawl search implementation
    // Using Firecrawl's search endpoint to find job listings
    const searchResponse = await fetch("https://api.firecrawl.dev/v1/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${firecrawlKey}`
      },
      body: JSON.stringify({
        query: `recent job postings for ${query} in ${location || 'anywhere'}`,
        limit: 5,
        scrapeOptions: {
          formats: ["markdown"]
        }
      })
    });

    if (!searchResponse.ok) {
      const errorData = await searchResponse.json();
      console.error("Firecrawl error:", errorData);
      throw new Error("Failed to fetch data from Firecrawl");
    }

    const rawData = await searchResponse.json();

    // Lazy load OpenAI to parse the results
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "placeholder-key",
    });

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
         jobs: rawData.data?.map((item: any) => ({
           title: item.title || "Job Title",
           company: "Found via Firecrawl",
           location: location || "Remote",
           link: item.url || "#",
           description: item.description || "No description available",
           salary: "N/A"
         })) || []
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a job search assistant. Parse the provided raw web search data and extract a list of job postings. Return your response ONLY as a JSON object with a 'jobs' field containing an array of objects. Each job object should have: 'title', 'company', 'location', 'link', 'salary', and 'description' (short summary). Keep it professional.",
        },
        {
          role: "user",
          content: `Data:\n${JSON.stringify(rawData).substring(0, 15000)}`,
        },
      ],
      temperature: 0.2,
      response_format: { type: "json_object" },
    });

    const parsedResults = JSON.parse(completion.choices[0].message.content || '{"jobs": []}');

    return NextResponse.json(parsedResults);
  } catch (error) {
    console.error("Job Search error:", error);
    return NextResponse.json({ error: "Failed to perform job search" }, { status: 500 });
  }
}
