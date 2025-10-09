import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // solo acepta campos definidos en el DTO
      forbidNonWhitelisted: true,// lanza error si mandan algo que no está en el DTO
      transform: true,           // convierte tipos (por ej, string a number)
    }),
  );

  await app.listen(3000);
}
bootstrap();
