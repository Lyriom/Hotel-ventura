import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateTipoHabitacionDto } from './dto/create-tipo-habitacion.dto';
import { UpdateTipoHabitacionDto } from './dto/update-tipo-habitacion.dto';

@Injectable()
export class TiposHabitacionService {
  constructor(private prisma: PrismaService) {}

create(data: any) {
  // evita insertar el PK manualmente
  const { IdTipoHabitacion, ...safe } = data ?? {};
  return this.prisma.tiposHabitacion.create({ data: safe });
}

  findAll() {
    return this.prisma.tiposHabitacion.findMany({
      orderBy: { IdTipoHabitacion: 'asc' },
    });
  }

  async findOne(id: number) {
    const item = await this.prisma.tiposHabitacion.findUnique({
      where: { IdTipoHabitacion: id },
    });
    if (!item) throw new NotFoundException('Tipo de habitación no encontrado');
    return item;
  }

  async update(id: number, data: UpdateTipoHabitacionDto) {
    await this.findOne(id);
    return this.prisma.tiposHabitacion.update({
      where: { IdTipoHabitacion: id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.tiposHabitacion.delete({
      where: { IdTipoHabitacion: id },
    });
  }

  
}
