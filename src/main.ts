import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/nestjs/module/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  app.enableCors();


  const config = new DocumentBuilder()
    .setTitle('Engnet API')
    .setDescription('Documentação da API da Engnet')
    .setVersion('1.0')
    .addBearerAuth() // habilita token JWT no Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Server running on port ${process.env.PORT ?? 3000}`);
  console.log(`📘 Swagger available at /api/docs`);
}

bootstrap();
