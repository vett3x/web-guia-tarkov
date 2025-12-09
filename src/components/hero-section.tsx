import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Map, ScrollText, Crosshair } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-24 md:py-36 bg-secondary/30 border-b border-border overflow-hidden">
      {/* Patrón de fondo sutil para un toque táctico/grid */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5" style={{ 
        backgroundImage: 'repeating-linear-gradient(45deg, currentColor 1px, transparent 1px, transparent 10px)',
        backgroundSize: '20px 20px',
      }} />
      
      <div className="container relative z-10 text-center max-w-5xl mx-auto">
        <Crosshair className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse" />
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 text-foreground uppercase leading-none">
          Zona de Exclusión
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-primary">
          Guía Táctica de Tarkov (EFT)
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          Tu recurso definitivo en español para sobrevivir. Prepara tu equipo, estudia tus rutas y completa tus encargos.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="h-12 px-8 text-lg font-bold" asChild>
            <Link href="/mapas">
              <Map className="mr-2 h-5 w-5" />
              Estudiar Mapas
            </Link>
          </Button>
          <Button size="lg" variant="secondary" className="h-12 px-8 text-lg" asChild>
            <Link href="/misiones">
              <ScrollText className="mr-2 h-5 w-5" />
              Revisar Encargos
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}