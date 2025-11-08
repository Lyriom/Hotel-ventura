/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Roles" (
    "IdRol" SERIAL NOT NULL,
    "NombreRol" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("IdRol")
);

-- CreateTable
CREATE TABLE "Usuarios" (
    "IdUsuario" SERIAL NOT NULL,
    "Nombre" TEXT NOT NULL,
    "Usuario" TEXT NOT NULL,
    "ContrasenaHash" TEXT NOT NULL,
    "IdRol" INTEGER NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("IdUsuario")
);

-- CreateTable
CREATE TABLE "Clientes" (
    "IdCliente" SERIAL NOT NULL,
    "Nombre" TEXT NOT NULL,
    "Apellido" TEXT NOT NULL,
    "Ciudad" TEXT NOT NULL,
    "Correo" TEXT NOT NULL,
    "Telefono" TEXT NOT NULL,
    "DocumentoIdentidad" TEXT,

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("IdCliente")
);

-- CreateTable
CREATE TABLE "TiposHabitacion" (
    "IdTipoHabitacion" SERIAL NOT NULL,
    "NombreTipo" TEXT NOT NULL,
    "Capacidad" INTEGER NOT NULL,
    "PrecioBaseNoche" DECIMAL(65,30) NOT NULL,
    "PrecioBaseHora" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "TiposHabitacion_pkey" PRIMARY KEY ("IdTipoHabitacion")
);

-- CreateTable
CREATE TABLE "Habitaciones" (
    "IdHabitacion" SERIAL NOT NULL,
    "Numero" TEXT NOT NULL,
    "IdTipoHabitacion" INTEGER NOT NULL,
    "NumeroCamas" INTEGER NOT NULL,
    "TipoTV" TEXT NOT NULL,
    "Estado" TEXT NOT NULL,

    CONSTRAINT "Habitaciones_pkey" PRIMARY KEY ("IdHabitacion")
);

-- CreateTable
CREATE TABLE "Reservas" (
    "IdReserva" SERIAL NOT NULL,
    "CodigoReserva" TEXT,
    "IdCliente" INTEGER NOT NULL,
    "IdUsuario" INTEGER NOT NULL,
    "FechaReserva" TIMESTAMP(3),
    "FechaEntradaPrevista" TIMESTAMP(3),
    "FechaSalidaPrevista" TIMESTAMP(3),
    "Estado" TEXT NOT NULL,
    "MontoTotalEstimado" DECIMAL(65,30),
    "Observaciones" TEXT,

    CONSTRAINT "Reservas_pkey" PRIMARY KEY ("IdReserva")
);

-- CreateTable
CREATE TABLE "ReservaHabitacion" (
    "IdReservaHabitacion" SERIAL NOT NULL,
    "IdReserva" INTEGER NOT NULL,
    "IdHabitacion" INTEGER NOT NULL,
    "PrecioPorNoche" DECIMAL(65,30),
    "PrecioPorHora" DECIMAL(65,30),
    "CantidadNoches" INTEGER,
    "CantidadHoras" INTEGER,
    "Subtotal" DECIMAL(65,30),

    CONSTRAINT "ReservaHabitacion_pkey" PRIMARY KEY ("IdReservaHabitacion")
);

-- CreateTable
CREATE TABLE "Estancias" (
    "IdEstancia" SERIAL NOT NULL,
    "IdReserva" INTEGER NOT NULL,
    "IdCliente" INTEGER NOT NULL,
    "FechaCheckIn" TIMESTAMP(3),
    "HoraCheckIn" TIMESTAMP(3),
    "FechaCheckOut" TIMESTAMP(3),
    "HoraCheckOut" TIMESTAMP(3),
    "MontoTotalFinal" DECIMAL(65,30),
    "Estado" TEXT NOT NULL,

    CONSTRAINT "Estancias_pkey" PRIMARY KEY ("IdEstancia")
);

-- CreateTable
CREATE TABLE "EstanciaHabitacion" (
    "IdEstanciaHabitacion" SERIAL NOT NULL,
    "IdEstancia" INTEGER NOT NULL,
    "IdHabitacion" INTEGER NOT NULL,
    "FechaEntradaReal" TIMESTAMP(3),
    "HoraEntradaReal" TIMESTAMP(3),
    "FechaSalidaReal" TIMESTAMP(3),
    "HoraSalidaReal" TIMESTAMP(3),
    "TarifaPorNoche" DECIMAL(65,30),
    "TarifaPorHora" DECIMAL(65,30),
    "CantidadNoches" INTEGER,
    "CantidadHoras" INTEGER,
    "Subtotal" DECIMAL(65,30),

    CONSTRAINT "EstanciaHabitacion_pkey" PRIMARY KEY ("IdEstanciaHabitacion")
);

-- CreateTable
CREATE TABLE "Facturas" (
    "IdFactura" SERIAL NOT NULL,
    "NumeroFactura" TEXT NOT NULL,
    "IdCliente" INTEGER NOT NULL,
    "IdEstancia" INTEGER NOT NULL,
    "IdUsuario" INTEGER NOT NULL,
    "FechaEmision" TIMESTAMP(3) NOT NULL,
    "Subtotal" DECIMAL(65,30) NOT NULL,
    "Impuesto" DECIMAL(65,30) NOT NULL,
    "Total" DECIMAL(65,30) NOT NULL,
    "Estado" TEXT NOT NULL,

    CONSTRAINT "Facturas_pkey" PRIMARY KEY ("IdFactura")
);

-- CreateTable
CREATE TABLE "DetalleFactura" (
    "IdDetalle" SERIAL NOT NULL,
    "IdFactura" INTEGER NOT NULL,
    "Concepto" TEXT NOT NULL,
    "Cantidad" DECIMAL(65,30) NOT NULL,
    "PrecioUnitario" DECIMAL(65,30) NOT NULL,
    "TotalLinea" DECIMAL(65,30) NOT NULL,
    "IdEstanciaHabitacion" INTEGER,

    CONSTRAINT "DetalleFactura_pkey" PRIMARY KEY ("IdDetalle")
);

-- CreateTable
CREATE TABLE "Pagos" (
    "IdPago" SERIAL NOT NULL,
    "IdFactura" INTEGER NOT NULL,
    "FechaPago" TIMESTAMP(3) NOT NULL,
    "Monto" DECIMAL(65,30) NOT NULL,
    "MetodoPago" TEXT NOT NULL,
    "Referencia" TEXT,
    "Estado" TEXT NOT NULL,

    CONSTRAINT "Pagos_pkey" PRIMARY KEY ("IdPago")
);

-- AddForeignKey
ALTER TABLE "Usuarios" ADD CONSTRAINT "Usuarios_IdRol_fkey" FOREIGN KEY ("IdRol") REFERENCES "Roles"("IdRol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habitaciones" ADD CONSTRAINT "Habitaciones_IdTipoHabitacion_fkey" FOREIGN KEY ("IdTipoHabitacion") REFERENCES "TiposHabitacion"("IdTipoHabitacion") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservas" ADD CONSTRAINT "Reservas_IdCliente_fkey" FOREIGN KEY ("IdCliente") REFERENCES "Clientes"("IdCliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservas" ADD CONSTRAINT "Reservas_IdUsuario_fkey" FOREIGN KEY ("IdUsuario") REFERENCES "Usuarios"("IdUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaHabitacion" ADD CONSTRAINT "ReservaHabitacion_IdReserva_fkey" FOREIGN KEY ("IdReserva") REFERENCES "Reservas"("IdReserva") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaHabitacion" ADD CONSTRAINT "ReservaHabitacion_IdHabitacion_fkey" FOREIGN KEY ("IdHabitacion") REFERENCES "Habitaciones"("IdHabitacion") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estancias" ADD CONSTRAINT "Estancias_IdReserva_fkey" FOREIGN KEY ("IdReserva") REFERENCES "Reservas"("IdReserva") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estancias" ADD CONSTRAINT "Estancias_IdCliente_fkey" FOREIGN KEY ("IdCliente") REFERENCES "Clientes"("IdCliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstanciaHabitacion" ADD CONSTRAINT "EstanciaHabitacion_IdEstancia_fkey" FOREIGN KEY ("IdEstancia") REFERENCES "Estancias"("IdEstancia") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstanciaHabitacion" ADD CONSTRAINT "EstanciaHabitacion_IdHabitacion_fkey" FOREIGN KEY ("IdHabitacion") REFERENCES "Habitaciones"("IdHabitacion") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facturas" ADD CONSTRAINT "Facturas_IdCliente_fkey" FOREIGN KEY ("IdCliente") REFERENCES "Clientes"("IdCliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facturas" ADD CONSTRAINT "Facturas_IdEstancia_fkey" FOREIGN KEY ("IdEstancia") REFERENCES "Estancias"("IdEstancia") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facturas" ADD CONSTRAINT "Facturas_IdUsuario_fkey" FOREIGN KEY ("IdUsuario") REFERENCES "Usuarios"("IdUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleFactura" ADD CONSTRAINT "DetalleFactura_IdFactura_fkey" FOREIGN KEY ("IdFactura") REFERENCES "Facturas"("IdFactura") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleFactura" ADD CONSTRAINT "DetalleFactura_IdEstanciaHabitacion_fkey" FOREIGN KEY ("IdEstanciaHabitacion") REFERENCES "EstanciaHabitacion"("IdEstanciaHabitacion") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagos" ADD CONSTRAINT "Pagos_IdFactura_fkey" FOREIGN KEY ("IdFactura") REFERENCES "Facturas"("IdFactura") ON DELETE RESTRICT ON UPDATE CASCADE;
