import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

global.fetch = require('node-fetch')

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())
  app.enableShutdownHooks()

  // Add Express and NestJS options here
  app.enableCors()
  await app.listen(process.env.PORT || 3000, '0.0.0.0')
}

bootstrap()
