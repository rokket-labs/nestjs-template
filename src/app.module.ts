import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppImports } from './app.imports'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { EventsGateway } from './events/events.gateway'
import { EventsModule } from './events/events.module'
import { FilesModule } from './files/files.module'
import { HealthController } from './health/health.controller'
import { TypegooseHealthIndicator } from './health/typegoose.indicator'
import { ItemsModule } from './items/items.module'
import { OrdersModule } from './orders/orders.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ...AppImports,
    UsersModule,
    OrdersModule,
    ItemsModule,
    AuthModule,
    EventsModule,
    FilesModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, TypegooseHealthIndicator],
})
export class AppModule {}
