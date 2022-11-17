import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

const PORT = 8000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  console.log("App started at port", PORT)
}
bootstrap();
