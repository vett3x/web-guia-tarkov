import { AuthForm } from "@/components/auth/AuthForm";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Shield, Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Cabecera táctica */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-6 border-2 border-primary/30">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 uppercase tracking-wider">
              ACCESO AL SISTEMA TÁCTICO
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Zona restringida. Solo personal autorizado con credenciales válidas.
            </p>
          </div>

          {/* Grid con información y formulario */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Información de roles */}
            <div className="lg:col-span-1 space-y-6">
              <div className="border-2 border-primary/20 bg-gradient-to-br from-black/30 to-black/10 p-6">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  NIVELES DE ACCESO
                </h3>
                <div className="space-y-4">
                  <div className="p-3 border border-primary/10 bg-yellow-500/5">
                    <h4 className="font-bold text-yellow-500 uppercase text-sm">SUPERADMIN</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Control total del sistema. Puede gestionar usuarios, contenido y configuraciones.
                    </p>
                  </div>
                  <div className="p-3 border border-primary/10 bg-blue-500/5">
                    <h4 className="font-bold text-blue-500 uppercase text-sm">MODERADOR</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Gestiona contenido y usuarios. Puede aprobar/eliminar publicaciones.
                    </p>
                  </div>
                  <div className="p-3 border border-primary/10 bg-green-500/5">
                    <h4 className="font-bold text-green-500 uppercase text-sm">EDITOR</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Crea y edita contenido. No tiene permisos de administración.
                    </p>
                  </div>
                  <div className="p-3 border border-primary/10 bg-primary/5">
                    <h4 className="font-bold text-primary uppercase text-sm">USUARIO</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Acceso básico a la plataforma. Puede comentar y guardar contenido.
                    </p>
                  </div>
                </div>
              </div>

              {/* Nota de seguridad */}
              <div className="border-2 border-yellow-500/30 bg-yellow-500/5 p-6">
                <h4 className="font-bold text-yellow-500 uppercase text-sm mb-2">
                  ⚠️ ADVERTENCIA DE SEGURIDAD
                </h4>
                <p className="text-sm text-yellow-500/90">
                  Todas las actividades son registradas y monitoreadas. El acceso no autorizado será penalizado.
                </p>
              </div>
            </div>

            {/* Formulario de autenticación */}
            <div className="lg:col-span-2">
              <AuthForm />
              
              {/* Información adicional */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-border/50 p-4 bg-black/20">
                  <h4 className="font-bold text-primary text-sm uppercase mb-2">
                    ¿PROBLEMAS DE ACCESO?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Contacta con el administrador del sistema para recuperar tu acceso.
                  </p>
                </div>
                <div className="border border-border/50 p-4 bg-black/20">
                  <h4 className="font-bold text-primary text-sm uppercase mb-2">
                    PRIMER ACCESO
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Si es tu primera vez, regístrate y espera a que un administrador active tu cuenta.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}