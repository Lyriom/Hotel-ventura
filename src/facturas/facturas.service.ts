import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';

@Injectable()
export class FacturasService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateFacturaDto) {
    const payload = {
      NumeroFactura: data.NumeroFactura,
      IdCliente: data.IdCliente,
      IdEstancia: data.IdEstancia,
      IdUsuario: data.IdUsuario,
      // 👇 SIEMPRE un Date (NUNCA undefined)
      FechaEmision: new Date(data.FechaEmision),
      Subtotal: Number(data.Subtotal),
      Impuesto: Number(data.Impuesto),
      Total: Number(data.Total),
      Estado: data.Estado,
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

    const payload: any = { ...data };

    if (data.FechaEmision) {
      payload.FechaEmision = new Date(data.FechaEmision);
    }
    if (data.Subtotal !== undefined) payload.Subtotal = Number(data.Subtotal);
    if (data.Impuesto !== undefined) payload.Impuesto = Number(data.Impuesto);
    if (data.Total !== undefined) payload.Total = Number(data.Total);

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

