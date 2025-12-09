"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ThemedContainer } from '@/components/themed-container';
import { 
  Shield, Users, FileText, Settings, BarChart, 
  AlertTriangle, Edit, Eye, Globe, Database,
  Activity, Cpu, Zap, Server, Network, Terminal,
  UserPlus, RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function DashboardPage() {
  const { user, profile, isLoading, signOut } = useAuth();
  const [creatingProfile, setCreatingProfile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const handleCreateProfile = async () => {
    if (!user) return;
    
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
        // Recargar la página para actualizar el perfil
        window.location.reload();
      } else {
        toast.error(data.error || 'Error al crear el perfil');
      }
    } catch (error) {
      toast.error('Error de conexión');
    } finally {
      setCreatingProfile(false);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-primary">CARGANDO SISTEMA...</p>
        </div>
      </div>
    );
  }

  const getWelcomeMessage = () => {
    if (profile?.role === 'superadmin') return "COMANDANTE, BIENVENIDO AL SISTEMA DE CONTROL";
    if (profile?.role === 'moderator') return "MODERADOR, SISTEMA DE GESTIÓN DE CONTENIDO";
    if (profile?.role === 'editor') return "EDITOR, PANEL DE CREACIÓN DE CONTENIDO";
    return "USUARIO, PANEL DE CONTROL";
  };

  const getRoleColor = () => {
    if (profile?.role === 'superadmin') return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
    if (profile?.role === 'moderator') return "bg-blue-500/20 text-blue-500 border-blue-500/30";
    if (profile?.role === 'editor') return "bg-green-500/20 text-green-500 border-green-500/30";
    return "bg-primary/20 text-primary border-primary/30";
  };

  const superAdminModules = [
    { icon: Users, title: "Gestión de Usuarios", description: "Administra todos los usuarios del sistema", href: "/dashboard/users", color: "bg-yellow-500/10" },
    { icon: Database, title: "Base de Datos", description: "Acceso completo a la base de datos", href: "/dashboard/database", color: "bg-purple-500/10" },
    { icon: Server, title: "Servidores", description: "Monitoreo y control de servidores", href: "/dashboard/servers", color: "bg-red-500/10" },
    { icon: Settings, title: "Configuración", description: "Configuración avanzada del sistema", href: "/dashboard/settings", color: "bg-gray-500/10" },
  ];

  const moderatorModules = [
    { icon: Eye, title: "Moderación", description: "Revisa y modera contenido", href: "/dashboard/moderation", color: "bg-blue-500/10" },
    { icon: AlertTriangle, title: "Reportes", description: "Gestión de reportes y problemas", href: "/dashboard/reports", color: "bg-orange-500/10" },
    { icon: Users, title: "Comunidad", description: "Gestión de la comunidad", href: "/dashboard/community", color: "bg-teal-500/10" },
  ];

  const editorModules = [
    { icon: Edit, title: "Editor", description: "Crea y edita contenido", href: "/dashboard/editor", color: "bg-green-500/10" },
    { icon: FileText, title: "Artículos", description: "Gestión de artículos", href: "/dashboard/articles", color: "bg-emerald-500/10" },
    { icon: Globe, title: "Contenido", description: "Todo el contenido disponible", href: "/dashboard/content", color: "bg-cyan-500/10" },
  ];

  const userModules = [
    { icon: Activity, title: "Actividad", description: "Tu actividad reciente", href: "/dashboard/activity", color: "bg-primary/10" },
    { icon: FileText, title: "Favoritos", description: "Contenido guardado", href: "/dashboard/favorites", color: "bg-pink-500/10" },
    { icon: Settings, title: "Perfil", description: "Configura tu perfil", href: "/dashboard/profile", color: "bg-gray-500/10" },
  ];

  const systemStats = [
    { label: "Usuarios activos", value: "1,247", icon: Users, change: "+12%" },
    { label: "Artículos publicados", value: "892", icon: FileText, change: "+5%" },
    { label: "Visitas hoy", value: "3,458", icon: Activity, change: "+8%" },
    { label: "Sistema", value: "ONLINE", icon: Cpu, change: "100%" },
  ];

  const renderModules = () => {
    const modules = [];
    if (profile?.role === 'superadmin') modules.push(...superAdminModules);
    if (profile?.role === 'moderator' || profile?.role === 'superadmin') modules.push(...moderatorModules);
    if (profile?.role === 'editor' || profile?.role === 'moderator' || profile?.role === 'superadmin') modules.push(...editorModules);
    modules.push(...userModules);
    
    // Eliminar duplicados por href
    const uniqueModules = Array.from(new Map(modules.map(m => [m.href, m])).values());
    
    return uniqueModules;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Header del dashboard */}
        <div className="mb-8">
          <div className={`border-2 ${getRoleColor()} p-6 rounded-none mb-4`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold uppercase tracking-wider">
                  {getWelcomeMessage()}
                </h1>
                <p className="text-muted-foreground mt-2">
                  Sistema: OPERATIVO | Último acceso: Ahora | IP: Segura
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">IDENTIFICACIÓN</p>
                  <p className="font-bold text-primary">{profile?.username || user.email}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Si no hay perfil, mostrar alerta para crear uno */}
          {!profile && (
            <div className="border-2 border-primary/30 bg-primary/10 p-6 rounded-none mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">PERFIL NO ENCONTRADO</h3>
                  <p className="text-primary/80">
                    Necesitas crear un perfil para acceder a todas las funcionalidades del sistema.
                  </p>
                </div>
                <Button 
                  onClick={handleCreateProfile} 
                  disabled={creatingProfile}
                  className="bg-primary hover:bg-primary/90"
                >
                  {creatingProfile ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      CREANDO...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      CREAR PERFIL
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Stats rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {systemStats.map((stat, index) => (
              <Card key={index} className="border border-border/50 bg-black/20 rounded-none">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-primary">{stat.value}</p>
                      <p className="text-xs text-green-500">{stat.change}</p>
                    </div>
                    <div className="p-2 bg-primary/10 rounded">
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Módulos disponibles */}
        <ThemedContainer title="MÓDULOS DISPONIBLES" className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderModules().map((module, index) => (
              <Card 
                key={index} 
                className={`border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer ${module.color}`}
                onClick={() => router.push(module.href)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-primary">{module.title}</CardTitle>
                    <module.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">
                    ACCEDER
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </ThemedContainer>

        {/* Sistema y actividad */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Estado del sistema */}
          <ThemedContainer title="ESTADO DEL SISTEMA">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-green-500/20 bg-green-500/5">
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-green-500" />
                  <span>Sistema Principal</span>
                </div>
                <span className="text-green-500 font-bold">OPERATIVO</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-blue-500/20 bg-blue-500/5">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-blue-500" />
                  <span>Base de Datos</span>
                </div>
                <span className="text-blue-500 font-bold">CONECTADO</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-yellow-500/20 bg-yellow-500/5">
                <div className="flex items-center gap-3">
                  <Network className="h-5 w-5 text-yellow-500" />
                  <span>Red</span>
                </div>
                <span className="text-yellow-500 font-bold">ESTABLE</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-primary/20 bg-primary/5">
                <div className="flex items-center gap-3">
                  <Terminal className="h-5 w-5 text-primary" />
                  <span>API</span>
                </div>
                <span className="text-primary font-bold">ACTIVO</span>
              </div>
            </div>
          </ThemedContainer>

          {/* Actividad reciente */}
          <ThemedContainer title="ACTIVIDAD RECIENTE">
            <div className="space-y-4">
              <div className="p-3 border border-border/50">
                <p className="text-sm text-muted-foreground">Hace 2 minutos</p>
                <p className="text-primary">Sesión iniciada desde IP segura</p>
              </div>
              <div className="p-3 border border-border/50">
                <p className="text-sm text-muted-foreground">Hace 1 hora</p>
                <p className="text-primary">Acceso al panel de control</p>
              </div>
              <div className="p-3 border border-border/50">
                <p className="text-sm text-muted-foreground">Hoy, 08:30</p>
                <p className="text-primary">Actualización del sistema completada</p>
              </div>
            </div>
          </ThemedContainer>
        </div>
      </main>
      <Footer />
    </div>
  );
}