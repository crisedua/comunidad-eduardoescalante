import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AdminPanel from "@/components/AdminPanel";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle } from "lucide-react";

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular verificación de permisos de administrador
    // En una implementación real, esto verificaría el token JWT o sesión
    const checkAdminStatus = () => {
      const userEmail = localStorage.getItem('userEmail');
      if (userEmail === 'admin@eduardoescalante.com') {
        setIsAdmin(true);
      }
      setIsLoading(false);
    };

    checkAdminStatus();
  }, []);

  if (isLoading) {
    return (
      <>
        <Navigation />
        <main className="container section-padding">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Verificando permisos...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!isAdmin) {
    return (
      <>
        <Navigation />
        <main className="container section-padding">
          <div className="max-w-2xl mx-auto">
            <Card className="card-style">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <CardTitle>Acceso Denegado</CardTitle>
                <CardDescription>
                  No tienes permisos para acceder al panel de administración
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Esta página está restringida solo para administradores. Si crees que esto es un error, 
                  contacta al soporte técnico.
                </p>
                <a 
                  href="/" 
                  className="text-primary hover:underline"
                >
                  Volver al inicio
                </a>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <title>Panel de Administración | Comunidad Eduardo Escalante</title>
      
      <Navigation />
      
      <main className="container section-padding">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Panel de Administración</h1>
          </div>
          <p className="text-muted-foreground">
            Gestiona todos los aspectos de la comunidad desde este panel centralizado
          </p>
        </div>
        
        <AdminPanel />
      </main>
      
      <Footer />
    </>
  );
};

export default Admin;
