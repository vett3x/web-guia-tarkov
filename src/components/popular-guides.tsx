import { Star, TrendingUp, Eye, Clock } from "lucide-react";
import { ThemedContainer } from "./themed-container";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface PopularGuide {
  title: string;
  description: string;
  views: number;
  rating: number;
  time: string;
  tags: string[];
}

interface PopularGuidesProps {
  className?: string;
}

const popularGuides: PopularGuide[] = [
  {
    title: "Guía Completa de Customs",
    description: "Rutas de extracción, loot spots y estrategias PvP para principiantes y veteranos.",
    views: 12500,
    rating: 4.9,
    time: "15 min lectura",
    tags: ["Mapa", "Principiante", "Loot"]
  },
  {
    title: "Misiones de Prapor Nivel 1-20",
    description: "Cómo completar todas las misiones de Prapor de forma eficiente y rápida.",
    views: 8900,
    rating: 4.8,
    time: "25 min lectura",
    tags: ["Misiones", "Prapor", "Guía"]
  },
  {
    title: "Loadouts Baratos y Efectivos",
    description: "Configuraciones de armas y equipo económicas pero letales para early wipe.",
    views: 15200,
    rating: 4.7,
    time: "12 min lectura",
    tags: ["Armas", "Equipo", "Económico"]
  },
  {
    title: "Guía de Interchange para Loot",
    description: "Las mejores rutas de loot en Interchange para maximizar ganancias por raid.",
    views: 9800,
    rating: 4.6,
    time: "18 min lectura",
    tags: ["Mapa", "Loot", "Interchange"]
  }
];

export function PopularGuides({ className }: PopularGuidesProps) {
  return (
    <ThemedContainer 
      title="GUÍAS MÁS POPULARES" 
      className={cn("border-2 border-primary/20", className)}
    >
      <div className="space-y-4">
        {popularGuides.map((guide, index) => (
          <div 
            key={guide.title}
            className="group p-4 border border-border/50 rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs font-normal">
                    #{index + 1}
                  </Badge>
                  <h4 className="font-bold text-primary">{guide.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{guide.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {guide.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs px-2 py-0">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>{guide.views.toLocaleString()} vistas</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <span>{guide.rating}/5.0</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{guide.time}</span>
                  </div>
                </div>
              </div>
              <TrendingUp className="h-6 w-6 text-primary/50 group-hover:text-primary transition-colors ml-4" />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border/50 text-center">
        <p className="text-sm text-muted-foreground">
          Estas guías son las más consultadas por la comunidad este mes
        </p>
      </div>
    </ThemedContainer>
  );
}