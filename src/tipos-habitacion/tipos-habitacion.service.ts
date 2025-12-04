import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateTipoHabitacionDto } from './dto/create-tipo-habitacion.dto';
import { UpdateTipoHabitacionDto } from './dto/update-tipo-habitacion.dto';

@Injectable()
export class TiposHabitacionService {
  constructor(private prisma: PrismaService) {}

  // Método auxiliar privado para normalizar la respuesta (Decimal -> Number)
  private normalize(item: any) {
    if (!item) return null;
    return {
      ...item,
      PrecioBaseNoche: Number(item.PrecioBaseNoche),
      PrecioBaseHora: Number(item.PrecioBaseHora),
    };
  }

  async create(data: CreateTipoHabitacionDto) {
    // TypeScript ya te protege, pero mantenemos la desestructuración por seguridad extra
    // @ts-ignore (si data tuviera id, lo ignoramos, aunque el DTO no lo tiene)
    const { IdTipoHabitacion, ...safe } = data; 
    
    const newItem = await this.prisma.tiposHabitacion.create({ 
      data: safe 
    });
    
    return this.normalize(newItem); // Retornamos con formato numérico correcto
  }

  async findAll() {
    const tipos = await this.prisma.tiposHabitacion.findMany({
      orderBy: { IdTipoHabitacion: 'asc' },
    });

    // Reutilizamos el método normalize
    return tipos.map((t) => this.normalize(t));
  }

  async findOne(id: number) {
    const item = await this.prisma.tiposHabitacion.findUnique({
      where: { IdTipoHabitacion: id },
    });
    if (!item) throw new NotFoundException('Tipo de habitación no encontrado');
    
    return this.normalize(item);
  }

  async update(id: number, data: UpdateTipoHabitacionDto) {
    await this.findOne(id); // Verificamos existencia
    
    const updatedItem = await this.prisma.tiposHabitacion.update({
      where: { IdTipoHabitacion: id },
      data,
    });

    return this.normalize(updatedItem); // Retorno consistente
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.tiposHabitacion.delete({
      where: { IdTipoHabitacion: id },
    });
  }
}
