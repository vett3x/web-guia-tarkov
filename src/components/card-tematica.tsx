import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CardTematicaProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  className?: string;
}

export const CardTematica: React.FC<CardTematicaProps> = ({ title, description, icon: Icon, href, className }) => {
  return (
    <Link href={href} className={cn("block h-full", className)}>
      <Card className="h-full transition-all hover:shadow-xl hover:border-primary/70 bg-card/80 backdrop-blur-sm border-2 border-border/50">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold uppercase tracking-wider text-primary">{title}</CardTitle>
          <Icon className="h-8 w-8 text-primary/80" />
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm text-muted-foreground mb-4">{description}</CardDescription>
          <div className="mt-4 text-sm font-semibold text-accent-foreground flex items-center gap-1 transition-colors hover:text-primary">
            Acceder a la Guía <ArrowRight className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};