import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    // If you need to edit the file uplaoad body limit for Fastify, use the following line:
    // new FastifyAdapter({ bodyLimit: 1048576 * 5 }), // 1 Mib * number of Mbs you need
    new FastifyAdapter(),
  )

  // Add Fastify and NestJS options here
  app.enableCors()

  await app.listen(3000, '0.0.0.0')
}
bootstrap()
