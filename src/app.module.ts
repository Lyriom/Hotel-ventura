import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ReservasModule } from './reservas/reservas.module';
import { DatabaseModule } from './database/database.module';
import { TiposHabitacionModule } from './tipos-habitacion/tipos-habitacion.module';
import { HabitacionesModule } from './habitaciones/habitaciones.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ReservasModule,
    DatabaseModule,
    TiposHabitacionModule,
    HabitacionesModule, // 👈 nuevo
  ],
  controllers: [AppController],
})
export class AppModule {}
