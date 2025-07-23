import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Correo electrónico inválido").min(1, "El correo electrónico es obligatorio"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  onSubmit?: (email: string) => void;
  onRegisterClick?: () => void;
  onForgotPasswordClick?: () => void;
}

const LoginForm = ({ onSubmit, onRegisterClick, onForgotPasswordClick }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const handleSubmit = (data: FormValues) => {
    // Aquí iría la lógica de autenticación
    console.log("Datos de inicio de sesión:", data);
    
    // Simulación de inicio de sesión exitoso
    toast({
      title: "Inicio de sesión exitoso",
      description: "Bienvenido a la comunidad",
    });
    
    // Llamar al callback si existe y pasar el email
    if (onSubmit) onSubmit(data.email);
  };

  return (
    <Card className="card-style">
      <CardHeader>
        <CardTitle>Iniciar Sesión</CardTitle>
        <CardDescription>Accede a tu cuenta para ver contenido exclusivo</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="tu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        {...field} 
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        Recordarme
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              <Button 
                type="button" 
                variant="link" 
                className="px-0 font-normal"
                onClick={onForgotPasswordClick}
              >
                ¿Olvidaste tu contraseña?
              </Button>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full">
              Iniciar Sesión
            </Button>
            
            <p className="text-sm text-center text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <Button 
                type="button" 
                variant="link" 
                className="px-0 font-normal"
                onClick={onRegisterClick}
              >
                Regístrate
              </Button>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default LoginForm;
