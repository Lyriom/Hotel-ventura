import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateClienteDto) {
    const { /* IdCliente, */ ...safe } = data as any;
    return this.prisma.clientes.create({
      data: safe,
    });
  }

  findAll() {
    return this.prisma.clientes.findMany({
      orderBy: { IdCliente: 'asc' },
    });
  }

  async findOne(id: number) {
    const cliente = await this.prisma.clientes.findUnique({
      where: { IdCliente: id },
    });

    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado');
    }

    return cliente;
  }

  async update(id: number, data: UpdateClienteDto) {
    await this.findOne(id);
    return this.prisma.clientes.update({
      where: { IdCliente: id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.clientes.delete({
      where: { IdCliente: id },
    });
  }
}
