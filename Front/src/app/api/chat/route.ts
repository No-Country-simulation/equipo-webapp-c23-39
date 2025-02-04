
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

const API_KEY = process.env.GEMINI_AI_API_KEY || "";

const travelKeywords = [
  'viaje', 'visitar', 'viajar', 'conocer', 'luna de miel', 'turismo', 'itinerario', 'destino', 'hotel', 'reserva', 
  'vuelo', 'excursión', 'tour', 'atracción', 'vacaciones', 'hospedaje', 'ir',
  'alojamiento', 'aventura', 'crucero'
];

export async function POST(req: Request) {
  const { description, userId } = await req.json();

  if (!description) {
    return NextResponse.json(
      { error: 'Debes proporcionar una descripción.' },
      { status: 400 }
    );
  }

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
    const model = await genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `Como asistente de viajes experto, proporciona:
    1. Recomendaciones de lugares económicos
    2. Opciones de alojamiento con precios
    3. Duración ideal del viaje
    4. Actividades y consejos locales
    Para: "${description}"`;
   
    const result = await model.generateContent([prompt]);
    
    if (result && result.response) {
      const generatedText = await result.response.text();

     
      return NextResponse.json({ message: generatedText});

    } else {
      throw new Error('No se recibió respuesta del modelo.');
    }
  } catch (error) {
    console.error('Error generando la respuesta:', error);
    return NextResponse.json({ error: 'Error al generar la respuesta' }, { status: 500 });
  }
}

// import { NextResponse } from 'next/server';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { PrismaClient } from '@prisma/client';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/lib/auth'; // Importa la configuración de autenticación

// const prisma = new PrismaClient();
// const API_KEY = process.env.GEMINI_AI_API_KEY || "";

// export async function POST(req: Request) {
 
//   const session = await getServerSession(authOptions);

  
//   if (!session?.user?.id) {
//     return NextResponse.json(
//       { error: 'Debes iniciar sesión para enviar un mensaje.' },
//       { status: 401 }
//     );
//   }

//   const { description } = await req.json();

//   if (!description) {
//     return NextResponse.json(
//       { error: 'Debes proporcionar una descripción.' },
//       { status: 400 }
//     );
//   }

//   try {
//     const genAI = new GoogleGenerativeAI(API_KEY);
//     const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
//     const prompt = `Eres un asistente de viajes. Responde de manera clara y concisa. Descripción: ${description}`;
//     const result = await model.generateContent([prompt]);

//     if (result && result.response) {
//       const generatedText = await result.response.text();

//       // Guardar el mensaje en la base de datos
//       // const chat = await prisma.chat.create({
//       //   data: {
//       //     userId: session.user.id, // Usar el ID del usuario autenticado
//       //     description, // Pregunta del usuario
//       //     response: generatedText, // Respuesta del bot
//       //   },
//       // });

//       // return NextResponse.json({ message: generatedText, chat });
//       return NextResponse.json({ message: generatedText});
//     } else {
//       throw new Error('No se recibió respuesta del modelo.');
//     }
//   } catch (error) {
//     console.error('Error generando la respuesta:', error);
//     return NextResponse.json(
//       { error: 'Error al generar la respuesta' },
//       { status: 500 }
//     );
//   }
// }