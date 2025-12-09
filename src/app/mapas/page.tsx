import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function MapasPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-24">
        <h1 className="text-4xl font-bold mb-6">Mapas de Tarkov</h1>
        <p className="text-lg text-muted-foreground">
          Aquí encontrarás todos los mapas detallados con puntos de interés, loot y rutas de extracción. ¡Próximamente!
        </p>
      </main>
      <Footer />
    </div>
  );
}