import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Crear cliente de Supabase para middleware (sin necesidad de auth-helpers)
const createMiddlewareSupabaseClient = (req: NextRequest) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hfjtksfqcmuebxfmbxgq.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmanRrc2ZxY211ZWJ4Zm1ieGdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyODYzNTksImV4cCI6MjA4MDg2MjM1OX0.38pVqlfbWYMjHfgwn_MKk6d6_Sa6SGMkwuYjtNbOmfU";

  // Obtener la sesión de las cookies
  const cookieHeader = req.headers.get('cookie') || '';
  
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Cookie: cookieHeader,
      },
    },
    auth: {
      persistSession: false,
    },
  });
};

export async function middleware(request: NextRequest) {
  const supabase = createMiddlewareSupabaseClient(request);
  
  // Obtener sesión
  const { data: { session } } = await supabase.auth.getSession();
  
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

    // Si hay error o no existe perfil, todavía permitir acceso a rutas básicas
    // (el dashboard debería manejar la creación del perfil si es necesario)
    if (error || !profile) {
      // Si es una ruta que requiere un rol específico, redirigir al dashboard
      if (isAdminRoute || isModeratorRoute || isEditorRoute) {
        const redirectUrl = new URL('/dashboard', request.url);
        return NextResponse.redirect(redirectUrl);
      }
      // Para otras rutas protegidas (como /dashboard), permitir acceso
      return NextResponse.next();
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

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
};