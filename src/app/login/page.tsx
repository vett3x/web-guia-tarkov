import { AuthForm } from "@/components/auth/AuthForm";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Shield } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-md mx-auto">
          {/* Cabecera táctica simplificada */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 border-2 border-primary/30">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 uppercase tracking-wider">
              ACCESO AL SISTEMA
            </h1>
            <p className="text-lg text-muted-foreground">
              Inicia sesión o regístrate para acceder al contenido
            </p>
          </div>

          {/* Formulario de autenticación */}
          <AuthForm />
          
          {/* Información adicional simplificada */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Esta guía es mantenida por la comunidad de Tarkov en español
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}