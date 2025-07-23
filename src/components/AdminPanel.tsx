import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { FileText, MessageSquare, Users, Settings, PlusCircle, Save, Trash2, FilterIcon } from "lucide-react";
import { useResources } from "@/context/ResourcesContext";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("recursos");
  const { toast } = useToast();
  const { addResource, resources } = useResources();
  
  // Estados para formularios
  const [resourceForm, setResourceForm] = useState({
    title: "",
    description: "",
    type: "document" as "document" | "video" | "audio" | "link",
    accessLevel: "free" as "free" | "paid",
    thumbnail: "/placeholder.svg",
  });
  
  const [forumForm, setForumForm] = useState({
    title: "",
    description: "",
    category: "general",
  });
  
  // Manejadores de formularios
  const handleResourceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que el título y la descripción no estén vacíos
    if (!resourceForm.title.trim() || !resourceForm.description.trim()) {
      toast({
        title: "Error",
        description: "El título y la descripción son obligatorios.",
        variant: "destructive",
      });
      return;
    }
    
    // Añadir el recurso al contexto
    addResource(resourceForm);
    
    toast({
      title: "Recurso creado",
      description: "El recurso ha sido añadido a la lista correctamente.",
    });
    
    // Limpiar el formulario
    setResourceForm({
      title: "",
      description: "",
      type: "document",
      accessLevel: "free",
      thumbnail: "/placeholder.svg",
    });
  };
  
  const handleForumSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Tema creado",
      description: "El tema del foro ha sido creado correctamente.",
    });
    setForumForm({
      title: "",
      description: "",
      category: "general",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Panel de Administración</h2>
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          <span className="text-sm text-muted-foreground">Admin</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recursos" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Recursos
          </TabsTrigger>
          <TabsTrigger value="foro" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Foro
          </TabsTrigger>
          <TabsTrigger value="usuarios" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="configuracion" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configuración
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recursos" className="space-y-6">
          <Card className="card-style">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5" />
                Crear Nuevo Recurso
              </CardTitle>
              <CardDescription>
                Añade un nuevo recurso educativo a la comunidad
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleResourceSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={resourceForm.title}
                    onChange={(e) => setResourceForm({...resourceForm, title: e.target.value})}
                    placeholder="Título del recurso"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={resourceForm.description}
                    onChange={(e) => setResourceForm({...resourceForm, description: e.target.value})}
                    placeholder="Descripción del recurso"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo</Label>
                    <Select
                      value={resourceForm.type}
                      onValueChange={(value: "document" | "video" | "audio" | "link") => 
                        setResourceForm({ ...resourceForm, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="document">Documento</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                        <SelectItem value="link">Enlace</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accessLevel">Nivel de Acceso</Label>
                    <Select
                      value={resourceForm.accessLevel}
                      onValueChange={(value: "free" | "paid") => 
                        setResourceForm({ ...resourceForm, accessLevel: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar nivel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Gratuito</SelectItem>
                        <SelectItem value="paid">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Crear Recurso
                </Button>
              </CardFooter>
            </form>
          </Card>

          {/* Lista de recursos existentes */}
          <Card className="card-style">
            <CardHeader>
              <CardTitle>Recursos Existentes ({resources.length})</CardTitle>
              <CardDescription>
                Gestiona los recursos ya creados
              </CardDescription>
            </CardHeader>
            <CardContent>
              {resources.length > 0 ? (
                <div className="space-y-2">
                  {resources.map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{resource.title}</h4>
                        <p className="text-sm text-muted-foreground">{resource.type} • {resource.accessLevel}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No hay recursos creados aún
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="foro" className="space-y-6">
          <Card className="card-style">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5" />
                Crear Nuevo Tema
              </CardTitle>
              <CardDescription>
                Añade un nuevo tema de discusión al foro
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleForumSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forumTitle">Título del Tema</Label>
                  <Input
                    id="forumTitle"
                    value={forumForm.title}
                    onChange={(e) => setForumForm({...forumForm, title: e.target.value})}
                    placeholder="Título del tema"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="forumDescription">Descripción</Label>
                  <Textarea
                    id="forumDescription"
                    value={forumForm.description}
                    onChange={(e) => setForumForm({...forumForm, description: e.target.value})}
                    placeholder="Descripción del tema"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select
                    value={forumForm.category}
                    onValueChange={(value) => setForumForm({...forumForm, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="recursos">Recursos</SelectItem>
                      <SelectItem value="ayuda">Ayuda</SelectItem>
                      <SelectItem value="anuncios">Anuncios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Crear Tema
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="usuarios" className="space-y-6">
          <Card className="card-style">
            <CardHeader>
              <CardTitle>Gestión de Usuarios</CardTitle>
              <CardDescription>
                Administra los usuarios de la comunidad
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Input placeholder="Buscar usuarios..." className="max-w-sm" />
                <Button variant="outline">
                  <FilterIcon className="h-4 w-4 mr-2" />
                  Filtrar
                </Button>
              </div>
              
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4" />
                <p>La gestión de usuarios se implementará con el backend</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuracion" className="space-y-6">
          <Card className="card-style">
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>
                Ajusta la configuración de la comunidad
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Registro Abierto</Label>
                  <p className="text-sm text-muted-foreground">
                    Permitir que nuevos usuarios se registren
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Verificación de Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Requerir verificación de email para nuevos usuarios
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Moderación de Comentarios</Label>
                  <p className="text-sm text-muted-foreground">
                    Revisar comentarios antes de publicarlos
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Guardar Configuración
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
