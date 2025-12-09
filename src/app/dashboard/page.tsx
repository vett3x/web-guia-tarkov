"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ThemedContainer } from '@/components/themed-container';
import { 
  Shield, Users, FileText, Settings, 
  LogOut, User, AlertCircle, CheckCircle,
  Loader2, RefreshCw, Home, Database,
  Cookie, Key
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function DashboardPage() {
  const { user, profile, isLoading, signOut, refreshProfile } = useAuth();
  const router = useRouter();
  const [creatingProfile, setCreatingProfile] = useState(false);
  const [authCheck, setAuthCheck] = useState<any>(null);

  useEffect(() => {
    console.log('Dashboard - Auth state:', { user, profile, isLoading });
    
    // Verificar autenticación via API
    const checkApiAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        const data = await response.json();
        setAuthCheck(data);
        console.log('API Auth check:', data);
      } catch (error) {
        console.error('Error checking API auth:', error);
      }
    };
    
    if (!isLoading) {
      checkApiAuth();
    }
  }, [user, profile, isLoading]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleCreateProfile = async () => {
    if (!user) {
      toast.error('Debes iniciar sesión para crear un perfil');
      return;
    }

    setCreatingProfile(true);
    try {
      const response = await fetch('/api/profile/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success('Perfil creado exitosamente');
        await refreshProfile();
      } else {
        toast.error('Error al crear perfil: ' + (data.error || 'Error desconocido'));
      }
    } catch (error) {
      toast.error('Error de conexión al crear perfil');
      console.error('Error creating profile:', error);
    } finally {
      setCreatingProfile(false);
    }
  };

  const handleRefreshProfile = async () => {
    await refreshProfile();
    toast.info('Perfil actualizado');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-primary">VERIFICANDO AUTENTICACIÓN...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Este caso no debería ocurrir porque el middleware redirige, pero por si acaso
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-primary mb-2">No autenticado</h1>
          <p className="text-muted-foreground mb-4">Debes iniciar sesión para acceder al dashboard</p>
          <div className="space-x-4">
            <Button onClick={() => router.push('/login')}>
              Ir a Login
            </Button>
            <Button variant="outline" onClick={() => router.push('/')}>
              <Home className="mr-2 h-4 w-4" />
              Ir al Inicio
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
                  PANEL DE CONTROL
                </h1>
                <p className="text-muted-foreground mt-2">
                  Bienvenido al sistema de gestión de la guía de Tarkov
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">ESTADO</p>
                  <p className="font-bold text-primary">AUTENTICADO</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Estado de autenticación DETALLADO */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <ThemedContainer title="ESTADO DE AUTENTICACIÓN">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Usuario autenticado:</span>
                  <span className="text-green-500 font-bold">
                    ✅ CONECTADO
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Perfil en base de datos:</span>
                  <span className={profile ? "text-green-500 font-bold" : "text-yellow-500 font-bold"}>
                    {profile ? '✅ ENCONTRADO' : '⚠️ NO ENCONTRADO'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Middleware API Check:</span>
                  <span className={authCheck?.authenticated ? "text-green-500 font-bold" : "text-yellow-500 font-bold"}>
                    {authCheck ? (authCheck.authenticated ? '✅ OK' : '⚠️ NO SESSION') : '⏳ CHECKING...'}
                  </span>
                </div>
                
                <div className="mt-4 p-3 border border-primary/20 rounded bg-primary/5">
                  <p className="text-sm text-primary"><strong>Email:</strong> {user.email}</p>
                  <p className="text-sm text-primary"><strong>ID:</strong> {user.id}</p>
                  {profile && (
                    <>
                      <p className="text-sm text-primary"><strong>Username:</strong> {profile.username}</p>
                      <p className="text-sm text-primary"><strong>Rol:</strong> 
                        <span className="ml-2 bg-primary/20 text-primary px-2 py-1 rounded text-xs">
                          {profile.role.toUpperCase()}
                        </span>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </ThemedContainer>

            <ThemedContainer title="ACCIONES RÁPIDAS">
              <div className="space-y-3">
                {!profile ? (
                  <Button 
                    onClick={handleCreateProfile}
                    disabled={creatingProfile}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {creatingProfile ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creando Perfil...
                      </>
                    ) : (
                      <>
                        <User className="mr-2 h-4 w-4" />
                        Crear Perfil en Base de Datos
                      </>
                    )}
                  </Button>
                ) : (
                  <Button 
                    onClick={handleRefreshProfile}
                    variant="outline"
                    className="w-full"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Actualizar Perfil
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
                  <Home className="mr-2 h-4 w-4" />
                  Volver al Inicio
                </Button>
              </div>
            </ThemedContainer>

            <ThemedContainer title="INFORMACIÓN DEL SISTEMA">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-bold">Base de Datos</p>
                    <p className="text-xs text-muted-foreground">Conectada a Supabase</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Cookie className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm font-bold">Cookies</p>
                    <p className="text-xs text-muted-foreground">Sesión mantenida por cookies</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="text-sm font-bold">Middleware</p>
                    <p className="text-xs text-muted-foreground">Protegiendo rutas /dashboard</p>
                  </div>
                </div>
                
                {authCheck && (
                  <div className="mt-3 p-2 border border-border/50 rounded text-xs">
                    <p><strong>Última verificación:</strong> {new Date(authCheck.timestamp).toLocaleTimeString()}</p>
                    <p><strong>Middleware working:</strong> {authCheck.middlewareWorking ? '✅' : '❌'}</p>
                  </div>
                )}
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
              <Button variant="outline" size="sm" className="w-full" disabled={!profile}>
                {profile ? 'Configurar Perfil' : 'Crea tu perfil primero'}
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
              <Button variant="outline" size="sm" className="w-full" disabled={!profile}>
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
              <Button variant="outline" size="sm" className="w-full" disabled={!profile}>
                Configurar Sistema
              </Button>
            </div>
          </div>
        </ThemedContainer>

        {/* Nota informativa */}
        <div className="mt-8 border-2 border-blue-500/30 bg-blue-500/10 p-4 rounded-none">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-blue-500 mb-2">✅ SISTEMA DE AUTENTICACIÓN FUNCIONANDO</h4>
              <p className="text-blue-500/90 text-sm">
                Si puedes ver esta página, significa que el middleware te ha permitido el acceso porque estás autenticado.
                El sistema verifica tu sesión mediante cookies y protege las rutas /dashboard.
                {!profile && ' Ahora puedes crear tu perfil en la base de datos para acceder a todas las funciones.'}
              </p>
              {authCheck && !authCheck.authenticated && (
                <p className="text-yellow-500/90 text-sm mt-2">
                  ⚠️ Nota: La verificación API no detecta tu sesión, pero el cliente sí. Esto puede ser normal si las cookies
                  no se están pasando correctamente a la API, pero el middleware sí las está detectando.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}