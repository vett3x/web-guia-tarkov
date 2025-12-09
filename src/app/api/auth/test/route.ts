import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hfjtksfqcmuebxfmbxgq.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmanRrc2ZxY211ZWJ4Zm1ieGdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyODYzNTksImV4cCI6MjA4MDg2MjM1OX0.38pVqlfbWYMjHfgwn_MKk6d6_Sa6SGMkwuYjtNbOmfU";

export async function GET(request: NextRequest) {
  try {
    // Extraer token de autorización si existe
    const authHeader = request.headers.get('authorization');
    let token: string | undefined;
    
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
    
    // Crear cliente Supabase
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      },
    });
    
    // Obtener sesión
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      return NextResponse.json(
        { error: 'Error getting session', details: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      session: !!session,
      user: session?.user ? {
        id: session.user.id,
        email: session.user.email,
      } : null,
      timestamp: new Date().toISOString(),
      note: 'Esta API verifica el estado de autenticación'
    });
    
  } catch (error) {
    console.error('API auth test error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}