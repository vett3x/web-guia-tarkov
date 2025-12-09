import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Map, ScrollText, Shield, Target, Crosshair, BookOpen, Sword, Armchair, ChevronRight, LogIn, User, AlertCircle } from "lucide-react";
import { CardTematica } from "@/components/card-tematica";
import { HeroSection } from "@/components/hero-section";
import { ThemedContainer } from "@/components/themed-container";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SocialsSection } from "@/components/socials-section";
import { Badge } from "@/components/ui/badge";
import { PopularGuides } from "@/components/popular-guides";
import { TwitchStreams } from "@/components/twitch-streams";

export default function Home() {
  const featuredGuides = [
    {
      title: "Mapas y Extracciones",
      description: "Mapas interactivos con puntos de interés, rutas de extracción, loot hotspots y estrategias por mapa.",
      icon: Map,
      href: "/mapas",
      badge: "Esencial"
    },
    {
      title: "Encargos de Comerciantes",
      description: "Guía completa de todas las misiones con requisitos, recompensas y estrategias para completarlas eficientemente.",
      icon: ScrollText,
      href: "/misiones",
      badge: "Completo"
    },
    {
      title: "Guía de Comerciantes",
      description: "Análisis detallado de cada comerciante: repuación, items exclusivos y estrategias de nivelación.",
      icon: Shield,
      href: "/comerciantes",
      badge: "Actualizado"
    }
  ];

  const quickAccess = [
    { name: "Armas y Munición", icon: Sword, href: "#", color: "bg-red-500/10 text-red-600" },
    { name: "Equipamiento", icon: Armchair, href: "#", color: "bg-blue-500/10 text-blue-600" },
    { name: "Objetos de Intercambio", icon: BookOpen, href: "#", color: "bg-green-500/10 text-green-600" },
    { name: "Balística", icon: Target, href: "#", color: "bg-purple-500/10 text-purple-600" },
    { name: "Salud y Habilidades", icon: Crosshair, href: "#", color: "bg-orange-500/10 text-orange-600" },
    { name: "Escondite", icon: Shield, href: "#", color: "bg-cyan-500/10 text-cyan-600" },
  ];

  const gameUpdates = [
    {
      title: "Nueva Arena: Guía Completa",
      description: "Todo lo que necesitas saber sobre el nuevo modo Arena de Tarkov.",
      date: "Hace 3 días",
      tag: "Nuevo",
      color: "bg-green-500/10 text-green-600"
    },
    {
      title: "Parche 0.14.5.0 - Cambios de Balance",
      description: "Ajustes en armas, economía y mecánicas de juego.",
      date: "Hace 1 semana",
      tag: "Parche",
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      title: "Evento: The Contract Wars",
      description: "Participa en el evento limitado con recompensas exclusivas.",
      date: "Hace 2 semanas",
      tag: "Evento",
      color: "bg-purple-500/10 text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {/* BANNER DE PRUEBA */}
        <div className="mb-6 border-2 border-primary/30 bg-primary/10 p-4 rounded-none">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-bold text-primary">MODO DE PRUEBA ACTIVO</h3>
                <p className="text-sm text-primary/80">
                  Middleware deshabilitado. El dashboard es accesible sin autenticación.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                asChild
                variant="outline"
                className="border-primary/30 hover:bg-primary/10"
              >
                <Link href="/dashboard" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Acceder al Dashboard</span>
                </Link>
              </Button>
              <Button 
                asChild
                className="bg-primary hover:bg-primary/90"
              >
                <Link href="/login" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  <span>Probar Login</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* REDES SOCIALES PRIMERO - MÁS DESTACADO */}
        <div className="mb-12">
          <SocialsSection />
        </div>

        {/* TRANSMISIONES DE TWITCH */}
        <div className="mb-12">
          <TwitchStreams />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Columna Izquierda: Guías Destacadas y Acceso Rápido */}
          <div className="lg:col-span-2 space-y-8">
            <HeroSection />

            <ThemedContainer title="GUÍAS PRINCIPALES" className="border-2 border-primary/20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredGuides.map((guide) => (
                  <CardTematica 
                    key={guide.title}
                    title={guide.title}
                    description={guide.description}
                    icon={guide.icon}
                    href={guide.href}
                    badge={guide.badge}
                  />
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-border/50">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">¿Necesitas ayuda específica?</h4>
                    <p className="text-sm text-muted-foreground">
                      Explora nuestras guías especializadas por categoría
                    </p>
                  </div>
                  <Button variant="outline" className="border-primary/30 hover:bg-primary/10 group">
                    <span>Ver Todas las Categorías</span>
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </ThemedContainer>

            {/* Acceso Rápido */}
            <ThemedContainer title="ACCESO RÁPIDO" className="border-2 border-primary/20">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {quickAccess.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    className="group flex flex-col items-center justify-center p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:shadow-md transition-all duration-300 hover:scale-105"
                  >
                    <div className={`p-3 rounded-full ${item.color} mb-3 group-hover:scale-110 transition-transform`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium text-center text-foreground group-hover:text-primary">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </ThemedContainer>

            {/* Últimas Actualizaciones del Juego */}
            <ThemedContainer title="ACTUALIZACIONES DEL JUEGO" className="border-2 border-primary/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {gameUpdates.map((update) => (
                  <div 
                    key={update.title}
                    className="p-4 border border-border/50 rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={`${update.color} border-0`}>
                        {update.tag}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{update.date}</span>
                    </div>
                    <h4 className="font-bold text-primary mb-2">{update.title}</h4>
                    <p className="text-sm text-muted-foreground">{update.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-border/50 text-center">
                <Link href="#" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                  Ver historial completo de parches
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </ThemedContainer>
          </div>

          {/* Columna Derecha: Guías Populares y Stats */}
          <div className="space-y-8">
            <PopularGuides />
            
            <ThemedContainer title="ESTADÍSTICAS DE LA COMUNIDAD">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-primary/5 rounded border border-primary/10">
                  <span className="text-sm text-foreground">Usuarios activos hoy</span>
                  <span className="font-bold text-primary">2,847</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-primary/5 rounded border border-primary/10">
                  <span className="text-sm text-foreground">Guías consultadas</span>
                  <span className="font-bold text-primary">15,234</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-primary/5 rounded border border-primary/10">
                  <span className="text-sm text-foreground">Mapas vistos</span>
                  <span className="font-bold text-primary">8,912</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-primary/5 rounded border border-primary/10">
                  <span className="text-sm text-foreground">Miembros Discord</span>
                  <span className="font-bold text-primary">1,245</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-border/50">
                <p className="text-xs text-center text-muted-foreground">
                  Únete a nuestra comunidad en crecimiento
                </p>
              </div>
            </ThemedContainer>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}