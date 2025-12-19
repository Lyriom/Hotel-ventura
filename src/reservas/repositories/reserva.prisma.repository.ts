import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { IReservaRepository } from '../interfaces/reserva-repository.interface';


@Injectable()
export class ReservaPrismaRepository implements IReservaRepository {
constructor(private readonly prisma: PrismaService) {}


create(payload: any) {
return this.prisma.reservas.create({ data: payload });
}


findAll() {
return this.prisma.reservas.findMany({
orderBy: { IdReserva: 'asc' },
include: {
Cliente: true,
Usuario: true,
ReservaHabitacion: true,
},
});
}


findOne(id: number) {
return this.prisma.reservas.findUnique({
where: { IdReserva: id },
include: {
Cliente: true,
Usuario: true,
ReservaHabitacion: true,
Estancias: true,
},
});
}


update(id: number, payload: any) {
return this.prisma.reservas.update({
where: { IdReserva: id },
data: payload,
});
}


remove(id: number) {
return this.prisma.reservas.delete({ where: { IdReserva: id } });
}
}