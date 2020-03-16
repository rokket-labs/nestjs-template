import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelForClass } from '@typegoose/typegoose'

import { Item } from './items.entity'
import { ItemsResolver } from './items.resolver'
import { ItemsService } from './items.service'

const ItemModel = getModelForClass(Item)

describe('ItemsResolver', () => {
  let resolver: ItemsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsResolver,
        ItemsService,
        { provide: getModelToken('Item'), useValue: ItemModel },
      ],
    }).compile()

    resolver = module.get<ItemsResolver>(ItemsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
