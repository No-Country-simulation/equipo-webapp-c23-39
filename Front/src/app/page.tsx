import User from '@/components/User';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="p-4">
      
      
      {session?.user && (
        <>
          <h1 className="text-xl mb-4">
            Bienvenido de Nuevo {session.user.name}
          </h1>
          <Link
            className={buttonVariants({ variant: "default" })}
            href="/chat"
          >
            Ir al Chat
          </Link>
        </>
      )}
    </div>
  );
}