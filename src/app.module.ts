import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppImports } from './app.imports'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { EmailModule } from './email/email.module'
import { EventsModule } from './events/events.module'
import { FilesModule } from './files/files.module'
import { ItemsModule } from './items/items.module'
import { OrdersModule } from './orders/orders.module'
import { SeedsModule } from './shared/seeds.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ...AppImports,
    EmailModule,
    ItemsModule,
    AuthModule,
    UsersModule,
    OrdersModule,
    EventsModule,
    FilesModule,
    SeedsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
