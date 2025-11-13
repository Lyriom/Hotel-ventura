import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateEstanciaDto } from './dto/create-estancia.dto';
import { UpdateEstanciaDto } from './dto/update-estancia.dto';

function toDateOptional(value?: string): Date | undefined {
  return value ? new Date(value) : undefined;
}

@Injectable()
export class EstanciasService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEstanciaDto) {
    const payload: any = {
      IdReserva: data.IdReserva,
      IdCliente: data.IdCliente,
      Estado: data.Estado,
      MontoTotalFinal: data.MontoTotalFinal,
    };

    // Solo convertimos fechas si vienen en el body
    if (data.FechaCheckIn) {
      payload.FechaCheckIn = toDateOptional(data.FechaCheckIn);
    }
    if (data.HoraCheckIn) {
      payload.HoraCheckIn = toDateOptional(data.HoraCheckIn);
    }
    if (data.FechaCheckOut) {
      payload.FechaCheckOut = toDateOptional(data.FechaCheckOut);
    }
    if (data.HoraCheckOut) {
      payload.HoraCheckOut = toDateOptional(data.HoraCheckOut);
    }

    return this.prisma.estancias.create({
      data: payload,
    });
  }

  findAll() {
    return this.prisma.estancias.findMany({
      orderBy: { IdEstancia: 'asc' },
      include: {
        Reserva: true,
        Cliente: true,
        EstanciaHabitacion: true,
        Facturas: true,
      },
    });
  }

  async findOne(id: number) {
    const estancia = await this.prisma.estancias.findUnique({
      where: { IdEstancia: id },
      include: {
        Reserva: true,
        Cliente: true,
        EstanciaHabitacion: true,
        Facturas: true,
      },
    });

    if (!estancia) {
      throw new NotFoundException('Estancia no encontrada');
    }

    return estancia;
  }

  async update(id: number, data: UpdateEstanciaDto) {
    await this.findOne(id);

    const payload: any = { ...data };

    if (data.FechaCheckIn) {
      payload.FechaCheckIn = toDateOptional(data.FechaCheckIn);
    }
    if (data.HoraCheckIn) {
      payload.HoraCheckIn = toDateOptional(data.HoraCheckIn);
    }
    if (data.FechaCheckOut) {
      payload.FechaCheckOut = toDateOptional(data.FechaCheckOut);
    }
    if (data.HoraCheckOut) {
      payload.HoraCheckOut = toDateOptional(data.HoraCheckOut);
    }

    return this.prisma.estancias.update({
      where: { IdEstancia: id },
      data: payload,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.estancias.delete({
      where: { IdEstancia: id },
    });
  }
}
