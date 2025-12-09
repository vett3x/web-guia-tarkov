import * as React from "react";
import { cn } from "@/lib/utils";

interface ThemedContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  tactical?: boolean;
}

export const ThemedContainer = React.forwardRef<HTMLDivElement, ThemedContainerProps>(
  ({ className, title, children, tactical = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "border border-border bg-gradient-to-br from-black/30 to-black/20 shadow-xl relative overflow-hidden",
        tactical && "battle-damage tactical-surface",
        "rounded-none",
        className
      )}
      {...props}
    >
      {/* Línea superior con efecto de neón */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      
      {/* Título de la sección con estilo militar */}
      <div className="bg-gradient-to-r from-black/50 to-black/30 border-y border-border py-3 px-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold uppercase tracking-wider text-primary flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-primary animate-pulse"></span>
            {title}
            <span className="inline-block w-2 h-2 bg-primary animate-pulse"></span>
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono">[TACTICAL]</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 relative">
        {/* Puntos de referencia tácticos en las esquinas */}
        <div className="absolute top-2 left-2 w-4 h-0.5 bg-primary/50"></div>
        <div className="absolute top-2 left-2 h-4 w-0.5 bg-primary/50"></div>
        
        <div className="absolute top-2 right-2 w-4 h-0.5 bg-primary/50"></div>
        <div className="absolute top-2 right-2 h-4 w-0.5 bg-primary/50"></div>
        
        <div className="absolute bottom-2 left-2 w-4 h-0.5 bg-primary/50"></div>
        <div className="absolute bottom-2 left-2 h-4 w-0.5 bg-primary/50"></div>
        
        <div className="absolute bottom-2 right-2 w-4 h-0.5 bg-primary/50"></div>
        <div className="absolute bottom-2 right-2 h-4 w-0.5 bg-primary/50"></div>
        
        {children}
      </div>
      
      {/* Línea inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent"></div>
    </div>
  )
);
ThemedContainer.displayName = "ThemedContainer";