import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'

import { ItemsService } from './items.service'
import { ItemsResolver } from './items.resolver'
import { Item } from './items.schema'

@Module({
  imports: [TypegooseModule.forFeature([Item])],
  providers: [ItemsService, ItemsResolver],
  exports: [ItemsService],
})
export class ItemsModule {}
