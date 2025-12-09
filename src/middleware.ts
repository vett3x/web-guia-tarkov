import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Para pruebas: Permitir acceso a todas las rutas sin verificación de autenticación
  // Esto es solo temporal para verificar que el dashboard funciona
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Middleware - Modo prueba: Permitiendo acceso sin autenticación');
    console.log('Middleware - Path:', request.nextUrl.pathname);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
};