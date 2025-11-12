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
import { RolesModule } from './roles/roles.module';

import { FacturasModule } from './facturas/facturas.module';
import { DetalleFacturaModule } from './detalle-factura/detalle-factura.module';
import { PagosModule } from './pagos/pagos.module';

@Module({
  imports: [
    DatabaseModule,

    AuthModule,
    UsersModule,

    ClientesModule,
    RolesModule,

    TiposHabitacionModule,
    EstanciasModule,
    EstanciaHabitacionModule,

    ReservasModule,
    FacturasModule,
    DetalleFacturaModule,
    PagosModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
