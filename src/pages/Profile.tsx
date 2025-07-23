import { useState, useEffect } from "react";
import UserProfile from "@/components/UserProfile";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LoginForm from "@/components/LoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Lock } from "lucide-react";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular verificación de sesión
    // En una implementación real, esto verificaría el token JWT o sesión
    const checkAuthStatus = () => {
      const userEmail = localStorage.getItem('userEmail');
      if (userEmail) {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const handleLoginSuccess = (email: string) => {
    localStorage.setItem('userEmail', email);
    setIsLoggedIn(true);
  };

  if (isLoading) {
    return (
      <>
        <Navigation />
        <main className="container section-padding">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Cargando perfil...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!isLoggedIn) {
    return (
      <>
        <title>Iniciar Sesión | Comunidad Eduardo Escalante</title>
        
        <Navigation />
        
        <main className="container section-padding">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Acceso Requerido</h1>
              <p className="text-muted-foreground">
                Inicia sesión para acceder a tu perfil y gestionar tu cuenta
              </p>
            </div>
            
            <LoginForm onSubmit={handleLoginSuccess} />
            
            <div className="text-center mt-8 py-6 bg-muted/30 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">¿Nuevo en la comunidad?</h2>
              <p className="text-muted-foreground mb-4">
                Únete a nuestra comunidad exclusiva y accede a recursos premium, 
                participa en el foro y conecta con otros profesionales.
              </p>
              <a 
                href="/" 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                Crear Cuenta
              </a>
            </div>
          </div>
        </main>
        
        <Footer />
      </>
    );
  }

  return (
    <>
      <title>Mi Perfil | Comunidad Eduardo Escalante</title>
      
      <Navigation />
      
      <main className="container section-padding">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <User className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Mi Perfil</h1>
          </div>
          <p className="text-muted-foreground">
            Gestiona tu información personal y revisa tu actividad en la comunidad
          </p>
        </div>
        
        <UserProfile />

        {/* Additional Profile Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
          <Card className="card-style">
            <CardHeader>
              <CardTitle>Configuración de Cuenta</CardTitle>
              <CardDescription>
                Gestiona la configuración de tu cuenta y preferencias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notificaciones por Email</h4>
                    <p className="text-sm text-muted-foreground">Recibir actualizaciones por correo</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Perfil Público</h4>
                    <p className="text-sm text-muted-foreground">Mostrar tu perfil a otros miembros</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notificaciones del Foro</h4>
                    <p className="text-sm text-muted-foreground">Recibir notificaciones de respuestas</p>
                  </div>
                  <input type="checkbox" className="rounded" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-style">
            <CardHeader>
              <CardTitle>Seguridad</CardTitle>
              <CardDescription>
                Mantén tu cuenta segura
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Cambiar Contraseña</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Actualiza tu contraseña regularmente para mantener tu cuenta segura
                  </p>
                  <button className="text-sm text-primary hover:underline">
                    Cambiar contraseña
                  </button>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Autenticación de Dos Factores</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Añade una capa extra de seguridad a tu cuenta
                  </p>
                  <button className="text-sm text-primary hover:underline">
                    Configurar 2FA
                  </button>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Sesiones Activas</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Revisa y gestiona tus sesiones activas
                  </p>
                  <button className="text-sm text-primary hover:underline">
                    Ver sesiones
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Profile;
