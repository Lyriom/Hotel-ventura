import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service'; 
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  findAll() {
      throw new Error('Method not implemented.');
  }
  update(id: number, data: any) {
      throw new Error('Method not implemented.');
  }
  remove(id: number) {
      throw new Error('Method not implemented.');
  }
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } }); // incluye password hash
  }

  async create(email: string, passwordPlain: string) {
    const hash = await bcrypt.hash(passwordPlain, 10);
    return this.prisma.user.create({
      data: { email, password: hash },
      select: { id: true, email: true, createdAt: true },
    });
  }
  
}
