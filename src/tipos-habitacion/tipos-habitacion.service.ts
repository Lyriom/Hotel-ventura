import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateTipoHabitacionDto } from './dto/create-tipo-habitacion.dto';
import { UpdateTipoHabitacionDto } from './dto/update-tipo-habitacion.dto';

@Injectable()
export class TiposHabitacionService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    const { IdTipoHabitacion, ...safe } = data ?? {};
    return this.prisma.tiposHabitacion.create({ data: safe });
  }

  // 👇 AQUÍ ESTÁ LA CORRECCIÓN
  async findAll() {
    const tipos = await this.prisma.tiposHabitacion.findMany({
      orderBy: { IdTipoHabitacion: 'asc' },
    });

    // Convertimos los Decimales a Number para que el JSON no falle al serializar
    return tipos.map((t) => ({
      ...t,
      PrecioBaseNoche: Number(t.PrecioBaseNoche),
      PrecioBaseHora: Number(t.PrecioBaseHora),
    }));
  }

  async findOne(id: number) {
    const item = await this.prisma.tiposHabitacion.findUnique({
      where: { IdTipoHabitacion: id },
    });
    if (!item) throw new NotFoundException('Tipo de habitación no encontrado');
    
    // También convertimos aquí por si acaso
    return {
      ...item,
      PrecioBaseNoche: Number(item.PrecioBaseNoche),
      PrecioBaseHora: Number(item.PrecioBaseHora),
    };
  }

  async update(id: number, data: UpdateTipoHabitacionDto) {
    await this.findOne(id);
    return this.prisma.tiposHabitacion.update({
      where: { IdTipoHabitacion: id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.tiposHabitacion.delete({
      where: { IdTipoHabitacion: id },
    });
  }
}
