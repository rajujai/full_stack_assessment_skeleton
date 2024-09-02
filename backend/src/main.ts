import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Home LLC')
    .setDescription('Home LLC assessment')
    .setVersion('1.0')
    .addTag('home')
    .addTag('user')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  }));

  await app.listen(3000);
}
bootstrap();
