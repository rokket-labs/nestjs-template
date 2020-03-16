import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import mockingoose from 'mockingoose'
import * as mongoose from 'mongoose'

import { Item } from './items.entity'
import { ItemsService } from './items.service'

const ItemModel = mongoose.model('Item', Item)

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
