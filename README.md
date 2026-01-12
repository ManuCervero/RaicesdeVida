# Raíces de Vida 🕯️

Tienda online de velas de soja, aromatizadores y fragancias para el hogar hecha a mano.

![Raíces de Vida Banner](https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800)

## 🛠️ Tecnologías

- **Frontend:** React 18, Tailwind CSS, Lucide Icons, React Router DOM.
- **Backend:** Supabase (PostgreSQL).

## 📥 CÓMO SUBIR A GITHUB MANUALMENTE

Si tuviste problemas con la terminal, sigue estos pasos sencillos para subir tu web:

1. **Descargar Archivos:** 
   - Descarga todos los archivos de este proyecto a tu computadora (normalmente como `.zip`).
   - Descomprime la carpeta.

2. **Crear Repositorio en GitHub:**
   - Ve a [GitHub.com/new](https://github.com/new).
   - Nombre: `raices-de-vida` (o el que quieras).
   - Público.
   - Click en **Create repository**.

3. **Subir Archivos (Web Upload):**
   - En la pantalla siguiente de GitHub, busca el enlace que dice **"uploading an existing file"** (está en el texto pequeño debajo del título Quick setup).
   - Arrastra todos los archivos de tu carpeta descomprimida a esa ventana.
   - **IMPORTANTE:** No arrastres la carpeta `node_modules` si es que la tienes (es una carpeta muy pesada con miles de archivos). Solo los archivos de código (`src`, `public`, `package.json`, etc.).
   - Espera a que carguen.
   - Abajo donde dice "Commit changes", escribe: "Versión inicial".
   - Click en **Commit changes**.

### ⚠️ ¿No encuentras el archivo .gitignore?
Es normal que archivos que empiezan con punto (`.`) se oculten en Windows o Mac. Si no se subió, créalo manualmente en GitHub:

1. En tu repositorio, haz clic en **Add file** > **Create new file**.
2. Ponle de nombre: `.gitignore`
3. Pega este contenido:
   ```text
   node_modules
   .env
   dist
   .DS_Store
   ```
4. Guarda el archivo ("Commit changes").

## 🖼️ CÓMO USAR TUS PROPIAS FOTOS

Para usar tus fotos en lugar de las de demostración:

1. Crea una carpeta llamada `images` dentro de la carpeta `public` en tu computadora antes de subir, o súbelas directamente a GitHub en esa ruta (`public/images`).
2. Sube tus fotos ahí (ej: `vela-vainilla.jpg`).
3. Abre el archivo `constants.ts` (puedes editarlo directo en GitHub).
4. Cambia la configuración así:
   ```typescript
   export const IMAGE_SOURCE = {
     mode: 'github', // Cambiar 'unsplash' por 'github'
     github: {
       user: 'TU_USUARIO_GITHUB', // Tu nombre de usuario real
       repo: 'raices-de-vida',    // El nombre de tu repo
       branch: 'main',
       folder: 'public/images'
     }
   };
   ```
5. GitHub servirá tus imágenes automáticamente.

## 🚀 Instalación Local (Desarrolladores)

1. Clonar: `git clone https://github.com/tu-usuario/raices-de-vida.git`
2. Instalar: `npm install`
3. Correr: `npm run dev`
