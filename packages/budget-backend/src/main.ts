import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || serverConfig.port;

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: serverConfig.origin });
    app.use(helmet());

    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
      }),
    );

    logger.log(`Accepting requests from "${serverConfig.origin}"`);
  }

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
