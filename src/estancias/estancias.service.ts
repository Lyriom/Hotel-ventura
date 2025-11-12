import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateEstanciaDto } from './dto/create-estancia.dto';
import { UpdateEstanciaDto } from './dto/update-estancia.dto';

@Injectable()
export class EstanciasService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEstanciaDto) {
    // por si acaso alguien manda IdEstancia, lo ignoramos
    const { /* IdEstancia, */ ...safe } = data as any;
    return this.prisma.estancias.create({
      data: safe,
    });
  }

  findAll() {
    return this.prisma.estancias.findMany({
      orderBy: { IdEstancia: 'asc' },
      include: {
        Reserva: true,
        Cliente: true,
      },
    });
  }

  async findOne(id: number) {
    const item = await this.prisma.estancias.findUnique({
      where: { IdEstancia: id },
      include: {
        Reserva: true,
        Cliente: true,
      },
    });

    if (!item) {
      throw new NotFoundException('Estancia no encontrada');
    }

    return item;
  }

  async update(id: number, data: UpdateEstanciaDto) {
    await this.findOne(id); // asegura que exista
    return this.prisma.estancias.update({
      where: { IdEstancia: id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.estancias.delete({
      where: { IdEstancia: id },
    });
  }
}
