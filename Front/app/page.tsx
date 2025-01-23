
"use client"
import InteractiveForm from "./components/InteractiveForm";
import { TextAnimate } from "../components/ui/text-animate";
import { useState } from "react"
import { Search, PenSquare, Send } from "lucide-react"
import Navbar from "./components/navbar/Navbar";
import { Bot } from "lucide-react";
import chatContentRef from "./components/InteractiveForm"
import { useRef } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  
  const chatContentRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="flex h-screen bg-[#1a1a2e]">
      {/* Sidebar */}
     
      <div className="w-72 bg-[#0f0f1a]/80 backdrop-blur-md p-4 flex flex-col gap-4">
        <div className="flex items-center gap-3 p-2">
          {/* <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>KA</AvatarFallback>
          </Avatar> */}

       
          <span className="text-white font-medium"></span>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="BUSCAR..."
            className="pl-9 bg-[#1a1a2e] border-none text-white placeholder:text-gray-400"
          />
        </div>

        <Button className="flex items-center gap-2 w-full bg-[#1a1a2e] hover:bg-[#2a2a3e] text-white" variant="secondary">
          <PenSquare className="w-4 h-4" />
          NUEVO CHAT
        </Button>
        <div className="flex justify-center items-center mb-4">
      <img
        src="/robot/migo-trip.png" 
        alt="Robot"
        className="w-25 h-30 object-cover"
        style={{ position: 'absolute', top: '0', marginTop: '299px' }}
      />
    </div>
      </div>

      {/* Main Content */}
      <div
        className="flex-1 flex flex-col items-center justify-between p-4 relative"
        style={{
          backgroundImage: `url("/fondo-chat.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-4xl mx-auto mt-20">
        <Navbar />
        <div className="flex flex-col items-center mb-4 mt-6">
          <TextAnimate
            animation="blurInUp"
             by="character"
             className="text-white text-4xl font-extrabold text-center mt-4 leading-tight sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
           >
             ¿Que Lugar te Gustaria Visitar?
           </TextAnimate>
           </div>
        </div>

        <div
          id="chat-content"
          ref={chatContentRef}
           className="flex-grow 
                      overflow-y-auto 
                      p-3 space-y-4 
                      bg-opacity-60
                      max-h-[500px] 
                      scrollbar-thin 
                      scrollbar-thumb-gray-600 
                      scrollbar-track-gray-800 
                      scrollbar-thumb-rounded-md
                      
                      "
         >
        </div>
        <div className="w-full max-w-3xl mx-auto mb-8 bg-opacity-60 bg-black rounded-lg ">
          <div  className="relative">
          <InteractiveForm />
           
          </div>
        </div>
      </div>
    </div>
  )
}




