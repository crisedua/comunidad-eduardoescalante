import ResourcesList from "@/components/ResourcesList";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BookOpen, Star, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Resources = () => {
  const stats = [
    {
      title: "Total de Recursos",
      value: "150+",
      description: "Recursos disponibles",
      icon: BookOpen,
      color: "text-blue-600"
    },
    {
      title: "Recursos Premium",
      value: "45",
      description: "Contenido exclusivo",
      icon: Star,
      color: "text-yellow-600"
    },
    {
      title: "Más Populares",
      value: "25",
      description: "Recursos destacados",
      icon: TrendingUp,
      color: "text-green-600"
    }
  ];

  return (
    <>
      <title>Recursos | Comunidad Eduardo Escalante</title>
      
      <Navigation />
      
      <main className="container section-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Recursos Educativos
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Accede a una amplia colección de recursos cuidadosamente seleccionados para 
            acelerar tu aprendizaje y desarrollo profesional.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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

        {/* Resources List */}
        <ResourcesList />

        {/* Call to Action */}
        <div className="text-center mt-16 py-12 bg-muted/30 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">¿No encuentras lo que buscas?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Sugiere nuevos recursos o temas que te gustaría ver en nuestra comunidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contacto" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Sugerir Recurso
            </a>
            <a 
              href="/foro" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Ir al Foro
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Resources;
