# Learning Vault – Frontend

Aplicación web desarrollada con React + Vite que permite gestionar contenido de estudio organizado en estructuras jerárquicas.

El sistema permite a cada usuario crear su propio espacio de aprendizaje organizando contenido en:

Boards → Sections → Classes → Blocks

La aplicación consume la API desarrollada en el backend.

---

## Tecnologías utilizadas

- React
- Vite
- React Router
- Context API
- CSS
- Fetch API

---

## Funcionalidades

- Registro de usuarios
- Login con autenticación JWT
- Verificación de cuenta por email
- Creación de boards
- Organización en sections
- Creación de clases dentro de cada sección
- Creación de bloques de contenido
- Eliminación de contenido
- Interfaz responsive

---

## Instalación

1. Clonar el repositorio
git clone https://github.com/alexia-cnt/learning-vault-frontend.git
cd learning-vault-frontend

2. Instalar dependencias
npm install

---

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

Ejemplo:
VITE_API_URL=http://localhost:4000


---

## Ejecutar la aplicación

npm run dev

La aplicación estará disponible en: http://localhost:5173

---

## Usuario de prueba

Se puede acceder con el siguiente usuario:

Email: test6@test.com
Password: Password123

---

## Mejoras futuras

Algunas funcionalidades previstas para futuras versiones de la interfaz:

- El botón de editar (el icono del lapiz) actualmente es solo visual. En futuras versiones permitirá modificar el nombre de los elementos.
- El candado de privacidad actualmente es visual. Más adelante permitirá marcar los tableros como públicos o privados.
- Cuando un tablero sea público, aparecerá automáticamente en la pestaña "Social" para que otros usuarios puedan explorarlo.
- Ampliar completamente la pestaña "Social" para descubrir nuevos tableros creados por otros usuarios.
- Mejorar la interfaz del listado de tableros para una navegación más clara y linda.
- Permitir asignar color y una breve descripción a cada tablero para facilitar la organización visual.
- Implementar la posibilidad de duplicar tableros completos para reutilizar estructuras de estudio ya existentes.
- Permitir exportar tableros a formatos como PDF o Markdown, para poder estudiar el contenido fuera de la aplicación o compartirlo fácilmente.

---

## Repositorio

Frontend:  
https://github.com/alexia-cnt/learning-vault-frontend