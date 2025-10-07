import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service'; // <- OJO: carpeta prisma/

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
