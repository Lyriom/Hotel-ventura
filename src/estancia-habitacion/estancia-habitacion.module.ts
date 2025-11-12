import { Module } from '@nestjs/common';
import { EstanciaHabitacionController } from './estancia-habitacion.controller';
import { EstanciaHabitacionService } from './estancia-habitacion.service';
import { PrismaService } from '../database/prisma/prisma.service';

@Module({
  controllers: [EstanciaHabitacionController],
  providers: [EstanciaHabitacionService, PrismaService],
})
export class EstanciaHabitacionModule {}
