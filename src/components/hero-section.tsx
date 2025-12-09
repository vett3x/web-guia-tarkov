import { Crosshair } from "lucide-react";
import { ThemedContainer } from "./themed-container";

export function HeroSection() {
  return (
    <ThemedContainer title="Bienvenido a la Guía Táctica de Tarkov (EFT)" className="mb-8">
      <div className="text-center">
        <Crosshair className="h-10 w-10 mx-auto mb-4 text-primary" />
        <p className="text-lg text-muted-foreground mb-4">
          Tu recurso definitivo en español para sobrevivir en la Zona de Exclusión. Prepara tu equipo, estudia tus rutas y completa tus encargos.
        </p>
        <p className="text-sm text-accent-foreground/70">
          Esta guía es mantenida por la comunidad para ayudarte a dominar el juego.
        </p>
      </div>
    </ThemedContainer>
  );
}