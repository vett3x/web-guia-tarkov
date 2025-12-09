import * as React from "react";
import { cn } from "@/lib/utils";

interface ThemedContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export const ThemedContainer = React.forwardRef<HTMLDivElement, ThemedContainerProps>(
  ({ className, title, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "border border-border bg-card shadow-lg overflow-hidden",
        "rounded-none", // Estilo más cuadrado, menos redondeado
        className
      )}
      {...props}
    >
      {/* Título de la sección con estilo de encabezado de wiki */}
      <div className="bg-primary/10 border-b border-border p-3 text-center">
        <h3 className="text-lg font-bold uppercase tracking-wider text-primary">{title}</h3>
      </div>
      
      <div className="p-4">
        {children}
      </div>
    </div>
  )
);
ThemedContainer.displayName = "ThemedContainer";