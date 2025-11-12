import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';

function toDateRequired(value: string): Date {
  return new Date(value);
}

function toDateOptional(value?: string): Date | undefined {
  return value ? new Date(value) : undefined;
}

@Injectable()
export class PagosService {
  constructor(private prisma: PrismaService) {}

  create(data: CreatePagoDto) {
    const payload = {
      ...data,
      FechaPago: toDateRequired(data.FechaPago),
    };

    return this.prisma.pagos.create({
      data: payload,
    });
  }

  findAll() {
    return this.prisma.pagos.findMany({
      orderBy: { IdPago: 'asc' },
      include: {
        Factura: true,
      },
    });
  }

  async findOne(id: number) {
    const pago = await this.prisma.pagos.findUnique({
      where: { IdPago: id },
      include: {
        Factura: true,
      },
    });

    if (!pago) {
      throw new NotFoundException('Pago no encontrado');
    }

    return pago;
  }

  async update(id: number, data: UpdatePagoDto) {
    await this.findOne(id);

    const payload: any = {
      ...data,
    };

    if (data.FechaPago) {
      payload.FechaPago = toDateOptional(data.FechaPago);
    }

    return this.prisma.pagos.update({
      where: { IdPago: id },
      data: payload,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.pagos.delete({
      where: { IdPago: id },
    });
  }
}
