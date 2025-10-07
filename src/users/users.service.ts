import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import * as bycrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}
    async findByEmail (email:string){
        return this.prisma.user.findUnique({where:{email}});
    }

    async create(email:string, passwordPlain:string){
        const hash=await bycrypt.hash(passwordPlain,10)
        return this.prisma.user.create({
            data:{email, password:hash},
            select: {id:true, email:true, createdAt:true}
        })
    }
}
