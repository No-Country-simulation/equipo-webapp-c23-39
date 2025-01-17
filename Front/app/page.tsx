

"use client";
import InteractiveForm from "./components/InteractiveForm";
import { TextAnimate } from "../components/ui/text-animate";
import { Bot } from "lucide-react";
import Navbar from "./components/navbar/Navbar";
import chatContentRef from "./components/InteractiveForm"
import { useRef } from "react";

export default function Home() {
  
  const chatContentRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTo({
        top: chatContentRef.current.scrollHeight,
        behavior: "smooth", // Suave desplazamiento
      });
    }
  };
  
  return (
    <div
      className="flex flex-col w-full h-screen"
      style={{
        backgroundImage: "url('/fondo-chat.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar />
      <div className="relative flex flex-col w-full h-full max-w-4xl mx-auto">
      
        <div className="flex flex-col items-center mb-4 mt-6">
          <Bot size={50} color="black" />
          <TextAnimate
            animation="blurInUp"
            by="character"
            className="text-white text-4xl font-extrabold text-center mt-4 leading-tight sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
          >
            ¿Que Lugar te Gustaria Visitar?
          </TextAnimate>
        </div>

     
        <div
          id="chat-content"
          ref={chatContentRef}
          className="flex-grow overflow-y-auto p-3 space-y-4 bg-opacity-60 bg-black rounded-lg"
        >
        
          <InteractiveForm />
        </div>
      </div>

    </div>
  );
}

