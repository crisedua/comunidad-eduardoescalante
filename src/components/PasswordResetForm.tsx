import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Correo electrónico inválido").min(1, "El correo electrónico es obligatorio"),
});

type FormValues = z.infer<typeof formSchema>;

interface PasswordResetFormProps {
  onBackToLogin?: () => void;
}

const PasswordResetForm = ({ onBackToLogin }: PasswordResetFormProps) => {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = (data: FormValues) => {
    // Aquí iría la lógica de recuperación de contraseña
    console.log("Datos de recuperación:", data);
    
    // Simulación de envío exitoso
    toast({
      title: "Correo enviado",
      description: "Revisa tu bandeja de entrada para restablecer tu contraseña",
    });
    
    // Limpiar el formulario
    form.reset();
  };

  return (
    <Card className="card-style">
      <CardHeader>
        <CardTitle>Recuperar Contraseña</CardTitle>
        <CardDescription>
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
        </CardDescription>
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
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full">
              Enviar Enlace de Recuperación
            </Button>
            
            <Button 
              type="button" 
              variant="ghost" 
              className="w-full"
              onClick={onBackToLogin}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio de sesión
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default PasswordResetForm;
