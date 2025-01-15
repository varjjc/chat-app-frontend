# Frontend de Chat en Tiempo Real para Clases Virtuales

Este es el frontend de una aplicación de chat en tiempo real diseñada para clases virtuales. La aplicación permite a los usuarios registrarse, iniciar sesión y comunicarse en tiempo real a través de un chat moderno, utilizando **React** y **Material-UI**.

## **Características**

- Registro e inicio de sesión de usuarios con validación de formularios.
- Chat en tiempo real con envío y recepción instantánea de mensajes.
- Diseño moderno y responsivo utilizando **Material-UI**.
- Manejo de estado con **React Hooks**.
- Comunicación con el backend a través de **Axios** y **Socket.IO**.

## **Requisitos previos**

- **Node.js** (v14 o superior)
- **npm** o **yarn**

## **Instalación**

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu_usuario/chat-app-frontend.git
   cd chat-app-frontend

2. **Instalar las dependencias**
    npm install

3.  **Iniciar la aplicación**
      npm start - se abrirá en el puerto 3000

## **Estructura del proyecto**

src/
├── components/            # Componentes principales (Login, Register, Chat)
├── services/              # Servicios de API y configuración de Socket.IO
├── App.js                 # Componente principal de la aplicación
├── index.js               # Punto de entrada de la aplicación
├── App.css                # Estilos generales de la aplicación
├── index.css              # Estilos globales
└── .env                   # Variables de entorno


Componentes principales
-Login
Permite a los usuarios autenticarse.
Valida el formulario antes de enviar los datos al backend.
Guarda el token JWT en localStorage para futuras solicitudes.
-Register
Permite registrar nuevos usuarios.
Valida el formulario antes de enviar los datos al backend.
-Chat
Muestra un chat en tiempo real donde los usuarios pueden enviar y recibir mensajes.
Obtiene el historial de mensajes desde el backend.
Utiliza Socket.IO para la comunicación en tiempo real.
Muestra el nombre del usuario que envió cada mensaje.
-Tecnologías utilizadas
React: Biblioteca de JavaScript para construir interfaces de usuario.
Material-UI: Biblioteca de componentes UI para React.
Axios: Cliente HTTP para hacer solicitudes al backend.
Socket.IO Client: Biblioteca para manejar la comunicación en tiempo real con el backend.
dotenv: Manejo de variables de entorno.
