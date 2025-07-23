# Comunidad Eduardo Escalante

Una plataforma de comunidad exclusiva para profesionales del desarrollo y la tecnología, donde pueden acceder a recursos premium, participar en discusiones y conectar con otros miembros.

## 🚀 Características

- **Autenticación de usuarios** - Sistema completo de login, registro y recuperación de contraseña
- **Recursos educativos** - Biblioteca de recursos gratuitos y premium
- **Foro de discusión** - Categorías organizadas para diferentes temas
- **Panel de administración** - Gestión completa de contenido y usuarios
- **Perfiles de usuario** - Gestión de información personal y actividad
- **Diseño responsivo** - Optimizado para todos los dispositivos
- **Interfaz en español** - Completamente localizada

## 🛠️ Tecnologías

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod
- **State Management**: React Context API
- **Icons**: Lucide React

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/eduardoescalante/comunidad-eduardoescalante.git
cd comunidad-eduardoescalante
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

## 🏗️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## 🔐 Acceso de Administrador

Para acceder al panel de administración, usa las siguientes credenciales:

- **Email**: `admin@eduardoescalante.com`
- **Contraseña**: Cualquier contraseña de al menos 6 caracteres

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes de UI (shadcn/ui)
│   ├── LoginForm.tsx   # Formulario de inicio de sesión
│   ├── AdminPanel.tsx  # Panel de administración
│   └── ...
├── context/            # Contextos de React
│   └── ResourcesContext.tsx
├── pages/              # Páginas de la aplicación
│   ├── Home.tsx        # Página principal
│   ├── Admin.tsx       # Panel de administración
│   └── ...
├── lib/                # Utilidades
│   └── utils.ts
├── App.tsx             # Componente principal
└── main.tsx           # Punto de entrada
```

## 🎨 Diseño

El diseño mantiene coherencia con el sitio principal de Eduardo Escalante, utilizando:

- Paleta de colores personalizada
- Componentes de shadcn/ui
- Diseño responsivo con Tailwind CSS
- Tipografía consistente
- Modo oscuro/claro

## 🚀 Despliegue

### Netlify (Recomendado)

1. Conecta tu repositorio a Netlify
2. Configura los siguientes ajustes:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Despliega automáticamente

### Vercel

1. Conecta tu repositorio a Vercel
2. La configuración se detecta automáticamente
3. Despliega con un clic

### Manual

1. Construye la aplicación:
```bash
npm run build
```

2. Sube el contenido de la carpeta `dist` a tu servidor web

## 🔧 Configuración de Backend

Para conectar con un backend real, necesitarás:

1. **Base de datos**: Usar el esquema SQL en `src/database/comunidad_tables.sql`
2. **API REST**: Implementar endpoints para:
   - Autenticación (`/api/auth/login`, `/api/auth/register`)
   - Recursos (`/api/resources`)
   - Foro (`/api/forum`)
   - Usuarios (`/api/users`)
3. **Variables de entorno**: Configurar URLs de API

## 📝 Próximas Funcionalidades

- [ ] Integración con backend real
- [ ] Sistema de notificaciones
- [ ] Búsqueda avanzada
- [ ] Sistema de puntos/gamificación
- [ ] Integración con redes sociales
- [ ] API REST completa
- [ ] Tests automatizados

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

Eduardo Escalante - [@eduardoescalante](https://twitter.com/eduardoescalante)

Sitio web: [https://eduardoescalante.com](https://eduardoescalante.com)

---

⭐ ¡No olvides dar una estrella al proyecto si te ha sido útil!
