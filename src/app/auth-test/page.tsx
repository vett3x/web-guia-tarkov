"use client";

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { RefreshCw, Shield, AlertCircle, CheckCircle } from 'lucide-react';

export default function AuthTestPage() {
  const [authStatus, setAuthStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/check');
      const data = await response.json();
      setAuthStatus(data);
    } catch (err) {
      setError('Error al verificar autenticación');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-primary">Prueba de Autenticación</h1>
          <p className="text-muted-foreground mb-8">
            Esta página prueba el sistema de autenticación y el middleware.
          </p>
          
          <div className="border-2 border-primary/30 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-primary">Estado del Sistema</h2>
              <Button onClick={checkAuth} disabled={loading} variant="outline" size="sm">
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Actualizar
              </Button>
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-primary">Verificando autenticación...</p>
              </div>
            ) : error ? (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 text-red-500 mb-2">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-bold">Error</span>
                </div>
                <p>{error}</p>
              </div>
            ) : authStatus ? (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border ${authStatus.authenticated ? 'bg-green-500/10 border-green-500/30' : 'bg-yellow-500/10 border-yellow-500/30'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {authStatus.authenticated ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    )}
                    <span className="font-bold">Autenticación: {authStatus.authenticated ? 'ACTIVA' : 'INACTIVA'}</span>
                  </div>
                  <p className="text-sm">
                    {authStatus.authenticated 
                      ? `Usuario autenticado: ${authStatus.session?.user?.email}`
                      : 'No hay sesión activa. Inicia sesión para acceder al dashboard.'}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-border rounded-lg">
                    <h3 className="font-bold text-primary mb-2">Middleware</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>Funcionando</span>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-border rounded-lg">
                    <h3 className="font-bold text-primary mb-2">Sesión</h3>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${authStatus.authenticated ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                      <span>{authStatus.authenticated ? 'Activa' : 'Inactiva'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-black/30 rounded-lg">
                  <h3 className="font-bold text-primary mb-2">Datos Técnicos</h3>
                  <pre className="text-xs overflow-auto max-h-60">
                    {JSON.stringify(authStatus, null, 2)}
                  </pre>
                </div>
              </div>
            ) : null}
          </div>
          
          <div className="border-2 border-border rounded-lg p-6">
            <h2 className="text-xl font-bold text-primary mb-4">Pruebas de Flujo</h2>
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-bold text-primary mb-2">1. Acceso a /dashboard</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Si no estás autenticado, el middleware debería redirigirte a /login automáticamente.
                </p>
                <div className="flex gap-2">
                  <a href="/dashboard">
                    <Button variant="outline">Ir a Dashboard</Button>
                  </a>
                  <a href="/login">
                    <Button variant="outline">Ir a Login</Button>
                  </a>
                </div>
              </div>
              
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-bold text-primary mb-2">2. Verificación de Cookies</h3>
                <p className="text-sm text-muted-foreground">
                  El middleware usa cookies para mantener la sesión. Si hay problemas, intenta limpiar cookies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}