import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

function toDateOptional(value?: string) {
  return value ? new Date(value) : undefined;
}

@Injectable()
export class ReservasService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateReservaDto) {
    const payload = {
      ...data,
      FechaReserva: toDateOptional(data.FechaReserva),
      FechaEntradaPrevista: toDateOptional(data.FechaEntradaPrevista),
      FechaSalidaPrevista: toDateOptional(data.FechaSalidaPrevista),
    };

    return this.prisma.reservas.create({
      data: payload,
    });
  }

  findAll() {
    return this.prisma.reservas.findMany({
      orderBy: { IdReserva: 'asc' },
      include: {
        Cliente: true,
        Usuario: true,
        ReservaHabitacion: true,
        Estancias: true,
      },
    });
  }

  async findOne(id: number) {
    const reserva = await this.prisma.reservas.findUnique({
      where: { IdReserva: id },
      include: {
        Cliente: true,
        Usuario: true,
        ReservaHabitacion: true,
        Estancias: true,
      },
    });

    if (!reserva) {
      throw new NotFoundException('Reserva no encontrada');
    }

    return reserva;
  }

  async update(id: number, data: UpdateReservaDto) {
    await this.findOne(id);

    const payload: any = { ...data };

    if (data.FechaReserva) {
      payload.FechaReserva = toDateOptional(data.FechaReserva);
    }
    if (data.FechaEntradaPrevista) {
      payload.FechaEntradaPrevista = toDateOptional(
        data.FechaEntradaPrevista,
      );
    }
    if (data.FechaSalidaPrevista) {
      payload.FechaSalidaPrevista = toDateOptional(
        data.FechaSalidaPrevista,
      );
    }

    return this.prisma.reservas.update({
      where: { IdReserva: id },
      data: payload,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.reservas.delete({
      where: { IdReserva: id },
    });
  }
}

