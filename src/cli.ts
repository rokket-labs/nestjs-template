import { NestFactory } from '@nestjs/core'
import { CommandModule, CommandService } from 'nestjs-command'

import { AppModule } from './app.module'

const func = () => async (): Promise<void> => {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  })
  app
    .select(CommandModule)
    .get(CommandService)
    .exec()
}

func()
