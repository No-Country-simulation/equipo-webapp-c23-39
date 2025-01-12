import InteractiveForm from "./components/InteractiveForm";
import Particles from "../components/ui/particles";
import { TextAnimate } from "../components/ui/text-animate";
import { Bot } from 'lucide-react';
import Navbar from "./components/navbar/Navbar";

export default function Home() {
  return (
    <div 
      className="flex-col justify-center items-center w-full h-screen" 
      style={{
        backgroundImage: "url('/fondo.webp')",
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >
      <Navbar />
 
      <div className="relative z-10 flex flex-col justify-center items-center">
        <Bot size={50} color="black" />
        <div className="flex flex-col justify-center items-center mt-7 w-full max-w-4xl py-3">
          <TextAnimate 
            animation="blurInUp" 
            by="character" 
            className="text-white text-4xl font-extrabold text-center mb-4 leading-tight sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl"
          >
            En que puedo Ayudarte?
          </TextAnimate>
          <InteractiveForm />
        </div>
      </div>
    </div>
  );
}
