import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ProductosModule } from './productos/productos.module';

@Module({
  imports: [AuthModule, UsersModule, DatabaseModule, ProductosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
