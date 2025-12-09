import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hfjtksfqcmuebxfmbxgq.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmanRrc2ZxY211ZWJ4Zm1ieGdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyODYzNTksImV4cCI6MjA4MDg2MjM1OX0.38pVqlfbWYMjHfgwn_MKk6d6_Sa6SGMkwuYjtNbOmfU";

export async function GET(request: NextRequest) {
  try {
    // Crear cliente Supabase
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Obtener sesión de las cookies
    const cookieHeader = request.headers.get('cookie') || '';
    const supabaseWithCookies = createClient(supabaseUrl, supabaseKey, {
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
    
    return NextResponse.json({
      success: true,
      authenticated: !!session,
      session: session ? {
        user: {
          id: session.user.id,
          email: session.user.email,
        },
        expires_at: session.expires_at,
      } : null,
      middlewareWorking: true,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('API auth check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}