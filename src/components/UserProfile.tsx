import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { User, Mail, Calendar, MapPin, Edit, Save } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  bio: z.string().max(500, "La biografía no puede exceder 500 caracteres").optional(),
  location: z.string().optional(),
  website: z.string().url("URL inválida").optional().or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Usuario Ejemplo",
      email: "usuario@ejemplo.com",
      bio: "Miembro activo de la comunidad interesado en aprender y compartir conocimientos.",
      location: "Madrid, España",
      website: "",
    },
  });

  const handleSubmit = (data: ProfileFormValues) => {
    console.log("Datos del perfil:", data);
    
    toast({
      title: "Perfil actualizado",
      description: "Tu información ha sido guardada correctamente.",
    });
    
    setIsEditing(false);
  };

  const userStats = [
    { label: "Recursos accedidos", value: "23" },
    { label: "Publicaciones en foro", value: "8" },
    { label: "Miembro desde", value: "Enero 2024" },
    { label: "Última actividad", value: "Hace 2 horas" },
  ];

  const recentActivity = [
    { action: "Accedió al recurso", item: "Guía de React Avanzado", time: "Hace 2 horas" },
    { action: "Comentó en", item: "Mejores prácticas de JavaScript", time: "Hace 1 día" },
    { action: "Se unió al tema", item: "Discusión sobre TypeScript", time: "Hace 3 días" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Mi Perfil</h2>
        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Guardar
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información del perfil */}
        <div className="lg:col-span-2">
          <Card className="card-style">
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>
                {isEditing ? "Edita tu información personal" : "Tu información personal"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre completo</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correo electrónico</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Biografía</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="Cuéntanos sobre ti..."
                              rows={3}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ubicación</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Ciudad, País" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sitio web</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="https://..." />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{form.getValues("name")}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <span>{form.getValues("email")}</span>
                  </div>
                  
                  {form.getValues("location") && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span>{form.getValues("location")}</span>
                    </div>
                  )}
                  
                  {form.getValues("bio") && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Biografía</h4>
                      <p className="text-muted-foreground">{form.getValues("bio")}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Estadísticas */}
        <div className="space-y-6">
          <Card className="card-style">
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userStats.map((stat, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <span className="font-medium">{stat.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="card-style">
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="text-sm">
                    <p>
                      <span className="text-muted-foreground">{activity.action}</span>{" "}
                      <span className="font-medium">{activity.item}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
