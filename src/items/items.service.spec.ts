import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import mockingoose from 'mockingoose'

import { ItemsService } from './items.service'
import { ItemSchema } from './items.schema'

const ItemModel = mongoose.model('Item', ItemSchema)

mockingoose(ItemModel).toReturn({}, 'save')

describe('ItemsService', () => {
  let service: ItemsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        { provide: getModelToken('Item'), useValue: ItemModel },
      ],
    }).compile()

    service = module.get<ItemsService>(ItemsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
