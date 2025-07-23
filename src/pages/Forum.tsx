import ForumCategoriesList from "@/components/ForumCategoriesList";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { MessageSquare, Users, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Forum = () => {
  const stats = [
    {
      title: "Temas Activos",
      value: "38",
      description: "Discusiones en curso",
      icon: MessageSquare,
      color: "text-blue-600"
    },
    {
      title: "Miembros Activos",
      value: "156",
      description: "Participando este mes",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Respuestas Hoy",
      value: "24",
      description: "Nuevas respuestas",
      icon: Clock,
      color: "text-orange-600"
    },
    {
      title: "Temas Populares",
      value: "12",
      description: "Más comentados",
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ];

  const recentTopics = [
    {
      title: "Mejores prácticas para React Hooks",
      author: "María González",
      replies: 15,
      lastActivity: "Hace 2 horas",
      category: "Desarrollo"
    },
    {
      title: "¿Cómo optimizar el rendimiento en Next.js?",
      author: "Carlos Ruiz",
      replies: 8,
      lastActivity: "Hace 4 horas",
      category: "Performance"
    },
    {
      title: "Recursos gratuitos para aprender TypeScript",
      author: "Ana Martín",
      replies: 23,
      lastActivity: "Hace 6 horas",
      category: "Recursos"
    },
    {
      title: "Experiencias con deployment en Vercel",
      author: "Luis Pérez",
      replies: 12,
      lastActivity: "Hace 1 día",
      category: "DevOps"
    }
  ];

  return (
    <>
      <title>Foro | Comunidad Eduardo Escalante</title>
      
      <Navigation />
      
      <main className="container section-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Foro de la Comunidad
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conecta con otros miembros, comparte conocimientos y participa en 
            discusiones sobre desarrollo, tecnología y crecimiento profesional.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="card-style">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Categories */}
          <div className="lg:col-span-2">
            <ForumCategoriesList />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Topics */}
            <Card className="card-style">
              <CardHeader>
                <CardTitle>Temas Recientes</CardTitle>
                <CardDescription>
                  Las discusiones más activas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTopics.map((topic, index) => (
                    <div key={index} className="border-b border-border last:border-0 pb-4 last:pb-0">
                      <h4 className="font-medium text-sm mb-1 line-clamp-2">
                        {topic.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>por {topic.author}</span>
                        <span>{topic.replies} respuestas</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                        <span className="bg-muted px-2 py-1 rounded">{topic.category}</span>
                        <span>{topic.lastActivity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Forum Rules */}
            <Card className="card-style">
              <CardHeader>
                <CardTitle>Reglas del Foro</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Mantén un tono respetuoso y profesional</li>
                  <li>• Busca antes de crear un nuevo tema</li>
                  <li>• Usa títulos descriptivos y claros</li>
                  <li>• Comparte código usando bloques de código</li>
                  <li>• Ayuda a otros miembros cuando puedas</li>
                </ul>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-style">
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Crear Nuevo Tema
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Ver Miembros
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Temas Populares
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 py-12 bg-muted/30 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">¡Únete a la Conversación!</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Comparte tus experiencias, haz preguntas y ayuda a otros miembros de la comunidad.
          </p>
          <Button size="lg">
            <MessageSquare className="h-4 w-4 mr-2" />
            Crear Mi Primer Tema
          </Button>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Forum;
