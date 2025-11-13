import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateUsuarioDto) {
    return this.prisma.usuarios.create({
      data,
    });
  }

  findAll() {
    return this.prisma.usuarios.findMany({
      orderBy: { IdUsuario: 'asc' },
      include: { Rol: true },
    });
  }

  async findOne(id: number) {
    const usuario = await this.prisma.usuarios.findUnique({
      where: { IdUsuario: id },
      include: { Rol: true },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return usuario;
  }

  async update(id: number, data: UpdateUsuarioDto) {
    await this.findOne(id);

    return this.prisma.usuarios.update({
      where: { IdUsuario: id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.usuarios.delete({
      where: { IdUsuario: id },
    });
  }
}
