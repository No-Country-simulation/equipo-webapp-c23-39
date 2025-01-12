import InteractiveForm from "./components/InteractiveForm";
import Particles from "../components/ui/particles";
import { TextAnimate } from "../components/ui/text-animate";
import { Bot } from "lucide-react";
import Navbar from "./components/navbar/Navbar";

export default function Home() {
  return (
    <div
      className="flex flex-col justify-between items-center w-full h-screen"
      style={{
        backgroundImage: "url('/fondo.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar />

      <div className="relative z-10 flex flex-col w-full h-full max-w-4xl px-4 py-6 overflow-y-auto">
        <div className="flex flex-col items-center mb-6">
          <Bot size={50} color="black" />
          <TextAnimate
            animation="blurInUp"
            by="character"
            className="text-white text-4xl font-extrabold text-center mt-4 leading-tight sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl"
          >
            ¿En qué puedo ayudarte?
          </TextAnimate>
        </div>

       
        <div
          id="chat-content"
          className="flex flex-col flex-grow space-y-4 overflow-y-auto"
        >
         
        </div>
        <InteractiveForm />
      </div>
    </div>
  );
}
