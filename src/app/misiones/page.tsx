import { Navbar } from "@/components/navbar";

export default function MisionesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-24">
        <h1 className="text-4xl font-bold mb-6">Encargos de Comerciantes (Misiones)</h1>
        <p className="text-lg text-muted-foreground">
          Una guía completa para completar todas las misiones de los Comerciantes, incluyendo requisitos y recompensas. ¡Próximamente!
        </p>
      </main>
    </div>
  );
}