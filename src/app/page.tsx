import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Map, ScrollText, Shield } from "lucide-react";
import { CardTematica } from "@/components/card-tematica";
import { HeroSection } from "@/components/hero-section";
import { ThemedContainer } from "@/components/themed-container";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SocialsSection } from "@/components/socials-section";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        
        <HeroSection />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Columna Izquierda: Navegación Principal */}
          <div className="lg:col-span-1 space-y-6">
            <ThemedContainer title="Navegación Principal">
              <div className="space-y-4">
                <CardTematica 
                  title="Mapas y Extracciones"
                  description="Conoce cada rincón, punto de interés y ruta de extracción segura."
                  icon={Map}
                  href="/mapas"
                />
                <CardTematica 
                  title="Encargos de Comerciantes"
                  description="Sigue las instrucciones de los Comerciantes para subir tu reputación."
                  icon={ScrollText}
                  href="/misiones"
                />
                <CardTematica 
                  title="Guía de Comerciantes"
                  description="Aprende qué vende cada Comerciante y cómo maximizar tu relación con ellos."
                  icon={Shield}
                  href="/comerciantes"
                />
              </div>
            </ThemedContainer>

            <ThemedContainer title="Comunidad y Recursos">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors flex items-center gap-2">Reglas de la Guía</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors flex items-center gap-2">Discord Oficial</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors flex items-center gap-2">Contribuir (GitHub)</Link></li>
              </ul>
            </ThemedContainer>
          </div>

          {/* Columna Central: Contenido Destacado (Simulación de categorías) */}
          <div className="lg:col-span-1 space-y-6">
            <ThemedContainer title="Básicos y Sistemas">
              <p className="text-sm text-muted-foreground mb-4">
                Accede a guías esenciales sobre mecánicas de juego, salud, habilidades y el escondite.
              </p>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="secondary" size="sm">Salud</Button>
                <Button variant="secondary" size="sm">Habilidades</Button>
                <Button variant="secondary" size="sm">Escondite</Button>
                <Button variant="secondary" size="sm">Looting</Button>
                <Button variant="secondary" size="sm">Comerciantes</Button>
                <Button variant="secondary" size="sm">Balística</Button>
              </div>
            </ThemedContainer>

            <ThemedContainer title="Equipo y Objetos">
              <p className="text-sm text-muted-foreground mb-4">
                Información detallada sobre armas, munición, armaduras y objetos de intercambio.
              </p>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="secondary" size="sm">Armas</Button>
                <Button variant="secondary" size="sm">Munición</Button>
                <Button variant="secondary" size="sm">Armaduras</Button>
                <Button variant="secondary" size="sm">Mochilas</Button>
                <Button variant="secondary" size="sm">Cascos</Button>
                <Button variant="secondary" size="sm">Intercambio</Button>
              </div>
            </ThemedContainer>
          </div>

          {/* Columna Derecha: Redes Sociales y Streams */}
          <div className="lg:col-span-1">
            <SocialsSection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}