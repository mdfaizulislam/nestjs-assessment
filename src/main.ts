import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLoggerService } from './logger/custom-logger.service';
import { WinstonModule } from 'nest-winston';

async function bootstrap() {
  const customLoggerService = new CustomLoggerService();
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(customLoggerService.createLoggerConfig)
  });
  // app.enableCors();
  await app.listen(3000);
}
bootstrap();
