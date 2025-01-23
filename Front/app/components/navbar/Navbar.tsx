'use client';
import Link from "next/link";
import { Bot, Send} from 'lucide-react'
import Image from "next/image";


export default function Navbar() {

  return (
    <nav className="w-full flex text-white  bg-opacity-30 p-2">
        <Link href={'/'} className="flex items-center">  
        <div className="absolute top-0 left-0 p-2">
          <Image
                  src="/Logo.png" 
                  alt="Descripción de la imagen"
                  width={85} 
                  height={85} 
                  
                  />
        </div>
        </Link>
    </nav>
  )
}
