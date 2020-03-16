import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

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
