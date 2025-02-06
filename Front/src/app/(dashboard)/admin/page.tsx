import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

const Page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (session?.user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <h1 className="text-4xl font-bold mb-4">
          Bienvenido a Migo Trip, {session?.user.username || session.user.name}!
        </h1>
        <p className="text-lg mb-8">
          Explora y descubre nuevos lugares con nosotros.
        </p>
        <Link
          href="/chat" 
          className="bg-gradient-to-b from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Get Started
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h2 className="text-2xl">Porfavor Inicia Session para tener una Aventura con Migo Trip</h2>
      <Link
        href="/login" 
        className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold mt-4 hover:bg-gray-100 transition-colors"
      >
        Login
      </Link>
    </div>
  );
};

export default Page;
