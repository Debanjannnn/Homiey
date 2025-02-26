import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req: Request) {
  const { classname, subj, topic, numQuestions = 5 } = await req.json();

  const prompt = `Generate a quiz for a ${classname} class, subject: ${subj}, topic: ${topic} with ${numQuestions} multiple-choice questions. Format the output as a JSON array of objects, where each object has the following structure:
  {
    "question": "The question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "The correct option (A, B, C, or D)"
  }
  Ensure that the response does not include markdown formatting, such as triple backticks.`;  // Prevents AI from using ```json

  try {
    // Use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();

    // Remove potential Markdown code blocks
    if (text.startsWith("```json")) {
      text = text.replace(/^```json/, "").replace(/```$/, "").trim();
    }

    // Parse the cleaned JSON response
    const quiz = JSON.parse(text);

    // Return the quiz data
    return NextResponse.json({ quiz });
  } catch (error) {
    console.error("Error generating quiz:", error);
    return NextResponse.json(
      { error: "Failed to generate quiz" },
      { status: 500 }
    );
  }
}
