Learning Vault – Frontend

Aplicación web desarrollada con React + Vite que consume la API del backend para gestionar contenido educativo organizado en tableros.


Tecnologías utilizadas:

React
Vite
React Router
Axios
Bootstrap Icons
CSS personalizado
Funcionalidades implementadas
Registro de usuario
Verificación por email
Login con JWT

CRUD de:
Tableros
Secciones
Clases
Bloques
Protección de rutas
Barra de búsqueda global
Menú responsive móvil

Diseño completamente responsive (2000px – 320px)

Funcionalidades visuales preparadas (no activas aún):

Cambiar temas de colores.
Filtros por categorías en todas las rutas.
Listado de tableros a grilla de tableros.
Descripcion corta de cada tablero, sección o clase.

Para futuras versiones se dejaron preparadas visualmente:
Botón de editar
Filtros por tipo de contenido en clases (Texto / Imágenes / Videos)
Estas funcionalidades fueron diseñadas para expansión futura sin modificar la estructura principal.


Instalación y ejecución

1- Clonar repositorio
Bash
Copiar código
git clone <URL_DEL_REPO>
cd frontend

2- Instalar dependencias
Bash
Copiar código
npm install

3- Crear archivo .env
Copiar código

VITE_API_URL=http://localhost:4000/api

4- Ejecutar
Bash
Copiar código
npm run dev
App disponible en:

Copiar código
http://localhost:5173


Autenticación

El token JWT se almacena en localStorage y se envía automáticamente en las requests protegidas.


Credenciales válidas (con mail ya verificado):

name: test
email: test@test.com
password: 123456