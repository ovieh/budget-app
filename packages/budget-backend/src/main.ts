import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';
import helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || serverConfig.port;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  if (process.env.NODE_ENV === 'development') {
    app.enableCors({ origin: 'http://localhost:5000', credentials: true });
  } else {
    app.enableCors({ origin: serverConfig.origin, credentials: true });
    app.use(helmet());

    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
      }),
    );

    logger.log(`Accepting requests from "${serverConfig.origin}"`);
  }

  app.use(cookieParser());

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
