import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.enableCors();
  await app.listen(3000);
  console.log('========================================================');
  console.log('Sistem Manajemen Rental Kendaraan API berjalan!');
  console.log('REST API URL: http://localhost:3000');
  console.log('GraphQL Sandbox URL: http://localhost:3000/graphql');
  console.log('========================================================');
}
bootstrap();
