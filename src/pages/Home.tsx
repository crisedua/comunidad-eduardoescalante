import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User, BookOpen, MessageSquare, Users, Settings } from "lucide-react";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import PasswordResetForm from "@/components/PasswordResetForm";
import ResourcesList from "@/components/ResourcesList";
import ForumCategoriesList from "@/components/ForumCategoriesList";
import UserProfile from "@/components/UserProfile";
import AdminPanel from "@/components/AdminPanel";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register' | 'reset-password'>('login');
  const [activeTab, setActiveTab] = useState("recursos");
  
  // Simulación de inicio de sesión exitoso
  const handleLoginSuccess = (email?: string) => {
    setIsLoggedIn(true);
    
    // Solo el usuario con email admin@eduardoescalante.com puede ser administrador
    // En una implementación real, esto vendría de la base de datos
    if (email === 'admin@eduardoescalante.com') {
      setIsAdmin(true);
      console.log('Usuario administrador detectado');
    } else {
      setIsAdmin(false);
    }
  };
  
  // Cambiar entre vistas de autenticación
  const handleAuthViewChange = (view: 'login' | 'register' | 'reset-password') => {
    setAuthView(view);
  };

  return (
    <>
      <title>Comunidad Eduardo Escalante</title>

      <Navigation />
      
      <main className="container section-padding">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Comunidad</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Únete a nuestra comunidad exclusiva y accede a recursos premium, participa en discusiones y conecta con otros miembros.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="button-primary">
              Únete Ahora
            </Button>
            <Button variant="outline" size="lg">
              Explorar Recursos
            </Button>
          </div>
        </div>

        {!isLoggedIn ? (
          <div className="w-full max-w-md mx-auto">
            {authView === 'login' && (
              <LoginForm 
                onSubmit={(email) => handleLoginSuccess(email)} 
                onRegisterClick={() => handleAuthViewChange('register')}
                onForgotPasswordClick={() => handleAuthViewChange('reset-password')}
              />
            )}
            {authView === 'register' && (
              <RegisterForm 
                onSubmit={() => handleLoginSuccess()}
                onLoginClick={() => handleAuthViewChange('login')}
              />
            )}
            {authView === 'reset-password' && (
              <PasswordResetForm 
                onBackToLogin={() => handleAuthViewChange('login')}
              />
            )}
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-5xl mx-auto">
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="recursos" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Recursos</span>
              </TabsTrigger>
              <TabsTrigger value="foro" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Foro</span>
              </TabsTrigger>
              <TabsTrigger value="miembros" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Miembros</span>
              </TabsTrigger>
              <TabsTrigger value="perfil" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Mi Perfil</span>
              </TabsTrigger>
              {isAdmin && (
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Admin</span>
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="recursos" className="space-y-8">
              <ResourcesList />
            </TabsContent>

            <TabsContent value="foro" className="space-y-6">
              <ForumCategoriesList />
            </TabsContent>

            <TabsContent value="miembros" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Miembros de la Comunidad</h2>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Buscar miembros..." 
                    className="pl-3 pr-10 py-2 border border-border rounded-md"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Miembros de ejemplo */}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <Card key={item} className="card-style">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          {String.fromCharCode(64 + item)}
                        </div>
                        <div>
                          <h3 className="font-medium">Usuario {item}</h3>
                          <p className="text-sm text-muted-foreground">Miembro desde 2023</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <span className="text-xs text-muted-foreground">{10 + item} publicaciones</span>
                      <Button variant="ghost" size="sm">Ver Perfil</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <div className="text-center">
                <Button variant="outline">Cargar Más</Button>
              </div>
            </TabsContent>

            <TabsContent value="perfil" className="space-y-6">
              <UserProfile />
            </TabsContent>

            {isAdmin && (
              <TabsContent value="admin" className="space-y-6">
                <AdminPanel />
              </TabsContent>
            )}
          </Tabs>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Home;
