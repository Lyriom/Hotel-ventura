import { Module } from '@nestjs/common';
import { DetalleFacturaController } from './detalle-factura.controller';
import { DetalleFacturaService } from './detalle-factura.service';
import { PrismaService } from '../database/prisma/prisma.service';

@Module({
  controllers: [DetalleFacturaController],
  providers: [DetalleFacturaService, PrismaService],
})
export class DetalleFacturaModule {}
