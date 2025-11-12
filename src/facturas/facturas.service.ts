import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';

// Para create: SIEMPRE devuelve un Date
function toDateRequired(value: string): Date {
  return new Date(value);
}

// Para update: puede ser opcional
function toDateOptional(value?: string): Date | undefined {
  return value ? new Date(value) : undefined;
}

@Injectable()
export class FacturasService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateFacturaDto) {
    const payload = {
      ...data,
      // aquí ya no puede ser undefined, porque el DTO obliga a mandarlo
      FechaEmision: toDateRequired(data.FechaEmision),
    };

    return this.prisma.facturas.create({
      data: payload,
    });
  }

  findAll() {
    return this.prisma.facturas.findMany({
      orderBy: { IdFactura: 'asc' },
      include: {
        Cliente: true,
        Estancia: true,
        Usuario: true,
        Detalles: true,
        Pagos: true,
      },
    });
  }

  async findOne(id: number) {
    const factura = await this.prisma.facturas.findUnique({
      where: { IdFactura: id },
      include: {
        Cliente: true,
        Estancia: true,
        Usuario: true,
        Detalles: true,
        Pagos: true,
      },
    });

    if (!factura) {
      throw new NotFoundException('Factura no encontrada');
    }

    return factura;
  }

  async update(id: number, data: UpdateFacturaDto) {
    await this.findOne(id);

    const payload: any = {
      ...data,
    };

    if (data.FechaEmision) {
      payload.FechaEmision = toDateOptional(data.FechaEmision);
    }

    return this.prisma.facturas.update({
      where: { IdFactura: id },
      data: payload,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.facturas.delete({
      where: { IdFactura: id },
    });
  }
}
