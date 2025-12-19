import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

@Injectable()
export class ReservasService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateReservaDto) {
    return this.prisma.reservas.create({
      data: {
        CodigoReserva: dto.CodigoReserva,
        IdCliente: dto.IdCliente,
        IdUsuario: dto.IdUsuario ?? null,
        Estado: dto.Estado,
        Observaciones: dto.Observaciones,
        MontoTotalEstimado: dto.MontoTotalEstimado,
        FechaReserva: dto.FechaReserva
          ? new Date(dto.FechaReserva)
          : null,
        FechaEntradaPrevista: dto.FechaEntradaPrevista
          ? new Date(dto.FechaEntradaPrevista)
          : null,
        FechaSalidaPrevista: dto.FechaSalidaPrevista
          ? new Date(dto.FechaSalidaPrevista)
          : null,
      },
    });
  }

  findAll() {
    return this.prisma.reservas.findMany({
      include: {
        Cliente: true,
        Usuario: true,
        ReservaHabitacion: {
          include: {
            Habitacion: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const reserva = await this.prisma.reservas.findUnique({
      where: { IdReserva: id },
      include: {
        Cliente: true,
        Usuario: true,
        ReservaHabitacion: {
          include: {
            Habitacion: true,
          },
        },
      },
    });

    if (!reserva) {
      throw new NotFoundException('Reserva no encontrada');
    }

    return reserva;
  }

  update(id: number, dto: UpdateReservaDto) {
    return this.prisma.reservas.update({
      where: { IdReserva: id },
      data: {
        ...dto,
        FechaReserva: dto.FechaReserva
          ? new Date(dto.FechaReserva)
          : undefined,
        FechaEntradaPrevista: dto.FechaEntradaPrevista
          ? new Date(dto.FechaEntradaPrevista)
          : undefined,
        FechaSalidaPrevista: dto.FechaSalidaPrevista
          ? new Date(dto.FechaSalidaPrevista)
          : undefined,
      },
    });
  }

  async remove(id: number) {
    // Primero borra los detalles
    await this.prisma.reservaHabitacion.deleteMany({
      where: { IdReserva: id },
    });

    // Luego la reserva
    return this.prisma.reservas.delete({
      where: { IdReserva: id },
    });
  }
}
