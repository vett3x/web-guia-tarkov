"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ThemedContainer } from '@/components/themed-container';
import { 
  Shield, Users, FileText, Settings, 
  LogOut, User, AlertCircle, CheckCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { user, profile, isLoading, signOut } = useAuth();
  const router = useRouter();
  const [localAuthState, setLocalAuthState] = useState<any>(null);

  useEffect(() => {
    // Verificar estado de autenticación local
    const checkAuth = async () => {
      const sessionData = localStorage.getItem('supabase.auth.token');
      setLocalAuthState(sessionData ? JSON.parse(sessionData) : null);
      
      console.log('Dashboard - Auth state:', {
        user: user,
        profile: profile,
        isLoading: isLoading,
        localStorage: sessionData ? 'Present' : 'None'
      });
    };
    
    checkAuth();
  }, [user, profile, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-primary">CARGANDO PANEL...</p>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleCreateProfile = async () => {
    try {
      const response = await fetch('/api/profile/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Perfil creado exitosamente. Recargando...');
        window.location.reload();
      } else {
        alert('Error: ' + (data.error || 'Error desconocido'));
      }
    } catch (error) {
      alert('Error de conexión');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Header del dashboard */}
        <div className="mb-8">
          <div className="border-2 border-primary/30 p-6 rounded-none mb-4 bg-primary/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold uppercase tracking-wider text-primary">
                  PANEL DE CONTROL - MODO PRUEBA
                </h1>
                <p className="text-muted-foreground mt-2">
                  Middleware deshabilitado para pruebas. En producción, se requiere autenticación.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">ESTADO ACTUAL</p>
                  <p className="font-bold text-primary">MODO PRUEBA ACTIVO</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-500/30">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Estado de autenticación */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ThemedContainer title="ESTADO DE AUTENTICACIÓN">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Usuario en AuthContext:</span>
                  <span className={user ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
                    {user ? '✅ CONECTADO' : '❌ NO CONECTADO'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Perfil en base de datos:</span>
                  <span className={profile ? "text-green-500 font-bold" : "text-yellow-500 font-bold"}>
                    {profile ? '✅ ENCONTRADO' : '⚠️ NO ENCONTRADO'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Sesión en localStorage:</span>
                  <span className={localAuthState ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
                    {localAuthState ? '✅ PRESENTE' : '❌ AUSENTE'}
                  </span>
                </div>
                
                {user && (
                  <div className="mt-4 p-3 border border-primary/20 rounded bg-primary/5">
                    <p className="text-sm text-primary"><strong>Email:</strong> {user.email}</p>
                    <p className="text-sm text-primary"><strong>ID:</strong> {user.id}</p>
                  </div>
                )}
              </div>
            </ThemedContainer>

            <ThemedContainer title="ACCIONES RÁPIDAS">
              <div className="space-y-3">
                {!profile && user && (
                  <Button 
                    onClick={handleCreateProfile}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Crear Perfil en Base de Datos
                  </Button>
                )}
                
                <Button 
                  onClick={handleSignOut}
                  variant="outline"
                  className="w-full border-red-500/30 hover:bg-red-500/10"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </Button>
                
                <Button 
                  onClick={() => router.push('/')}
                  variant="outline"
                  className="w-full"
                >
                  Volver al Inicio
                </Button>
                
                <Button 
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="w-full"
                >
                  Recargar Página
                </Button>
              </div>
            </ThemedContainer>
          </div>
        </div>

        {/* Módulos básicos */}
        <ThemedContainer title="MÓDULOS DISPONIBLES" className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Módulo de Perfil */}
            <div className="border border-border/50 rounded-lg p-4 hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-primary">Perfil de Usuario</h3>
                  <p className="text-sm text-muted-foreground">Gestiona tu información personal</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Configurar Perfil
              </Button>
            </div>

            {/* Módulo de Contenido */}
            <div className="border border-border/50 rounded-lg p-4 hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-primary">Contenido</h3>
                  <p className="text-sm text-muted-foreground">Guías y artículos</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Explorar Contenido
              </Button>
            </div>

            {/* Módulo de Configuración */}
            <div className="border border-border/50 rounded-lg p-4 hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Settings className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-bold text-primary">Configuración</h3>
                  <p className="text-sm text-muted-foreground">Ajustes del sistema</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Configurar Sistema
              </Button>
            </div>
          </div>
        </ThemedContainer>

        {/* Información del sistema */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ThemedContainer title="INFORMACIÓN DEL SISTEMA">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Modo de seguridad:</span>
                <span className="text-yellow-500 font-bold">DESACTIVADO (pruebas)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Middleware:</span>
                <span className="text-yellow-500 font-bold">PERMITIENDO TODO</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Autenticación:</span>
                <span className={user ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
                  {user ? 'ACTIVA' : 'INACTIVA'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Base de datos:</span>
                <span className="text-green-500 font-bold">CONECTADA</span>
              </div>
            </div>
          </ThemedContainer>

          <ThemedContainer title="PRÓXIMOS PASOS">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-bold text-primary">1. Verificar acceso al dashboard</p>
                  <p className="text-sm text-muted-foreground">Debes poder ver esta página sin redirección a login</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full border border-primary mt-0.5"></div>
                <div>
                  <p className="font-bold text-primary">2. Iniciar sesión con Supabase</p>
                  <p className="text-sm text-muted-foreground">Usa el botón de login en la navbar</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full border border-primary mt-0.5"></div>
                <div>
                  <p className="font-bold text-primary">3. Crear perfil en base de datos</p>
                  <p className="text-sm text-muted-foreground">Usa el botón "Crear Perfil" arriba</p>
                </div>
              </div>
            </div>
          </ThemedContainer>
        </div>

        {/* Nota de seguridad */}
        <div className="mt-8 border-2 border-yellow-500/30 bg-yellow-500/10 p-4 rounded-none">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-yellow-500 mb-2">⚠️ MODO DE PRUEBA ACTIVADO</h4>
              <p className="text-yellow-500/90 text-sm">
                El middleware de seguridad está deshabilitado para permitir pruebas. En un entorno de producción real:
              </p>
              <ul className="list-disc pl-5 mt-2 text-sm text-yellow-500/90 space-y-1">
                <li>Restaurar el middleware completo con verificación de sesión</li>
                <li>Habilitar políticas de seguridad (RLS en Supabase)</li>
                <li>Configurar variables de entorno adecuadas</li>
                <li>Implementar HTTPS y cookies seguras</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}