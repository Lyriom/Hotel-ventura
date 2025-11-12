import { Module } from '@nestjs/common';
import { EstanciasController } from './estancias.controller';
import { EstanciasService } from './estancias.service';
import { PrismaService } from '../database/prisma/prisma.service';

@Module({
  controllers: [EstanciasController],
  providers: [EstanciasService, PrismaService],
})
export class EstanciasModule {}
