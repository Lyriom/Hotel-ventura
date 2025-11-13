import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateHabitacionDto } from './dto/create-habitacion.dto';
import { UpdateHabitacionDto } from './dto/update-habitacion.dto';

@Injectable()
export class HabitacionesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateHabitacionDto) {
    return this.prisma.habitaciones.create({
      data,
    });
  }

  findAll() {
    return this.prisma.habitaciones.findMany({
      orderBy: { IdHabitacion: 'asc' },
      include: {
        TipoHabitacion: true,
      },
    });
  }

  async findOne(id: number) {
    const habitacion = await this.prisma.habitaciones.findUnique({
      where: { IdHabitacion: id },
      include: {
        TipoHabitacion: true,
      },
    });

    if (!habitacion) {
      throw new NotFoundException('Habitación no encontrada');
    }

    return habitacion;
  }

  async update(id: number, data: UpdateHabitacionDto) {
    await this.findOne(id);

    return this.prisma.habitaciones.update({
      where: { IdHabitacion: id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.habitaciones.delete({
      where: { IdHabitacion: id },
    });
  }
}
