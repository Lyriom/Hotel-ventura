import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));


  app.enableCors();

  await app.listen(3000);
  console.log('API Hotel Ventura corriendo en http://localhost:3000');
}
bootstrap();
