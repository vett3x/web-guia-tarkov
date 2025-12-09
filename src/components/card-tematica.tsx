import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface CardTematicaProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  className?: string;
  badge?: string;
}

export const CardTematica: React.FC<CardTematicaProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  href, 
  className,
  badge = "Guía"
}) => {
  return (
    <Link href={href} className={cn("block h-full group", className)}>
      <Card className="h-full transition-all duration-300 hover:shadow-2xl hover:border-primary hover:scale-[1.02] bg-gradient-to-br from-card to-secondary/50 border-2 border-border/70 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold uppercase tracking-wider text-primary flex items-center gap-2">
              {title}
              <Badge variant="outline" className="text-xs font-normal ml-2 border-primary/30 text-primary">
                {badge}
              </Badge>
            </CardTitle>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
            <Icon className="h-10 w-10 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" />
          </div>
        </CardHeader>
        
        <CardContent>
          <CardDescription className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {description}
          </CardDescription>
          
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
            <div className="text-sm font-semibold text-primary flex items-center gap-2 transition-all group-hover:gap-3">
              Acceder a la Guía Completa
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="text-xs text-muted-foreground">
              Click para explorar →
            </div>
          </div>
        </CardContent>
        
        {/* Efecto de brillo al hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </Card>
    </Link>
  );
};