"use client";
import { useSession } from "next-auth/react";
import InteractiveForm from "@/components/InteractiveForm";
import { TextAnimate } from "@/components/ui/text-animate";
import { useRef } from "react";
import { Search, PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Avvvatars from 'avvvatars-react';
import UserAccountnav from '@/components/UserAccountnav';

export default function Chat() {
  const chatContentRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession(); // Obtén la sesión

  return (
    <div
      className="flex h-screen-chat"
      style={{
        backgroundImage: 'url("/fondo-chat.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
      }}
    >
      {/* Sidebar */}
      <div className="w-50 h-full bg-[#0C3257] bg-opacity-50 backdrop-blur-md p-3 flex flex-col gap-4">
        <div className="flex items-center gap-3 p-2">
          
           {/* Avatar del usuario */}
           <div className="relative">
            {session?.user?.image ? (
              <Avvvatars value={session?.user?.name || session?.user?.email || "Usuario"} size={48} style="character" />
            ) : (
              <Avvvatars value={session?.user?.name || session?.user?.email || "Usuario"} size={48} style="shape" />
            )}
            {/* Online status indicator */}
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#3F51B5] border-2 border-white rounded-full"></span>
          </div>
           
          <span className="text-white font-medium">{session?.user?.name}</span>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="BUSCAR..."
            className="pl-9 bg-[#1a1a2e] border-none text-white placeholder:text-gray-400"
          />
        </div>

        <Button
          className="flex items-center gap-2 w-full bg-[#1a1a2e] hover:bg-[#2a2a3e] text-white"
          variant="secondary"
        >
          <PenSquare className="w-4 h-4" />
          NUEVO CHAT
        </Button>
        <div className="flex justify-center items-center mb-4">
          <img
            src="/robot/migo-trip.png"
            alt="Robot"
            className="w-25 h-25 object-cover"
            style={{ position: "absolute", top: "0", marginTop: "260px" }}
          />
        <UserAccountnav />     
         
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-between p-4 relative">
        <div className="w-full max-w-4xl mx-auto mt-30">
        <Navbar />
          <TextAnimate
            animation="blurInUp"
            by="character"
            className="text-white text-4xl font-extrabold text-center mt-4 leading-tight sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
          >
            ¿En qué puedo ayudarte?
          </TextAnimate>

          <div
            className="w-full max-w-3xl mx-auto mb-8 bg-opacity-30 bg-black rounded-lg"
            style={{ marginTop: "100px" }}
          >
            <div className="relative mb-8">
              <InteractiveForm />
            </div>
          </div>

          <div className="ml-0 mt-4">
            <div
              id="chat-content"
              ref={chatContentRef}
              className="flex-grow 
                        overflow-y-auto 
                        p-3 space-y-4 
                        bg-opacity-60
                        max-h-[100vh] 
                        scrollbar-thin 
                        scrollbar-thumb-gray-600 
                        scrollbar-track-gray-800 
                        scrollbar-thumb-rounded-md"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client"
// import InteractiveForm from "@/components/InteractiveForm";
// import { TextAnimate } from "@/components/ui/text-animate";
// import { useState } from "react"
// import { Search, PenSquare} from "lucide-react"
// import chatContentRef from "@/components/InteractiveForm"
// import { useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Navbar from '@/components/Navbar';


// export default function Chat() {

//     const chatContentRef = useRef<HTMLDivElement>(null);
    
//     return (
      
//       <div className="flex h-screen-chat"
//       style={{
//         backgroundImage: 'url("/fondo-chat.jpeg")',
//         backgroundSize: 'cover', 
//         backgroundPosition: 'center', 
//         position: "absolute",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         zIndex: 0,
//       }}>
//         {/* Sidebar */}
       
//         <div className="w-50 h-full bg-[#0C3257]/80 backdrop-blur-md p-3 flex flex-col gap-4 ">
//           <div className=" flex items-center gap-3 p-2">
//         <Navbar />
//             {/* <Avatar>
//               <AvatarImage src="/placeholder.svg" />
//               <AvatarFallback>KA</AvatarFallback>
//             </Avatar> */}
  
         
//             <span className="text-white font-medium"></span>
//           </div>
  
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <Input
//               placeholder="BUSCAR..."
//               className="pl-9 bg-[#1a1a2e] border-none text-white placeholder:text-gray-400"
//             />
//           </div>
  
//           <Button className="flex items-center gap-2 w-full bg-[#1a1a2e] hover:bg-[#2a2a3e] text-white" variant="secondary">
//             <PenSquare className="w-4 h-4" />
//             NUEVO CHAT
//           </Button>
//           <div className="flex justify-center items-center mb-4">
//         <img
//           src="/robot/migo-trip.png" 
//           alt="Robot"
//           className="w-25 h-25 object-cover"
//           style={{ position: 'absolute', top: '0', marginTop: '260px' }}
//         />
//       </div>
//         </div>
  
//         {/* Main Content */}
//         <div
//           className="flex-1 flex flex-col items-center justify-between p-4 relative"
         
//         >

//           <div className="w-full max-w-4xl mx-auto mt-30">
//             <TextAnimate
//               animation="blurInUp"
//                by="character"
//                className="text-white text-4xl font-extrabold text-center mt-4 leading-tight sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
//              >
//                ¿Que Lugar te Gustaria Visitar?
//              </TextAnimate>
  
//              <div
//                 className="w-full max-w-3xl mx-auto mb-8 bg-opacity-30 bg-black rounded-lg"
//                 style={{ marginTop: '100px' }}
//               >
//                 <div className="relative mb-8">
//                   <InteractiveForm />
//                 </div>
//               </div>
  
//             <div className="ml-0 mt-4">
//           <div
//             id="chat-content"
//             ref={chatContentRef}
//              className="flex-grow 
//                         overflow-y-auto 
//                         p-3 space-y-4 
//                         bg-opacity-60
//                         max-h-[100vh] 
//                         scrollbar-thin 
//                         scrollbar-thumb-gray-600 
//                         scrollbar-track-gray-800 
//                         scrollbar-thumb-rounded-md
//                         "
//            >
//           </div>
//             </div>
  
//           </div>
//         </div>
//       </div>
//     )
//   }
  
  
  
  
  