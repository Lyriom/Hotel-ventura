import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateEstanciaHabitacionDto } from './dto/create-estancia-habitacion.dto';
import { UpdateEstanciaHabitacionDto } from './dto/update-estancia-habitacion.dto';

function toDate(value?: string) {
  return value ? new Date(value) : undefined;
}

@Injectable()
export class EstanciaHabitacionService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEstanciaHabitacionDto) {
    const { /* IdEstanciaHabitacion, */ ...safe } = data as any;

    const payload: any = {
      ...safe,
      FechaEntradaReal: toDate(safe.FechaEntradaReal),
      HoraEntradaReal: toDate(safe.HoraEntradaReal),
      FechaSalidaReal: toDate(safe.FechaSalidaReal),
      HoraSalidaReal: toDate(safe.HoraSalidaReal),
    };

    return this.prisma.estanciaHabitacion.create({
      data: payload,
    });
  }

  findAll() {
    return this.prisma.estanciaHabitacion.findMany({
      orderBy: { IdEstanciaHabitacion: 'asc' },
      include: {
        Estancia: true,
        Habitacion: true,
      },
    });
  }

  async findOne(id: number) {
    const item = await this.prisma.estanciaHabitacion.findUnique({
      where: { IdEstanciaHabitacion: id },
      include: {
        Estancia: true,
        Habitacion: true,
      },
    });

    if (!item) {
      throw new NotFoundException('EstanciaHabitacion no encontrada');
    }

    return item;
  }

  async update(id: number, data: UpdateEstanciaHabitacionDto) {
    await this.findOne(id);

    const safe: any = { ...data };
    const payload: any = {
      ...safe,
      FechaEntradaReal: toDate(safe.FechaEntradaReal),
      HoraEntradaReal: toDate(safe.HoraEntradaReal),
      FechaSalidaReal: toDate(safe.FechaSalidaReal),
      HoraSalidaReal: toDate(safe.HoraSalidaReal),
    };

    return this.prisma.estanciaHabitacion.update({
      where: { IdEstanciaHabitacion: id },
      data: payload,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.estanciaHabitacion.delete({
      where: { IdEstanciaHabitacion: id },
    });
  }
}
