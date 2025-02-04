// middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Obtén la ruta solicitada
  const requestedPage = req.nextUrl.pathname;

  if (!session && requestedPage !== '/sign-in') {
    // Crea una URL de redirección a /sign-in con la ruta solicitada como parámetro
    const url = req.nextUrl.clone();
    url.pathname = '/sign-in';
    url.search = `p=${requestedPage}`; // Agrega la ruta solicitada como parámetro

    return NextResponse.redirect(url);
  }

  if (session && requestedPage === '/sign-in') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/', '/chat', '/admin'],
};