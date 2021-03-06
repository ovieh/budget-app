import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import { IConfig } from './types';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const serverConfig: IConfig = config.get('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || serverConfig.port;

  if (process.env.NODE_ENV === 'development') {
    app.enableCors({ origin: 'http://localhost:5000', credentials: true });
  } else {
    app.enableCors({ origin: serverConfig.origin, credentials: true });

    app.use(helmet());
    app.set('trust proxy', 1);
    app.use(compression());
    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 300,
      }),
    );

    logger.log(`Accepting requests from "${serverConfig.origin}"`);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.use(cookieParser());

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
