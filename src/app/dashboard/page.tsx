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
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function DashboardPage() {
  const { user, profile, isLoading, signOut } = useAuth();
  const router = useRouter();
  const [creatingProfile, setCreatingProfile] = useState(false);
  const [localAuthState, setLocalAuthState] = useState<any>(null);

  useEffect(() => {
    // Verificar estado de autenticación local
    const sessionData = localStorage.getItem('supabase.auth.token');
    setLocalAuthState(sessionData ? JSON.parse(sessionData) : null);
    
    console.log('Dashboard - Auth state:', {
      user: user,
      profile: profile,
      isLoading: isLoading,
      localStorage: sessionData ? 'Present' : 'None'
    });

    // Si el usuario está autenticado pero no tiene perfil, intentar crearlo automáticamente
    if (user && !profile && !isLoading) {
      createProfileAutomatically();
    }
  }, [user, profile, isLoading]);

  const createProfileAutomatically = async () => {
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
        // Recargar la página para actualizar el estado
        window.location.reload();
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

  // Si no hay usuario (aunque el middleware debería redirigir), mostrar mensaje
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-primary mb-2">No autenticado</h1>
          <p className="text-muted-foreground mb-4">Debes iniciar sesión para acceder al dashboard</p>
          <Button onClick={() => router.push('/login')}>
            Ir a Login
          </Button>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleManualCreateProfile = async () => {
    await createProfileAutomatically();
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

          {/* Estado de autenticación */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ThemedContainer title="ESTADO DE AUTENTICACIÓN">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Usuario:</span>
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
                  <span className="text-foreground">Sesión en localStorage:</span>
                  <span className={localAuthState ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
                    {localAuthState ? '✅ PRESENTE' : '❌ AUSENTE'}
                  </span>
                </div>
                
                <div className="mt-4 p-3 border border-primary/20 rounded bg-primary/5">
                  <p className="text-sm text-primary"><strong>Email:</strong> {user.email}</p>
                  <p className="text-sm text-primary"><strong>ID:</strong> {user.id}</p>
                  {profile && (
                    <>
                      <p className="text-sm text-primary"><strong>Username:</strong> {profile.username}</p>
                      <p className="text-sm text-primary"><strong>Rol:</strong> {profile.role}</p>
                    </>
                  )}
                </div>
              </div>
            </ThemedContainer>

            <ThemedContainer title="ACCIONES RÁPIDAS">
              <div className="space-y-3">
                {!profile && (
                  <Button 
                    onClick={handleManualCreateProfile}
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

        {/* Información del sistema */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ThemedContainer title="INFORMACIÓN DEL SISTEMA">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Modo de seguridad:</span>
                <span className="text-green-500 font-bold">ACTIVADO</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Middleware:</span>
                <span className="text-green-500 font-bold">VERIFICANDO SESIÓN</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Autenticación:</span>
                <span className="text-green-500 font-bold">ACTIVA</span>
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
                  <p className="font-bold text-primary">1. Acceso al dashboard verificado</p>
                  <p className="text-sm text-muted-foreground">Middleware activo y funcionando</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className={`h-5 w-5 rounded-full mt-0.5 ${profile ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <div>
                  <p className="font-bold text-primary">2. Perfil en base de datos</p>
                  <p className="text-sm text-muted-foreground">
                    {profile ? 'Perfil encontrado' : 'Crear perfil para acceder a todas las funciones'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full border border-primary mt-0.5"></div>
                <div>
                  <p className="font-bold text-primary">3. Explorar funciones</p>
                  <p className="text-sm text-muted-foreground">Una vez creado el perfil, podrás usar todos los módulos</p>
                </div>
              </div>
            </div>
          </ThemedContainer>
        </div>

        {/* Nota sobre el trigger de Supabase */}
        {!profile && (
          <div className="mt-8 border-2 border-yellow-500/30 bg-yellow-500/10 p-4 rounded-none">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-yellow-500 mb-2">⚠️ PERFIL NO ENCONTRADO</h4>
                <p className="text-yellow-500/90 text-sm">
                  El trigger automático de creación de perfiles en Supabase podría no estar funcionando.
                  Usa el botón "Crear Perfil en Base de Datos" para crear tu perfil manualmente.
                </p>
                <p className="text-yellow-500/90 text-sm mt-2">
                  En producción, el trigger debería crear el perfil automáticamente al registrarse.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}