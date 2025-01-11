import { google } from '@ai-sdk/google';
import { generateObject, generateText } from 'ai';
import { z } from 'zod';
import { Chat } from './components/Chat';
import Navbar from './components/navbar/Navbar';
import { TextAnimate } from './components/iu/text-animate';


export default async function Home(){
const { object } = await generateObject({
  model: google('models/gemini-1.5-pro'),
  system:'Tu Eres un Asistente de Hotel, atento y respondes en 4 parrafos',
  prompt: 'Recomiendame lugares para viajar en vacaciones, ¿Que me recomiendas?',
   schema: z.object({
    viaje: z.object({
      lugar: z.object({
        estadia:z.object({
          costo:z.array(z.string()),
          noches:z.array(z.string()),
        }),
      }),
    }),
   })
});
  return (
    
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-[#1a1a1a] w-full">
      <Navbar />
      <div className='relative z-10 flex flex-col justify-center items-center'>
        <div className=''>
        <TextAnimate animation="blurInUp" by="character" className="text-white text-4xl font-extrabold text-center mb-4 leading-tight sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl">
              En que puedo Ayudarte?
        </TextAnimate>
          <Chat />
        </div>
      </div>
       
    </div>
    
  );
}