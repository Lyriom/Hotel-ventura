/*
  Warnings:

  - A unique constraint covering the columns `[Correo]` on the table `Clientes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[DocumentoIdentidad]` on the table `Clientes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[IdEstancia,IdHabitacion]` on the table `EstanciaHabitacion` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[IdReserva,IdCliente]` on the table `Estancias` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[NumeroFactura]` on the table `Facturas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Numero]` on the table `Habitaciones` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[IdReserva,IdHabitacion]` on the table `ReservaHabitacion` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[CodigoReserva]` on the table `Reservas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[NombreRol]` on the table `Roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[NombreTipo]` on the table `TiposHabitacion` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Usuario]` on the table `Usuarios` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "TiposHabitacion" ALTER COLUMN "PrecioBaseNoche" DROP NOT NULL,
ALTER COLUMN "PrecioBaseHora" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_Correo_key" ON "Clientes"("Correo");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_DocumentoIdentidad_key" ON "Clientes"("DocumentoIdentidad");

-- CreateIndex
CREATE INDEX "DetalleFactura_IdFactura_idx" ON "DetalleFactura"("IdFactura");

-- CreateIndex
CREATE INDEX "DetalleFactura_IdEstanciaHabitacion_idx" ON "DetalleFactura"("IdEstanciaHabitacion");

-- CreateIndex
CREATE INDEX "EstanciaHabitacion_IdHabitacion_idx" ON "EstanciaHabitacion"("IdHabitacion");

-- CreateIndex
CREATE UNIQUE INDEX "EstanciaHabitacion_IdEstancia_IdHabitacion_key" ON "EstanciaHabitacion"("IdEstancia", "IdHabitacion");

-- CreateIndex
CREATE INDEX "Estancias_IdCliente_idx" ON "Estancias"("IdCliente");

-- CreateIndex
CREATE UNIQUE INDEX "Estancias_IdReserva_IdCliente_key" ON "Estancias"("IdReserva", "IdCliente");

-- CreateIndex
CREATE UNIQUE INDEX "Facturas_NumeroFactura_key" ON "Facturas"("NumeroFactura");

-- CreateIndex
CREATE INDEX "Facturas_IdCliente_idx" ON "Facturas"("IdCliente");

-- CreateIndex
CREATE INDEX "Facturas_IdEstancia_idx" ON "Facturas"("IdEstancia");

-- CreateIndex
CREATE INDEX "Facturas_IdUsuario_idx" ON "Facturas"("IdUsuario");

-- CreateIndex
CREATE UNIQUE INDEX "Habitaciones_Numero_key" ON "Habitaciones"("Numero");

-- CreateIndex
CREATE INDEX "Habitaciones_IdTipoHabitacion_idx" ON "Habitaciones"("IdTipoHabitacion");

-- CreateIndex
CREATE INDEX "Pagos_IdFactura_idx" ON "Pagos"("IdFactura");

-- CreateIndex
CREATE INDEX "ReservaHabitacion_IdHabitacion_idx" ON "ReservaHabitacion"("IdHabitacion");

-- CreateIndex
CREATE UNIQUE INDEX "ReservaHabitacion_IdReserva_IdHabitacion_key" ON "ReservaHabitacion"("IdReserva", "IdHabitacion");

-- CreateIndex
CREATE UNIQUE INDEX "Reservas_CodigoReserva_key" ON "Reservas"("CodigoReserva");

-- CreateIndex
CREATE INDEX "Reservas_IdCliente_idx" ON "Reservas"("IdCliente");

-- CreateIndex
CREATE INDEX "Reservas_IdUsuario_idx" ON "Reservas"("IdUsuario");

-- CreateIndex
CREATE UNIQUE INDEX "Roles_NombreRol_key" ON "Roles"("NombreRol");

-- CreateIndex
CREATE UNIQUE INDEX "TiposHabitacion_NombreTipo_key" ON "TiposHabitacion"("NombreTipo");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_Usuario_key" ON "Usuarios"("Usuario");
