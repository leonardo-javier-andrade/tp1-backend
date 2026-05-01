# CLI User  System (MySQL)
Este proyecto es una herramienta de línea de comandos (CLI) desarrollada en Node.js que permite gestionar un sistema de usuarios conectado a una base de datos MySQL. Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) aplicando validaciones estrictas de datos.

## 📋 Requisitos
Node.js (Versión 16 o superior)

MySQL Server

Dependencias del proyecto: npm install

### 🛠️ Configuración de la Base de Datos
Antes de ejecutar el programa, debes crear la base de datos y la tabla correspondiente. Ejecuta los siguientes comandos en tu gestor de MySQL:

#### SQL
**-- 1.** Crear la base de datos
CREATE DATABASE tp_backend;

**-- 2.** Usar la base de datos
USE tp_backend;

**-- 3.** Crear la tabla de usuarios
CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50)  ,
    email VARCHAR(50)  ,
    password VARCHAR(50) 
);
Nota: Verifica que los datos de acceso en config.js (host, user, password) coincidan con tu configuración local.

## 🚀 Modo de Uso

El sistema funciona mediante argumentos en la terminal utilizando el comando base npm run dev.

#### 1.  Listar Usuarios

Muestra todos los registros actuales en la base de datos.

Bash
npm run dev get

#### 2. Agregar Usuario
Crea un nuevo registro validando que todos los campos cumplan los requisitos.

Bash
npm run dev add <username> <email> <password>

#### 3. Actualizar Usuario
Modifica los datos de un usuario existente mediante su ID.

Bash
npm run dev update <username> <email> <password> <id>

#### 4. Eliminar Usuario
Borra un registro de la base de datos según el ID proporcionado.

## Bash
npm run dev delete <id>
🛡️ Sistema de Validaciones
El proyecto implementa un doble filtro de seguridad para garantizar que la información sea consistente y segura.

***1. Validaciones de Datos (Sintácticas)***
Se utilizan Expresiones Regulares (Regex) y métodos de cadena para filtrar la entrada:

+ _Username:_ Debe contener solo letras y tener una longitud mínima de 3 caracteres.

+ _Email:_ Se restringe el uso exclusivamente a dominios @gmail.com.

+ _Password:_ Debe tener al menos 6 caracteres e incluir de forma obligatoria al menos una Mayúscula y un Número.

***2. Validaciones de Función (Lógica de Negocio)***
Para evitar que las actualizaciones vulneren las condiciones iniciales de seguridad, el sistema aplica la función comprobacionDatos() en dos momentos críticos:

En la Creación (add): Bloquea la entrada de cualquier usuario que no cumpla con los estándares desde el inicio.

En la Actualización (update): Aunque el usuario ya exista, cualquier intento de modificación es re-evaluado por los mismos filtros. Esto garantiza que un usuario no pueda cambiar su nombre por uno inválido o degradar su contraseña a una menos segura después de haber sido creado.

***3. Validación de Existencia***
Tanto en las funciones de updateUser como en deleteUser, el sistema verifica el parámetro affectedRows devuelto por MySQL. Si el ID proporcionado no existe, el sistema informa al usuario en lugar de intentar una operación fallida en la base de datos.

### 🏗️ Estructura del Proyecto

**index.js:** Punto de entrada, manejo de argumentos CLI y lógica de flujo.

**controllers.js:** Funciones asíncronas para la comunicación directa con SQL.

**config.js:** Configuración del pool de conexiones a la base de datos.

**package.json:** Definición de scripts y dependencias (mysql2).