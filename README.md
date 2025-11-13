<h1 align="center">Hotel Ventura API</h1>
<h3 align="center">Backend para la gestión integral de un hotel | NestJS · Prisma · PostgreSQL</h3>

<p align="center">
  <img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" alt="divider">
</p>

---

## Tecnologías principales

### Backend y Lenguajes

<p align="left">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
</p>

### Acceso a datos y Base de datos

<p align="left">
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma ORM">
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
</p>

### Autenticación, herramientas y despliegue

<p align="left">
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT">
  <img src="https://img.shields.io/badge/Passport-34E27A?style=for-the-badge&logo=passport&logoColor=white" alt="Passport">
  <img src="https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white" alt="Railway">
  <img src="https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white" alt="VS Code">
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git">
</p>

---

## Descripción del proyecto

Hotel Ventura API es un backend construido con NestJS y Prisma que gestiona el ciclo completo de operación de un hotel:

- Autenticación y autorización con JWT.
- Administración de usuarios de login y personal interno del hotel.
- Gestión de clientes, tipos de habitación y habitaciones.
- Creación y manejo de reservas (planificación).
- Registro de estancias reales (check-in/check-out).
- Generación de facturas, detalle de factura y registro de pagos.

Está pensado para integrarse con un panel de administración y un frontend público, permitiendo controlar desde un solo backend:

- Reservas
- Estancias
- Facturación
- Pagos
- Usuarios y roles

---

## Arquitectura y módulos

La API está organizada de forma modular siguiendo las buenas prácticas de NestJS.

### Módulos principales

- `auth`  
  Maneja el registro, login y perfil del usuario autenticado. Implementa JWT y guards para proteger rutas.

- `users`  
  Usuarios de login (tabla `User`), con email, password y role lógico (`admin`, `recepcionista`, `cliente`).

- `roles`  
  Roles internos del hotel (tabla `Roles`), utilizados por el personal del hotel (módulo `usuarios`).

- `usuarios`  
  Personal del hotel: administradores, recepcionistas, etc. (tabla `Usuarios`), vinculados a `Roles`.

- `clientes`  
  Información de clientes finales del hotel (nombre, contacto, documento de identidad, etc.).

- `tipos-habitacion`  
  Catálogo de tipos de habitación (capacidad, precio por noche, precio por hora).

- `habitaciones`  
  Habitaciones físicas del hotel (número, tipo, estado, características).

- `reservas`  
  Reservas planificadas (fechas previstas, estado, relación con cliente y habitaciones a través de `ReservaHabitacion`).

- `estancias`  
  Estancias reales: check-in, check-out, monto final y estado.

- `estancia-habitacion`  
  Relación entre estancias y habitaciones ocupadas, con información de tarifas, noches/horas y subtotales.

- `facturas`  
  Facturación de las estancias: total, impuestos, usuario que emite la factura, estado.

- `detalle-factura`  
  Líneas de detalle por factura (concepto, cantidad, precio unitario, total por línea).

- `pagos`  
  Pagos realizados por factura (monto, método de pago, referencia y estado).

- `database / prisma`  
  Encapsula la conexión a la base de datos PostgreSQL mediante Prisma.

---

## Modelo de datos (resumen)

Algunos de los modelos definidos en `schema.prisma`:

- `User`  
  Usuario de login (email, password, role).

- `Roles`  
  `IdRol`, `NombreRol`, con relación a `Usuarios`.

- `Usuarios`  
  Personal del hotel (`IdUsuario`, `Nombre`, `Usuario`, `ContrasenaHash`, `IdRol`).

- `Clientes`  
  Información de clientes del hotel.

- `TiposHabitacion` y `Habitaciones`  
  Catálogo de tipos y habitaciones físicas.

- `Reservas` y `ReservaHabitacion`  
  Reservas planificadas y detalle de habitaciones reservadas.

- `Estancias` y `EstanciaHabitacion`  
  Estancias reales y detalle de habitaciones ocupadas con sus tarifas y subtotales.

- `Facturas`, `DetalleFactura` y `Pagos`  
  Facturación completa, conceptos de la factura y pagos asociados.

---
