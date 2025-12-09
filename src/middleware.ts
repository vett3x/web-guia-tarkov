import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Usar las mismas variables que ya están en el cliente de Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hfjtksfqcmuebxfmbxgq.supabase.co"
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmanRrc2ZxY211ZWJ4Zm1ieGdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyODYzNTksImV4cCI6MjA4MDg2MjM1OX0.38pVqlfbWYMjHfgwn_MKk6d6_Sa6SGMkwuYjtNbOmfU"

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables')
    // Si faltan variables, permitir acceso para no romper la aplicación en desarrollo
    // En producción, deberían estar definidas
    return response
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Actualizar la sesión de autenticación
  const { data: { session }, error } = await supabase.auth.getSession()

  if (error) {
    console.error('Error getting session in middleware:', error.message)
    // Si hay error, continuar sin sesión
  }

  // Rutas protegidas
  const protectedRoutes = ['/dashboard', '/dashboard/:path*']
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route.replace('/:path*', ''))
  )

  // Si no hay sesión y es una ruta protegida, redirigir a login
  if (!session && isProtectedRoute) {
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Si hay sesión y está en login, redirigir al dashboard
  if (session && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
  ],
}