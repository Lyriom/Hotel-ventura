-- DropForeignKey
ALTER TABLE "public"."Reservas" DROP CONSTRAINT "Reservas_IdUsuario_fkey";

-- AlterTable
ALTER TABLE "Reservas" ALTER COLUMN "IdUsuario" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Reservas" ADD CONSTRAINT "Reservas_IdUsuario_fkey" FOREIGN KEY ("IdUsuario") REFERENCES "Usuarios"("IdUsuario") ON DELETE SET NULL ON UPDATE CASCADE;
