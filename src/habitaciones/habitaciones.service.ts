import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateHabitacionDto } from './dto/create-habitacion.dto';
import { UpdateHabitacionDto } from './dto/update-habitacion.dto';

@Injectable()
export class HabitacionesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateHabitacionDto) {
    // Evitar que llegue el PK por body
    const { IdHabitacion, ...safe } = (data as any) ?? {};

    // Validar FK: que exista el tipo
    const tipo = await this.prisma.tiposHabitacion.findUnique({
      where: { IdTipoHabitacion: safe.IdTipoHabitacion },
      select: { IdTipoHabitacion: true },
    });
    if (!tipo) throw new BadRequestException('IdTipoHabitacion no existe');

    return this.prisma.habitaciones.create({ data: safe });
  }

  findAll() {
    return this.prisma.habitaciones.findMany({
      orderBy: { IdHabitacion: 'asc' },
      include: { TipoHabitacion: true },
    });
  }

  async findOne(id: number) {
    const item = await this.prisma.habitaciones.findUnique({
      where: { IdHabitacion: id },
      include: { TipoHabitacion: true },
    });
    if (!item) throw new NotFoundException('Habitación no encontrada');
    return item;
  }

  async update(id: number, data: UpdateHabitacionDto) {
    await this.findOne(id);
    // Si cambian el tipo, validar
    if (data.IdTipoHabitacion) {
      const exists = await this.prisma.tiposHabitacion.findUnique({
        where: { IdTipoHabitacion: data.IdTipoHabitacion },
        select: { IdTipoHabitacion: true },
      });
      if (!exists) throw new BadRequestException('IdTipoHabitacion no existe');
    }
    return this.prisma.habitaciones.update({
      where: { IdHabitacion: id },
      data,
    });
  }

  async remove(id: number) {
    // Opcional: evitar borrar si está usada en reserva/estancia
    const enUso = await this.prisma.reservaHabitacion.count({
      where: { IdHabitacion: id },
    });
    const enEstancia = await this.prisma.estanciaHabitacion.count({
      where: { IdHabitacion: id },
    });
    if (enUso + enEstancia > 0) {
      throw new BadRequestException('No se puede eliminar: habitación asociada a reservas/estancias.');
    }

    await this.findOne(id);
    return this.prisma.habitaciones.delete({ where: { IdHabitacion: id } });
  }
}
