'use client';
import Link from "next/link";
import { Bot, Send} from 'lucide-react'


export default function Navbar() {

  return (
    <nav className="w-full flex bg-white bg-opacity-30 p-2">
        <Link href={'/'} className="flex items-center">  
        
        <Bot size={30} color="black" />
        </Link>
        <div className="flex p-1"></div>
        <p className="font-extrabold">MigoTrip</p>
       
    </nav>
  )
}
