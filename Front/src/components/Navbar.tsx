"use client"; // Marca el componente como de cliente

import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { HandMetal } from 'lucide-react';
import { signOut } from 'next-auth/react';
import UserAccountnav from './UserAccountnav';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; // Importa usePathname
import { useSession } from 'next-auth/react'; // Importa useSession


const Navbar = () => {
  const pathname = usePathname(); // Obtiene la ruta actual
  const { data: session } = useSession(); // Obtiene la sesión del usuario

  // Si la ruta no es /chat, no renderices el Navbar
  if (pathname !== "/chat") {
    return null;
  }

  return (
    <div 
      className='bg-opacity-30  fixed w-full z-10 top-0'
      // style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
    >
      <div className='container flex items-center justify-between'>
        <Link href='/'>
        <div className="absolute top-0 left-0 p-2">
          <Image
                  src="/Logo.png" 
                  alt="Descripción de la imagen"
                  width={85} 
                  height={85} 
                  
                  />
        </div>
        </Link>
        {session?.user ?(
          <UserAccountnav />
        ) : (
          <Link className={buttonVariants()} href='/sign-in'>
            Sign in
          </Link>  
        )}
      </div>
    </div>
  );
};

export default Navbar;