import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hfjtksfqcmuebxfmbxgq.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmanRrc2ZxY211ZWJ4Zm1ieGdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyODYzNTksImV4cCI6MjA4MDg2MjM1OX0.38pVqlfbWYMjHfgwn_MKk6d6_Sa6SGMkwuYjtNbOmfU";

// Crear cliente con service role key para poder insertar en la tabla profiles
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    // Obtener la sesión del usuario desde las cookies
    const authHeader = request.headers.get('Authorization');
    
    // Si no hay Authorization header, intentar obtener la sesión de las cookies
    let userId: string | undefined;
    
    if (authHeader) {
      // Extraer token del header
      const token = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabase.auth.getUser(token);
      userId = user?.id;
    } else {
      // Intentar obtener la sesión de las cookies (para uso en el cliente)
      const cookieHeader = request.headers.get('cookie') || '';
      const supabaseWithCookies = createClient(supabaseUrl, supabaseServiceKey, {
        global: {
          headers: {
            Cookie: cookieHeader,
          },
        },
        auth: {
          persistSession: false,
        },
      });
      
      const { data: { session } } = await supabaseWithCookies.auth.getSession();
      userId = session?.user?.id;
    }
    
    if (!userId) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }
    
    // Verificar si el perfil ya existe
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .maybeSingle();
    
    if (existingProfile) {
      return NextResponse.json(
        { message: 'El perfil ya existe', profile: existingProfile },
        { status: 200 }
      );
    }
    
    // Obtener el email del usuario
    const { data: { user } } = await supabase.auth.getUser(userId);
    const userEmail = user?.email;
    
    if (!userEmail) {
      return NextResponse.json(
        { error: 'No se pudo obtener el email del usuario' },
        { status: 400 }
      );
    }
    
    // Crear el perfil
    const { data: newProfile, error } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        email: userEmail,
        username: userEmail.split('@')[0],
        role: 'user'
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error al crear perfil:', error);
      return NextResponse.json(
        { error: 'Error al crear el perfil', details: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'Perfil creado exitosamente', profile: newProfile },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error inesperado:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}