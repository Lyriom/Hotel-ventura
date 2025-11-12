import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateRolDto) {
    return this.prisma.roles.create({
      data,
    });
  }

  findAll() {
    return this.prisma.roles.findMany({
      orderBy: { IdRol: 'asc' },
      include: {
        Usuarios: true,
      },
    });
  }

  async findOne(id: number) {
    const rol = await this.prisma.roles.findUnique({
      where: { IdRol: id },
      include: {
        Usuarios: true,
      },
    });

    if (!rol) {
      throw new NotFoundException('Rol no encontrado');
    }

    return rol;
  }

  async update(id: number, data: UpdateRolDto) {
    await this.findOne(id);

    return this.prisma.roles.update({
      where: { IdRol: id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.roles.delete({
      where: { IdRol: id },
    });
  }
}
