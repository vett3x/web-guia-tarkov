import { Navbar } from "@/components/navbar";

export default function ComerciantesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-24">
        <h1 className="text-4xl font-bold mb-6">Comerciantes de Tarkov</h1>
        <p className="text-lg text-muted-foreground">
          Información detallada sobre Peacekeeper, Prapor, Therapist y todos los demás Comerciantes. ¡Próximamente!
        </p>
      </main>
    </div>
  );
}