import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// Definición de rutas públicas y protegidas
const PUBLIC_ROUTES = ['/sign-in', '/sign-up'];
const PROTECTED_ROUTES = ['/admin', '/chat', '/'];

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const requestedPage = req.nextUrl.pathname;

  // Redirigir si el usuario no está autenticado y accede a una ruta protegida
  if (!session && PROTECTED_ROUTES.includes(requestedPage)) {
    const url = req.nextUrl.clone();
    url.pathname = '/sign-in';
    url.pathname = '/sign-up';
    url.searchParams.set('redirect', requestedPage); // Usar searchParams para mejor manejo de parámetros
    return NextResponse.redirect(url);
  }

  // Redirigir si el usuario está autenticado y trata de acceder a una ruta pública
  if (session && PUBLIC_ROUTES.includes(requestedPage)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Permitir el acceso a la ruta solicitada
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/chat', '/admin', '/sign-in', '/sign-up'], // Incluir todas las rutas relevantes
};