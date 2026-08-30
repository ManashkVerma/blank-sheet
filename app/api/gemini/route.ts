import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!,
);

export async function POST(req: NextRequest) {
  try {
    const {
      systemPrompt,
      userPrompt,
    } = await req.json();

    if (!systemPrompt || !userPrompt) {
      return NextResponse.json(
        {
          error: "systemPrompt and userPrompt are required",
        },
        { status: 400 },
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
      systemInstruction: systemPrompt,
    });

    const result = await model.generateContent(userPrompt);

    const text = result.response.text();

    return NextResponse.json({
      success: true,
      result: text,
    });
  } catch (error) {
    console.error("Gemini error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate diagram",
      },
      { status: 500 },
    );
  }
}