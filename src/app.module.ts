import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

// 🔐 Seguridad & Usuarios
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';

// 🗄️ Base de datos (Prisma)
import { DatabaseModule } from './database/database.module';

// 🧾 Módulos funcionales del hotel
import { ClientesModule } from './clientes/clientes.module';
import { TiposHabitacionModule } from './tipos-habitacion/tipos-habitacion.module';
import { HabitacionesModule } from './habitaciones/habitaciones.module';
import { EstanciasModule } from './estancias/estancias.module';
import { EstanciaHabitacionModule } from './estancia-habitacion/estancia-habitacion.module';
import { ReservasModule } from './reservas/reservas.module';

// 💸 Facturación completa
import { FacturasModule } from './facturas/facturas.module';
import { DetalleFacturaModule } from './detalle-factura/detalle-factura.module';
import { PagosModule } from './pagos/pagos.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    // 🔐 Autenticación y autorizaciones
    AuthModule,
    UsersModule,
    RolesModule,

    // 🗄️ DB
    DatabaseModule,

    // 👤 Gestión clientes y roles
    ClientesModule,
    UsuariosModule,

    // 🏨 Habitaciones y estancias
    TiposHabitacionModule,
    HabitacionesModule,
    EstanciasModule,
    EstanciaHabitacionModule,

    // 📅 Reservas
    ReservasModule,

    // 💸 Facturación
    FacturasModule,
    DetalleFacturaModule,
    PagosModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
