import { MadeWithDyad } from "@/components/made-with-dyad";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Map, ScrollText } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 text-primary">
            Bienvenido, PMC.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Tu recurso definitivo en español para sobrevivir en la Zona de Exclusión de Tarkov. Prepara tu equipo, estudia tus rutas y completa tus encargos.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/mapas">
                <Map className="mr-2 h-5 w-5" />
                Estudiar Mapas
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/misiones">
                <ScrollText className="mr-2 h-5 w-5" />
                Revisar Encargos
              </Link>
            </Button>
          </div>
        </div>
        
        <section className="mt-16 grid md:grid-cols-3 gap-8">
          <CardTematica 
            title="Mapas y Extracciones"
            description="Conoce cada rincón, punto de interés y ruta de extracción segura. No te conviertas en carne de cañón."
            icon={Map}
            href="/mapas"
          />
          <CardTematica 
            title="Encargos de Comerciantes"
            description="Sigue las instrucciones de los Comerciantes para subir tu reputación y desbloquear mejor equipo."
            icon={ScrollText}
            href="/misiones"
          />
          <CardTematica 
            title="Guía de Comerciantes"
            description="Aprende qué vende cada Comerciante, sus requisitos de nivel y cómo maximizar tu relación con ellos."
            icon={Shield}
            href="/comerciantes"
          />
        </section>
      </main>
      <MadeWithDyad />
    </div>
  );
}

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LucideIcon, Shield } from "lucide-react";

interface CardTematicaProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

const CardTematica: React.FC<CardTematicaProps> = ({ title, description, icon: Icon, href }) => {
  return (
    <Link href={href}>
      <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <Icon className="h-6 w-6 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm">{description}</CardDescription>
          <div className="mt-4 text-sm font-semibold text-primary flex items-center">
            Ver Guía <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};