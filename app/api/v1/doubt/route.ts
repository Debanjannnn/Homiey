import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

export async function POST(request: Request) {
  const { message, classname, subj, topic, doubt } = await request.json()

//   const prompt = `the user's message is "${message}".Further explain the user on the said ${doubt}.As a knowledgeable tutor for class ${classname}, subject ${subj}, and topic '${topic}', please address the following doubt:

// ${doubt}

// Please provide a clear and concise explanation that is appropriate for a student in class ${classname}.`
const prompt = `The user has asked: "${message}".  

As a knowledgeable tutor specializing in class ${classname}, subject ${subj}, and topic '${topic}', please provide a clear and concise explanation that is appropriate for a student at this level.  

Use simple language, relevant examples, and step-by-step explanations to enhance understanding.`

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const aitext = response.text()

    return NextResponse.json({ reply: aitext })
  } catch (error) {
    console.error('Error generating content:', error)
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 })
  }
}

