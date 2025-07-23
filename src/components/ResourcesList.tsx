import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Video, FileAudio, Link2 } from "lucide-react";
import { useResources, Resource } from "@/context/ResourcesContext";

const ResourcesList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("todos");
  const { resources } = useResources();

  // Filtrar recursos según la pestaña activa y la búsqueda
  const filteredResources = resources.filter((resource) => {
    // Filtrar por tipo de acceso
    if (activeTab === "premium" && resource.accessLevel !== "paid") return false;
    if (activeTab === "gratis" && resource.accessLevel !== "free") return false;
    
    // Filtrar por búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  // Obtener el icono según el tipo de recurso
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "document":
        return <BookOpen className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      case "audio":
        return <FileAudio className="h-5 w-5" />;
      case "link":
        return <Link2 className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h2 className="text-2xl font-bold">Recursos Educativos</h2>
        
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar recursos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full sm:w-64"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="gratis">Gratuitos</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="card-style overflow-hidden flex flex-col">
                  <div className="aspect-video bg-muted relative">
                    <img 
                      src={resource.thumbnail} 
                      alt={resource.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant={resource.accessLevel === "free" ? "secondary" : "default"}>
                        {resource.accessLevel === "free" ? "Gratis" : "Premium"}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getResourceIcon(resource.type)}
                      <span className="text-sm text-muted-foreground capitalize">
                        {resource.type === "document" ? "Documento" : 
                         resource.type === "video" ? "Video" :
                         resource.type === "audio" ? "Audio" : "Enlace"}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardFooter>
                    <Button className="w-full">
                      {resource.accessLevel === "free" ? "Acceder" : "Ver Premium"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                {searchQuery ? "No se encontraron recursos" : "No hay recursos disponibles"}
              </h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? "Intenta con otros términos de búsqueda" 
                  : "Los recursos se cargarán desde la base de datos"}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResourcesList;
