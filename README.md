<h1 align="center">Hotel Ventura API</h1>
<h3 align="center">Backend para la gestión integral de un hotel | NestJS · Prisma · PostgreSQL</h3>


---


## Resumen breve


Hotel Ventura API es un backend modular construido con NestJS y Prisma que gestiona reservas, estancias, facturación, pagos y usuarios para un hotel.


---


## Principios de diseño aplicados


Este repositorio implementa buenas prácticas vistas en el taller formativo. En particular:


- **SOLID**
- **Open/Closed (OCP)**: los servicios están diseñados para que nuevas formas de cálculo o reglas se agreguen mediante estrategias o nuevas implementaciones sin modificar las clases existentes. Ejemplo: `src/reservas/pricing/*`.
- **Dependency Inversion (DIP)**: los servicios dependen de abstracciones (interfaces y tokens) y no de implementaciones concretas. Ejemplo: `IReservaRepository` + `ReservaPrismaRepository`.


- **Patrones de diseño**
- **Repository Pattern**: encapsula el acceso a Prisma en repositorios concretos (`src/*/repositories/*`).
- **Strategy Pattern**: para lógica variable (cálculo de tarifas, reglas de facturación), se inyectan estrategias (`src/*/pricing/*`).


> Nota: Single Responsibility Principle (SRP) fue revisado en el taller y se aplicó organizando controladores, servicios y repositorios en capas separadas.


---


## Módulos afectados / ejemplo aplicado


Se aplicó el refactor y buenas prácticas en el módulo **reservas** como ejemplo canónico. Cambios clave:


- Creación de interfaz `IReservaRepository` en `src/reservas/interfaces`
- Implementación `ReservaPrismaRepository` en `src/reservas/repositories`
- Separación de cálculo de tarifas con `NightlyPricingStrategy` y `HourlyPricingStrategy` en `src/reservas/pricing`
- `ReservasService` inyecta el `RESERVA_REPOSITORY` y las estrategias mediante tokens — esto facilita testeo y extensión sin tocar código existente.


Para replicar el mismo patrón en otros módulos (estancias, facturas, habitaciones), crea:


- `interfaces/*-repository.interface.ts`
- `repositories/*-prisma.repository.ts`
- `pricing/*` o `strategies/*` según necesidad
- Modifica `*.module.ts` para registrar providers con tokens


---


## Archivos modificados (lista para commit)


- `src/reservas/interfaces/reserva-repository.interface.ts` (nuevo)
- `src/reservas/repositories/reserva.prisma.repository.ts` (nuevo)
- `src/reservas/interfaces/pricing-strategy.interface.ts` (nuevo)
- `src/reservas/pricing/nightly-pricing.strategy.ts` (nuevo)
- `src/reservas/pricing/hourly-pricing.strategy.ts` (nuevo)
- `src/reservas/reservas.service.ts` (reemplazado)
- `src/reservas/reservas.module.ts` (reemplazado)
- `README.md` (reemplazado/actualizado)


---


## Instrucciones para aplicar los cambios (local)


1. Extrae el repositorio y ubícate en la carpeta raíz `Hotel-ventura`.
2. Reemplaza/crea los archivos indicados con el contenido provisto en este documento.
3. Ejecuta pruebas rápidas (si aplica):


```bash
npm install
npm run build
npm run start:dev
