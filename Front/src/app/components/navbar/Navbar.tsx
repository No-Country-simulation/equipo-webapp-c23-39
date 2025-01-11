'use client';
import Link from "next/link";
import { Bot, Send, Menu, Settings } from 'lucide-react'


const navItems = [
  {path: '/about', text: 'About'},
  {path: '/pricing', text: 'Pricing'},
  {path: '/contact', text: 'Contact'},
]

export default function Navbar() {

  return (
    <nav className="flex bg-white bg-opacity-30 p-2 m-2 rounded">
        <Link href={'/'} className="flex items-center">  
        <Bot className="h-6 w-6" />
          <span>Asistente de Viajes AI</span>
        </Link>
        <div className="flex flex-1"></div>
        
       
     
    </nav>
  )
}
