import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Create a Supabase client configured to use cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hfjtksfqcmuebxfmbxgq.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmanRrc2ZxY211ZWJ4Zm1ieGdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyODYzNTksImV4cCI6MjA4MDg2MjM1OX0.38pVqlfbWYMjHfgwn_MKk6d6_Sa6SGMkwuYjtNbOmfU",
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // IMPORTANTE: Actualizar la sesión de autenticación
  // Esto es necesario para que el middleware pueda leer la sesión correctamente
  const { data: { session }, error } = await supabase.auth.getSession();
  
  // Depuración: log en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.log('Middleware - Session exists:', !!session);
    console.log('Middleware - User ID:', session?.user?.id);
    console.log('Middleware - Path:', request.nextUrl.pathname);
    if (error) console.log('Middleware - Session error:', error.message);
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
    redirectUrl.searchParams.set('redirectedFrom', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Si hay sesión, verificar roles para rutas específicas
  if (session) {
    try {
      // Obtener perfil del usuario
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .maybeSingle();

      if (process.env.NODE_ENV === 'development') {
        console.log('Middleware - Profile found:', !!profile);
        console.log('Middleware - Profile role:', profile?.role);
      }

      // Si no existe perfil, permitir acceso al dashboard básico (allí se creará)
      if (profileError || !profile) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Middleware - No profile found, allowing basic dashboard access');
        }
        
        // Si es una ruta que requiere un rol específico, redirigir al dashboard básico
        if (isAdminRoute || isModeratorRoute || isEditorRoute) {
          const redirectUrl = new URL('/dashboard', request.url);
          return NextResponse.redirect(redirectUrl);
        }
        // Para otras rutas protegidas (como /dashboard), permitir acceso
        return response;
      }

      // Verificar permisos para rutas de admin
      if (isAdminRoute && profile.role !== 'superadmin') {
        if (process.env.NODE_ENV === 'development') {
          console.log('Middleware - Insufficient permissions for admin route');
        }
        const redirectUrl = new URL('/dashboard', request.url);
        return NextResponse.redirect(redirectUrl);
      }

      // Verificar permisos para rutas de moderador
      if (isModeratorRoute && !['superadmin', 'moderator'].includes(profile.role)) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Middleware - Insufficient permissions for moderator route');
        }
        const redirectUrl = new URL('/dashboard', request.url);
        return NextResponse.redirect(redirectUrl);
      }

      // Verificar permisos para rutas de editor
      if (isEditorRoute && !['superadmin', 'moderator', 'editor'].includes(profile.role)) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Middleware - Insufficient permissions for editor route');
        }
        const redirectUrl = new URL('/dashboard', request.url);
        return NextResponse.redirect(redirectUrl);
      }
    } catch (error) {
      console.error('Middleware error:', error);
      // En caso de error, permitir acceso al dashboard básico
      if (isAdminRoute || isModeratorRoute || isEditorRoute) {
        const redirectUrl = new URL('/dashboard', request.url);
        return NextResponse.redirect(redirectUrl);
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
};