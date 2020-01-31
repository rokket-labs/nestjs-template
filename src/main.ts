import { NestFactory } from '@nestjs/core'
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'
import { RedisIoAdapter } from './redis.adapter'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )
  app.useGlobalPipes(new ValidationPipe())
  app.useWebSocketAdapter(new RedisIoAdapter(app))
  await app.listen(3000, '0.0.0.0')
}

bootstrap()
