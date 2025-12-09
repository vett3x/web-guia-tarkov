import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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

  // Si hay sesión, verificar si tiene perfil (opcional, pero útil)
  if (session && isProtectedRoute) {
    // Podemos intentar obtener el perfil, pero si no existe, igual permitir el acceso
    // porque en el dashboard se puede crear.
    const { data: profile } = await supabase
      .from('profiles')
      .select('id, role')
      .eq('id', session.user.id)
      .maybeSingle()

    // Si no tiene perfil, podríamos redirigir a una página de creación de perfil,
    // pero por ahora dejamos que entre al dashboard y allí se maneje.
    // También podríamos crear el perfil automáticamente aquí, pero lo haremos en el dashboard.
  }

  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
}