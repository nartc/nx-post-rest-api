/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { HttpStatus, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@post-rest-api/common';
import { AppConfig, appConfiguration } from '@post-rest-api/configurations';
import compression from 'compression';
import helmet from 'helmet';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get<AppConfig>(appConfiguration.KEY);

  app.enableCors();

  app.use(compression());
  app.use(helmet());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const swaggerDocOptions = new DocumentBuilder()
    .setTitle('Post Rest API')
    .setDescription('API documentation for Post Rest')
    .setVersion('1.0.0')
    .addServer(`${appConfig.domain}/${globalPrefix}`, 'Development API')
    .addBearerAuth()
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerDocOptions);
  SwaggerModule.setup('api/docs', app, swaggerDoc, {
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
  });
  Logger.log(
    `Swagger Docs enabled: ${appConfig.domain}/${globalPrefix}/docs`,
    'NestApplication'
  );

  app.use('/robots.txt', (_, res) => {
    res.send('User-Agent: *\n' + 'Disallow: /');
  });
  app.use('/favicon.ico', (_, res) => {
    res.sendStatus(HttpStatus.NO_CONTENT).end();
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(appConfig.port, () => {
    Logger.log(
      'Listening at ' + appConfig.domain + '/' + globalPrefix,
      'NestApplication'
    );
  });
}

bootstrap();
