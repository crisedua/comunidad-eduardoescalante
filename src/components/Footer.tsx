import { Link } from "react-router-dom";
import { Heart, Globe, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    comunidad: [
      { name: "Recursos", href: "/recursos" },
      { name: "Foro", href: "/foro" },
      { name: "Miembros", href: "/miembros" },
      { name: "Eventos", href: "/eventos" },
    ],
    soporte: [
      { name: "Centro de Ayuda", href: "/ayuda" },
      { name: "Contacto", href: "/contacto" },
      { name: "Reportar Problema", href: "/reporte" },
      { name: "Estado del Servicio", href: "/estado" },
    ],
    legal: [
      { name: "Términos de Servicio", href: "/terminos" },
      { name: "Política de Privacidad", href: "/privacidad" },
      { name: "Cookies", href: "/cookies" },
      { name: "Código de Conducta", href: "/codigo-conducta" },
    ],
  };

  const socialLinks = [
    { name: "Twitter", href: "https://twitter.com/eduardoescalante", icon: Twitter },
    { name: "LinkedIn", href: "https://linkedin.com/in/eduardoescalante", icon: Linkedin },
    { name: "GitHub", href: "https://github.com/eduardoescalante", icon: Github },
    { name: "Website", href: "https://eduardoescalante.com", icon: Globe },
  ];

  return (
    <footer className="bg-muted/30 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">CE</span>
              </div>
              <span className="font-bold text-xl">Comunidad Eduardo Escalante</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Una comunidad exclusiva para aprender, crecer y conectar con otros profesionales 
              apasionados por el desarrollo y la tecnología.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Comunidad</h3>
            <ul className="space-y-2">
              {footerLinks.comunidad.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2">
              {footerLinks.soporte.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Eduardo Escalante. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-1 text-muted-foreground text-sm mt-4 md:mt-0">
              <span>Hecho con</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>para la comunidad</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
