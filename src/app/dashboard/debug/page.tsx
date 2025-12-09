"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ThemedContainer } from '@/components/themed-container';
import { Button } from '@/components/ui/button';
import { Shield, RefreshCw, LogOut, User, Database } from 'lucide-react';

export default function DebugPage() {
  const { session, user, profile, isLoading, signOut } = useAuth();
  const router = useRouter();
  const [cookies, setCookies] = useState<string>('');
  const [localStorageData, setLocalStorageData] = useState<string>('');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
    
    // Capturar cookies para debugging (solo en cliente)
    setCookies(document.cookie);
    
    // Capturar localStorage para debugging
    const lsData: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes('supabase') || key?.includes('auth')) {
        lsData[key] = localStorage.getItem(key) || '';
      }
    }
    setLocalStorageData(JSON.stringify(lsData, null, 2));
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-primary">CARGANDO DEBUG INFO...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Redirigirá a login
  }

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleTestSession = async () => {
    const { data: { session: testSession } } = await fetch('/api/auth/test', {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json());
    
    alert(`Session test result: ${testSession ? 'Session exists' : 'No session'}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <ThemedContainer title="DEBUG - ESTADO DE AUTENTICACIÓN">
          <div className="space-y-6">
            {/* Estado actual */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-primary/30 p-4 rounded">
                <h3 className="text-lg font-bold text-primary mb-2 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  USUARIO
                </h3>
                <div className="space-y-2">
                  <p><strong>ID:</strong> {user?.id}</p>
                  <p><strong>Email:</strong> {user?.email}</p>
                  <p><strong>Session exists:</strong> {session ? '✅ Sí' : '❌ No'}</p>
                  <p><strong>Auth state:</strong> {user ? '✅ Autenticado' : '❌ No autenticado'}</p>
                </div>
              </div>
              
              <div className="border-2 border-blue-500/30 p-4 rounded">
                <h3 className="text-lg font-bold text-blue-500 mb-2 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  PERFIL
                </h3>
                <div className="space-y-2">
                  {profile ? (
                    <>
                      <p><strong>Username:</strong> {profile.username}</p>
                      <p><strong>Role:</strong> <span className="bg-primary/20 text-primary px-2 py-1 rounded">{profile.role}</span></p>
                      <p><strong>Created:</strong> {new Date(profile.created_at).toLocaleString()}</p>
                    </>
                  ) : (
                    <p className="text-yellow-500">❌ Perfil no encontrado en la base de datos</p>
                  )}
                </div>
              </div>
            </div>

            {/* Cookies y almacenamiento */}
            <div className="border-2 border-green-500/30 p-4 rounded">
              <h3 className="text-lg font-bold text-green-500 mb-2 flex items-center gap-2">
                <Database className="h-5 w-5" />
                ALMACENAMIENTO DEL NAVEGADOR
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold mb-2">Cookies:</h4>
                  <div className="bg-black/30 p-3 rounded font-mono text-xs max-h-40 overflow-y-auto">
                    {cookies || 'No cookies found'}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2">LocalStorage (auth):</h4>
                  <div className="bg-black/30 p-3 rounded font-mono text-xs max-h-40 overflow-y-auto">
                    {localStorageData || 'No auth data in localStorage'}
                  </div>
                </div>
              </div>
            </div>

            {/* Problemas comunes */}
            <div className="border-2 border-yellow-500/30 p-4 rounded">
              <h3 className="text-lg font-bold text-yellow-500 mb-2">PROBLEMAS COMUNES</h3>
              <ul className="space-y-2 text-sm">
                <li>✅ Si ves "Session exists: Sí" pero no puedes acceder a /dashboard, el problema está en el middleware</li>
                <li>✅ Si ves "Session exists: No" pero estás logueado, el problema está en las cookies</li>
                <li>✅ Si el perfil no existe, el dashboard lo creará automáticamente</li>
                <li>🔍 Revisa la consola del navegador (F12) para ver errores de red o de autenticación</li>
              </ul>
            </div>

            {/* Acciones */}
            <div className="flex flex-wrap gap-4">
              <Button onClick={handleRefresh} className="bg-primary hover:bg-primary/90">
                <RefreshCw className="mr-2 h-4 w-4" />
                Recargar Página
              </Button>
              
              <Button onClick={handleTestSession} variant="outline">
                Probar Sesión en API
              </Button>
              
              <Button onClick={signOut} variant="destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </Button>
            </div>

            {/* Información adicional */}
            <div className="text-sm text-muted-foreground">
              <p>🔧 Esta página es solo para debugging y no estará disponible en producción.</p>
              <p>🔧 Si el problema persiste, intenta:</p>
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>Limpiar cookies y localStorage</li>
                <li>Iniciar sesión nuevamente</li>
                <li>Revisar la consola del navegador para errores</li>
                <li>Verificar que las variables de entorno de Supabase estén configuradas correctamente</li>
              </ol>
            </div>
          </div>
        </ThemedContainer>
      </main>
      <Footer />
    </div>
  );
}