'use client';
import Link from "next/link";
import { Bot, Send, Menu, Settings } from 'lucide-react'


export default function Navbar() {

  return (
    <nav className="w-full flex bg-white bg-opacity-30 p-2 m-2">
        <Link href={'/'} className="flex items-center">  
        <span>Migo Trip</span>
        <Bot className="h-6 w-6" />
        </Link>
        <div className="flex flex-1"></div>
        
       
     
    </nav>
  )
}
