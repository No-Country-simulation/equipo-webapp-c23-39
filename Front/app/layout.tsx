import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Migo-Trip",
  description: "A Next.js application that generates tweets based on user descriptions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
      className="bg-cover bg-center h-screen" 
      style={{ backgroundImage: 'url("/fondo-chat.jpeg")' }} // Cambia la ruta a tu imagen
      >
        {children}
      </body>
    </html>
  );
}
