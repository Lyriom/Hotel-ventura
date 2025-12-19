import { Module } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { ReservaPrismaRepository } from './repositories/reserva.prisma.repository';
import { PrismaService } from '../database/prisma/prisma.service';
import { NightlyPricingStrategy } from './pricing/nightly-pricing.strategy';
import { HourlyPricingStrategy } from './pricing/hourly-pricing.strategy';


@Module({
controllers: [ReservasController],
providers: [
ReservasService,
PrismaService,
{
provide: 'RESERVA_REPOSITORY',
useClass: ReservaPrismaRepository,
},
{
provide: 'NIGHTLY_PRICING',
useClass: NightlyPricingStrategy,
},
{
provide: 'HOURLY_PRICING',
useClass: HourlyPricingStrategy,
},
],
exports: [],
})
export class ReservasModule {}