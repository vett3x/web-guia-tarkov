"use client";

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ThemedContainer } from '@/components/themed-container';

export function AuthForm() {
  const { session, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (session && !isLoading) {
      router.push('/dashboard');
    }
  }, [session, isLoading, router]);

  return (
    <ThemedContainer title="ACCESO" className="border-2 border-primary/30">
      <div className="p-6">
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
                button_label: 'INICIAR SESIÓN',
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
      </div>
    </ThemedContainer>
  );
}