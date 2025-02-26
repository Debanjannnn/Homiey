import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function POST(request: Request) {
  try {
    const { classname, subj, topic, marks } = await request.json();

    // Create the prompt for Google Gemini to generate the question paper content
    // const prompt = `Create a question paper for class ${classname}, subject ${subj}, on the topic '${topic}'. The paper should be designed to help students score full marks in exams. Ensure the content is concise and to the point, with no extra markup. Structure the paper into three distinct sections: Section A, Section B, and Section C, with appropriate questions for each.`;

    const prompt = `Generate a well-structured question paper for Class ${classname} in the subject of ${subj}, focusing on the topic '${topic} and total ${marks} marks'. The paper should be optimized to help students achieve full marks in exams. Ensure clarity and conciseness, avoiding any unnecessary markup.  

Structure the paper into three sections:  
- **Section A**: Objective-type questions.  
- **Section B**: Short-answer questions requiring brief yet precise responses.  
- **Section C**: Long-answer questions designed to assess in-depth understanding.  

Maintain a balance of difficulty levels across the sections while covering key concepts comprehensively.`;



    // Use Google Gemini to generate the content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();

    // Return the generated content in JSON format
    return NextResponse.json({ content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
