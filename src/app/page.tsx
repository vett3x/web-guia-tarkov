import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Map, ScrollText, Shield } from "lucide-react";
import { CardTematica } from "@/components/card-tematica";
import { HeroSection } from "@/components/hero-section";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        
        <section className="container mx-auto px-4 py-12 md:py-16">
          <h3 className="text-3xl font-bold mb-8 text-center uppercase tracking-wider border-b pb-2">
            Recursos Tácticos
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}