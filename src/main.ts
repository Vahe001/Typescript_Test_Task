import { NestFactory } from '@nestjs/core';
import { AppModule } from './routes/app.module';
import initialize from './initialize'
import { config } from 'dotenv'
import {resolve} from 'path'

config({ path: resolve(__dirname, './../../.env')});
async function bootstrap() {
  await initialize();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
