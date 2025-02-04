import Navbar from '../components/Navbar';
import { SessionProvider } from 'next-auth/react';
import Provider from '../components/Provider';
import '../styles/global.css'

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Migo Trip',
  description: 'A Next.js application that generates recomendation about your trip.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider>
        <main 
          style={{
            backgroundImage: "url('/pantalla-inicial.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat', 
          }}
          className='h-screen flex flex-col justify-center items-center'>
                   {children}
        </main>
        
        </Provider>
      </body>
    </html>
  );
}
