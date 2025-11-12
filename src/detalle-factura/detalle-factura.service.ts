import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateDetalleFacturaDto } from './dto/create-detalle-factura.dto';
import { UpdateDetalleFacturaDto } from './dto/update-detalle-factura.dto';

@Injectable()
export class DetalleFacturaService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateDetalleFacturaDto) {
    return this.prisma.detalleFactura.create({
      data,
    });
  }

  findAll() {
    return this.prisma.detalleFactura.findMany({
      orderBy: { IdDetalle: 'asc' },
      include: {
        Factura: true,
        EstanciaHabitacion: true,
      },
    });
  }

  async findOne(id: number) {
    const detalle = await this.prisma.detalleFactura.findUnique({
      where: { IdDetalle: id },
      include: {
        Factura: true,
        EstanciaHabitacion: true,
      },
    });

    if (!detalle) {
      throw new NotFoundException('DetalleFactura no encontrado');
    }

    return detalle;
  }

  async update(id: number, data: UpdateDetalleFacturaDto) {
    await this.findOne(id);

    return this.prisma.detalleFactura.update({
      where: { IdDetalle: id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.detalleFactura.delete({
      where: { IdDetalle: id },
    });
  }
}
