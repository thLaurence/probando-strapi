# Proyecto de Aplicación Web

Este proyecto es una aplicación web que incluye tanto el **frontend** como el **backend**, con una conexión a una base de datos **SQLite**. El sistema está configurado para permitirte realizar pruebas en un entorno local, con un **panel de administración Strapi** para gestionar el contenido.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- **Node.js**: Recomendado v14 o superior.
- **npm**: Se instala automáticamente junto con Node.js.

## Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

### 1. Clonar el repositorio

Clona este repositorio en tu máquina:

```bash
git clone <url-del-repositorio>
cd <nombre-del-repositorio>
```

### 2. Instalación de dependencias

#### Frontend

En el directorio del frontend, instala las dependencias necesarias:

```bash
cd frontend
npm install
```

#### Backend

En el directorio del backend, instala las dependencias necesarias:

```bash
cd backend
npm install
```

## Configuración de Entorno de Desarrollo

### 1. Iniciar el Frontend

Para iniciar el frontend en un entorno de desarrollo, ejecuta:

```bash
cd frontend
npm run dev
```

Esto iniciará el servidor de desarrollo en `http://localhost:3000`.

### 3. Crear el .env

En este .env esta el token básico para crear y visualizar contenido, acceder a la carpeta frontend, crear el .env y pegar el contenido:

NEXT_PUBLIC_TOKEN = "c563bf68ed0dc37c777cbb0cf0e5b5595130118eed7b77089ce4a1e584c637788f9865dd46f82e71b94864064c8dd9723f5fffaa66a5def744269ebe5f49d425a988a2ac69237b82dc392e14a0a1d37b4e875a8d5505ada7b9221e74103cac6e74a98262e6df3bb6ca6a5a8ad9e855ebbcd99b09210465f910e0d23e8b3d25b5"

### 4. Iniciar el Backend

Para iniciar el backend en un entorno de desarrollo, ejecuta:

```bash
cd backend
npm run develop
```

Esto iniciará el servidor de desarrollo en `http://localhost:1337` y podrás acceder al panel de administración de Strapi.

## Acceso al Panel de Administración (Strapi)

Puedes acceder a Strapi para gestionar el contenido con las siguientes credenciales:

- **Usuario**: `thomaslaurence@gmail.com`
- **Contraseña**: `Admin123`

Una vez accedas, podrás crear, modificar y eliminar contenido de la base de datos.

## Base de Datos

Este proyecto utiliza **SQLite** como base de datos por defecto. Asegúrate de que el archivo de base de datos esté configurado correctamente y accesible desde el backend.
