# 🛒 E-commerce Template (Full Stack)

Este es un proyecto completo de E-commerce desarrollado con una arquitectura moderna monorepo. Consta de tres partes principales:

1.  **Backend (API):** Node.js, Express, Prisma (PostgreSQL).
2.  **Admin Panel:** React + Vite (Gestión de productos, categorías y ventas).
3.  **Store (Cliente):** React + Vite (Tienda pública con carrito de compras persistente).

---

## 🚀 Requisitos Previos

* **Node.js** (v18 o superior)
* **PostgreSQL** (Tener un servidor de base de datos corriendo localmente o en la nube)

---

## 🛠️ Instalación y Configuración

Sigue estos pasos en orden para levantar todo el ecosistema.

### 1. Configurar el Backend y Base de Datos

Entra a la carpeta del backend e instala las dependencias:

```bash
cd backend
npm install

Crea un archivo .env en la carpeta backend/ con la configuración de tu entorno:

Fragmento de código

DATABASE_URL="postgresql://usuario:password@localhost:5432/nombre_base_datos?schema=public"
PORT=3000
JWT_SECRET="tu_palabra_secreta_super_segura"
Ejecuta las migraciones para crear las tablas en la base de datos:

Bash

npx prisma migrate dev
(Opcional) Crear el primer usuario Administrador: Si necesitas un admin para entrar al panel, ejecuta el script de semilla incluido:

Bash

node create-admin.js
Levanta el servidor:

Bash

npm run dev
El servidor API correrá en http://localhost:3000

2. Levantar el Panel de Administración (Admin)
Abre una nueva terminal, entra a la carpeta admin e inicia:

Bash

cd admin
npm install
npm run dev
Normalmente correrá en http://localhost:5173. Credenciales: Usa el email y contraseña que definiste en el paso anterior o en el script create-admin.js.

3. Levantar la Tienda (Store)
Abre una tercera terminal, entra a la carpeta store e inicia:

Bash

cd store
npm install
npm run dev
Normalmente correrá en http://localhost:5174 (Vite asigna el siguiente puerto libre automáticamente).

📚 Tecnologías Utilizadas
Backend
Node.js & Express: Servidor RESTful.

TypeScript: Tipado estático para mayor seguridad.

Prisma ORM: Manejo de base de datos PostgreSQL.

Auth: JWT (JSON Web Tokens) y bcryptjs para encriptación.

Frontend (Admin & Store)
React: Librería de UI.

Vite: Bundler rápido.

Tailwind CSS: Estilos modernos y responsivos.

React Router DOM: Navegación SPA.

Zustand: Gestión de estado global (Carrito de compras).

Lucide React: Iconos.

✨ Funcionalidades Clave
✅ Carrito Persistente: Los productos guardados en el carrito no se pierden al recargar la página.

✅ Control de Stock (Transacciones): El backend utiliza transacciones ACID para asegurar que nunca se venda un producto sin stock.

✅ Rutas Protegidas: El panel de Admin redirige al login si no existe una sesión activa.

✅ Gestión Completa: CRUD de Productos y Categorías, visualización de Órdenes de compra.

📝 Estructura del Proyecto
Plaintext

/
├── admin/      # Panel de control para el dueño del negocio
├── backend/    # API, Lógica de negocio y Base de datos
└── store/      # Tienda visible para los clientes