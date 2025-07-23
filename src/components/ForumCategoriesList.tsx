import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users, Clock } from "lucide-react";

const ForumCategoriesList = () => {
  // Datos de ejemplo para las categorías del foro
  const categories = [
    {
      id: "1",
      name: "General",
      description: "Discusiones generales sobre la comunidad",
      topicsCount: 15,
      postsCount: 89,
      lastActivity: "Hace 2 horas",
      color: "bg-blue-500"
    },
    {
      id: "2",
      name: "Recursos",
      description: "Comparte y discute recursos educativos",
      topicsCount: 8,
      postsCount: 34,
      lastActivity: "Hace 1 día",
      color: "bg-green-500"
    },
    {
      id: "3",
      name: "Ayuda",
      description: "Obtén ayuda de otros miembros de la comunidad",
      topicsCount: 12,
      postsCount: 67,
      lastActivity: "Hace 3 horas",
      color: "bg-orange-500"
    },
    {
      id: "4",
      name: "Anuncios",
      description: "Anuncios oficiales y noticias importantes",
      topicsCount: 3,
      postsCount: 12,
      lastActivity: "Hace 1 semana",
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Categorías del Foro</h2>
        <Badge variant="secondary">{categories.length} categorías</Badge>
      </div>

      <div className="grid gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="card-style hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${category.color}`} />
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <div className="flex items-center gap-1 mb-1">
                    <Clock className="h-3 w-3" />
                    {category.lastActivity}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{category.topicsCount} temas</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{category.postsCount} publicaciones</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center py-8">
        <p className="text-muted-foreground">
          ¿No encuentras la categoría que buscas? Contacta a un administrador.
        </p>
      </div>
    </div>
  );
};

export default ForumCategoriesList;
