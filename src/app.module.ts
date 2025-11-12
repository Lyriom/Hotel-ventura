import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ReservasModule } from './reservas/reservas.module';
import { DatabaseModule } from './database/database.module';
import { TiposHabitacionModule } from './tipos-habitacion/tipos-habitacion.module';
import { EstanciasModule } from './estancias/estancias.module';
import { EstanciaHabitacionModule } from './estancia-habitacion/estancia-habitacion.module';
import { ClientesModule } from './clientes/clientes.module';
import { DetalleFacturaModule } from './detalle-factura/detalle-factura.module';




@Module({
  imports: [
    UsersModule,
    AuthModule,
    ReservasModule,
    DatabaseModule,
    TiposHabitacionModule,
    EstanciasModule,
    EstanciaHabitacionModule,
    ClientesModule,
    DetalleFacturaModule,

  ],
  controllers: [AppController],
})
export class AppModule {}
