
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();
const API_KEY = process.env.GEMINI_AI_API_KEY || "";

const travelKeywords = [
  'viaje', 'visitar', 'viajar', 'conocer', 'luna de miel', 'turismo', 'itinerario', 'destino', 'hotel', 'reserva', 
  'vuelo', 'excursión', 'tour', 'atracción', 'vacaciones', 'hospedaje', 'ir', 'alojamiento', 'aventura', 'crucero'
];

export async function POST(req: Request) {
 
  const { description, userId } = await req.json(); 

  // Validar descripción
  if (!description) {
    return NextResponse.json(
      { error: 'Debes proporcionar una descripción.' },
      { status: 400 }
    );
  }

  // Validar palabras clave
  const lowerCaseDescription = description.toLowerCase();
  const containsKeyword = travelKeywords.some(keyword => 
    lowerCaseDescription.includes(keyword)
  );

  if (!containsKeyword) {
    return NextResponse.json(
      { message: 'Migo solo puede brindarte información sobre viajes y hoteles.' },
      { status: 400 }
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `Como asistente de viajes experto, proporciona:
    1. Recomendaciones de lugares económicos
    2. Opciones de alojamiento con precios
    3. Duración ideal del viaje
    4. Actividades y consejos locales
    Para: "${description}"`;

    const result = await model.generateContent([prompt]);
    console.log('Respuesta: ',result);  
    if (result && result.response) {
      const generatedText = await result.response.text();

   
      const chat = await prisma.chat.create({
        data: {
          userId: userId ?? null, 
          description,
          response: generatedText,
        },
      });

      return NextResponse.json({
        message: generatedText,
        chatId: chat.id, 
      });
    } else {
      throw new Error('No se recibió respuesta del modelo.');
    }
  } catch (error) {
    console.error('Error generando la respuesta:', error);
    return NextResponse.json(
      { error: 'Error al generar la respuesta' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Cerrar la conexión de Prisma
  }
}