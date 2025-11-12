import { Module } from '@nestjs/common';
import { TiposHabitacionController } from './tipos-habitacion.controller';
import { TiposHabitacionService } from './tipos-habitacion.service';
import { PrismaService } from '../database/prisma/prisma.service';



@Module({
  controllers: [TiposHabitacionController],
  providers: [TiposHabitacionService, PrismaService],
  exports: [TiposHabitacionService],
})
export class TiposHabitacionModule {}
