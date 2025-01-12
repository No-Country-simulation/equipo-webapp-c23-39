
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const API_KEY = process.env.GEMINI_AI_API_KEY || "";

export async function POST(req: Request) {
  const { description } = await req.json();

  if (!description) {
    return NextResponse.json(
      { error: 'Description is required.' },
      { status: 400 }
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = await genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `Eres un asistente de hotel. 
      Recomienda lugares económicos para viajar en vacaciones, 
      incluyendo opciones de hoteles asequibles y sugerencias 
      sobre cuántas noches quedarse. Asegúrate de incluir 
      actividades locales y consejos para disfrutar al máximo 
      la experiencia. Descripción: ${description}`;
    const result = await model.generateContent([prompt]);

    if (result && result.response) {
      const generatedText = await result.response.text();
      return NextResponse.json({ message: generatedText });
    } else {
      throw new Error('No response received from model.');
    }
  } catch (error) {
    console.error('Error generating message:', error);
    return NextResponse.json({ error: 'Failed to generate message' }, { status: 500 });
  }
}


