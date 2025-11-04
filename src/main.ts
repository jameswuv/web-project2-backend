import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: 'Content-Type, Accept, X-Requested-With, Authorization', // Add X-Requested-With here
    origin: '*', // Adjust the origin as needed
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  await app.listen(3000);
}
bootstrap();
