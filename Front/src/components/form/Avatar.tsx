"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export const Avatar = () => {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className="flex items-center gap-3 p-2">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={session.user.image || "/placeholder.svg"} // Imagen del usuario
            alt={session.user.name || "User"}
            fill
            className="object-cover"
          />
        </div>
        <span className="text-white font-medium">
          {session.user.name || session.user.email}
        </span>
        <Button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          Cerrar sesión
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => signIn()}
      className="bg-blue-500 hover:bg-blue-600 text-white"
    >
      Iniciar sesión
    </Button>
  );
};