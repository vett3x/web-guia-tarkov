import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Map, ScrollText, Shield, Target, Crosshair, BookOpen, Sword, Armchair } from "lucide-react";
import { CardTematica } from "@/components/card-tematica";
import { HeroSection } from "@/components/hero-section";
import { ThemedContainer } from "@/components/themed-container";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SocialsSection } from "@/components/socials-section";
import { Badge } from "@/components/ui/badge";

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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        
        <HeroSection />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Columna Izquierda: Guías Destacadas */}
          <div className="lg:col-span-2 space-y-8">
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
                  <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                    Ver Todas las Categorías
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
          </div>

          {/* Columna Derecha: Redes Sociales y Actualizaciones */}
          <div className="space-y-8">
            <SocialsSection />
            
            <ThemedContainer title="ÚLTIMAS ACTUALIZACIONES">
              <div className="space-y-4">
                <div className="p-3 border border-border/50 rounded-lg hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">Nuevo</Badge>
                    <span className="text-xs text-muted-foreground">Hace 2 días</span>
                  </div>
                  <h5 className="font-semibold text-sm">Guía de Streets of Tarkov actualizada</h5>
                  <p className="text-xs text-muted-foreground mt-1">Nuevos puntos de loot y rutas añadidas</p>
                </div>
                
                <div className="p-3 border border-border/50 rounded-lg hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">Parche</Badge>
                    <span className="text-xs text-muted-foreground">Hace 1 semana</span>
                  </div>
                  <h5 className="font-semibold text-sm">Cambios en el mercado de Flea</h5>
                  <p className="text-xs text-muted-foreground mt-1">Nuevas restricciones y precios actualizados</p>
                </div>
                
                <div className="p-3 border border-border/50 rounded-lg hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">Meta</Badge>
                    <span className="text-xs text-muted-foreground">Hace 2 semanas</span>
                  </div>
                  <h5 className="font-semibold text-sm">Loadouts actuales para wipe</h5>
                  <p className="text-xs text-muted-foreground mt-1">Las mejores combinaciones de equipo para este parche</p>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-border/50">
                <Link href="#" className="text-sm text-primary hover:underline flex items-center gap-1">
                  Ver todas las actualizaciones →
                </Link>
              </div>
            </ThemedContainer>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}