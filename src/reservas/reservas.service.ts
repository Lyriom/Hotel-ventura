import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateReservaDto } from './create-reserva.dto';
import { Clientes, Prisma } from '@prisma/client';

@Injectable()
export class ReservasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    user: { id: number; email: string; role: string },
    dto: CreateReservaDto,
  ) {
    try {
      // 1. Determinar cliente
      let cliente: Clientes | null = null;

      if (dto.clienteEmail) {
        // Solo admin o recepcionista pueden crear para otro
        if (user.role === 'admin' || user.role === 'recepcionista') {
          cliente = await this.ensureCliente(dto.clienteEmail);
        } else {
          throw new ForbiddenException(
            'No puedes crear reservas para otros clientes',
          );
        }
      } else {
        // Cliente crea su propia reserva
        if (!user.email) {
          throw new ForbiddenException('No se pudo determinar el cliente');
        }
        cliente = await this.ensureCliente(user.email);
      }

      // 2. Crear la reserva
      const reserva = await this.prisma.reservas.create({
        data: {
          IdCliente: cliente.IdCliente,
          // IdUsuario opcional por ahora
          FechaReserva: new Date(),
          FechaEntradaPrevista: new Date(dto.fechaEntrada),
          FechaSalidaPrevista: new Date(dto.fechaSalida),
          Estado: 'Pendiente',
          MontoTotalEstimado: new Prisma.Decimal(0),
          Observaciones: dto.observaciones || '',
        },
      });

      // 3. Crear relación con habitación
      await this.prisma.reservaHabitacion.create({
        data: {
          IdReserva: reserva.IdReserva,
          IdHabitacion: dto.habitacionId,
          PrecioPorNoche: new Prisma.Decimal(0),
          PrecioPorHora: new Prisma.Decimal(0),
          CantidadNoches: 0,
          CantidadHoras: 0,
          Subtotal: new Prisma.Decimal(0),
        },
      });

      return reserva;
    } catch (e: any) {
      console.error('Error creando reserva:', e.code, e.message, e.meta);
      throw e;
    }
  }

  async findAll() {
    return this.prisma.reservas.findMany({
      include: {
        Cliente: true,
        ReservaHabitacion: {
          include: { Habitacion: true },
        },
      },
    });
  }

  private async ensureCliente(email: string): Promise<Clientes> {
    const existing = await this.prisma.clientes.findFirst({
      where: { Correo: email },
    });

    if (existing) return existing;

    return this.prisma.clientes.create({
      data: {
        Nombre: email.split('@')[0],
        Apellido: '',
        Ciudad: '',
        Correo: email,
        Telefono: '',
      },
    });
  }
}
