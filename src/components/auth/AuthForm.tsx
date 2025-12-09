"use client";

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ThemedContainer } from '@/components/themed-container';
import { Shield, UserPlus, LogIn } from 'lucide-react';

export function AuthForm() {
  const { session, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (session && !isLoading) {
      router.push('/dashboard');
    }
  }, [session, isLoading, router]);

  return (
    <ThemedContainer title="ACCESO AL SISTEMA" className="max-w-md mx-auto border-2 border-primary/30">
      <div className="p-6 space-y-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">CONTROL TÁCTICO</h2>
          <p className="text-sm text-muted-foreground">
            Acceso exclusivo para personal autorizado
          </p>
        </div>

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'hsl(80, 70%, 50%)',
                  brandAccent: 'hsl(80, 80%, 55%)',
                  inputBackground: 'hsl(80, 10%, 18%)',
                  inputBorder: 'hsl(80, 10%, 20%)',
                  inputText: 'hsl(80, 10%, 90%)',
                  inputPlaceholder: 'hsl(80, 10%, 70%)',
                },
              },
            },
            className: {
              container: 'space-y-4',
              button: 'bg-primary text-primary-foreground font-bold uppercase tracking-wider hover:bg-primary/90',
              input: 'bg-black/30 border-border/50 rounded-none font-mono',
              label: 'text-primary font-bold text-sm uppercase tracking-wider',
              message: 'text-sm',
              anchor: 'text-primary hover:text-primary/80 underline',
            },
          }}
          theme="dark"
          providers={[]}
          localization={{
            variables: {
              sign_in: {
                email_label: 'EMAIL',
                password_label: 'CONTRASEÑA',
                button_label: 'ACCEDER',
                loading_button_label: 'ACCEDIENDO...',
                link_text: '¿Ya tienes cuenta? Accede aquí',
              },
              sign_up: {
                email_label: 'EMAIL',
                password_label: 'CONTRASEÑA',
                button_label: 'REGISTRARSE',
                loading_button_label: 'REGISTRANDO...',
                link_text: '¿No tienes cuenta? Regístrate aquí',
              },
            },
          }}
          view="sign_in"
        />

        <div className="border-t border-border/50 pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 border border-primary/20 rounded hover:bg-primary/5 transition-colors">
              <UserPlus className="h-5 w-5 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Registro nuevo usuario</p>
            </div>
            <div className="text-center p-3 border border-primary/20 rounded hover:bg-primary/5 transition-colors">
              <LogIn className="h-5 w-5 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Acceso rápido</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Solo personal autorizado. Todas las actividades son monitoreadas.
          </p>
        </div>
      </div>
    </ThemedContainer>
  );
}