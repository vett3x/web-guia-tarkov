import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  // Actualizar la sesión si es necesario
  const { data: { session } } = await supabase.auth.getSession();
  
  // Depuración: log en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.log('Middleware - Session:', session ? 'Present' : 'None');
    console.log('Middleware - Path:', request.nextUrl.pathname);
  }

  // Rutas protegidas
  const protectedRoutes = ['/dashboard'];
  const adminRoutes = ['/dashboard/users', '/dashboard/settings'];
  const moderatorRoutes = ['/dashboard/moderation', '/dashboard/reports'];
  const editorRoutes = ['/dashboard/editor', '/dashboard/articles'];

  const { pathname } = request.nextUrl;

  // Verificar si la ruta está protegida
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  const isModeratorRoute = moderatorRoutes.some(route => pathname.startsWith(route));
  const isEditorRoute = editorRoutes.some(route => pathname.startsWith(route));

  // Si no hay sesión y es una ruta protegida, redirigir a login
  if (!session && isProtectedRoute) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Middleware - No session, redirecting to login');
    }
    const redirectUrl = new URL('/login', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Si hay sesión, verificar roles para rutas específicas
  if (session) {
    // Obtener perfil del usuario
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .maybeSingle();

    // Depuración
    if (process.env.NODE_ENV === 'development') {
      console.log('Middleware - Profile:', profile);
      console.log('Middleware - Error:', error);
    }

    // Si hay error o no existe perfil, todavía permitir acceso a rutas básicas
    // (el dashboard se encargará de crear el perfil si es necesario)
    if (error || !profile) {
      // Si es una ruta que requiere un rol específico, redirigir al dashboard
      if (isAdminRoute || isModeratorRoute || isEditorRoute) {
        const redirectUrl = new URL('/dashboard', request.url);
        return NextResponse.redirect(redirectUrl);
      }
      // Para otras rutas protegidas (como /dashboard), permitir acceso
      return res;
    }

    // Verificar permisos para rutas de admin
    if (isAdminRoute && profile.role !== 'superadmin') {
      const redirectUrl = new URL('/dashboard', request.url);
      return NextResponse.redirect(redirectUrl);
    }

    // Verificar permisos para rutas de moderador
    if (isModeratorRoute && !['superadmin', 'moderator'].includes(profile.role)) {
      const redirectUrl = new URL('/dashboard', request.url);
      return NextResponse.redirect(redirectUrl);
    }

    // Verificar permisos para rutas de editor
    if (isEditorRoute && !['superadmin', 'moderator', 'editor'].includes(profile.role)) {
      const redirectUrl = new URL('/dashboard', request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
};