import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'

import { Item } from './items.schema'
import { ItemInput } from './items.input'

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item) private readonly itemModel: ReturnModelType<typeof Item>,
  ) {}

  async create(createItemDto: ItemInput): Promise<Item> {
    const createdItem = new this.itemModel(createItemDto)
    return await createdItem.save()
  }

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find().exec()
  }

  async findOne(id: string): Promise<Item> {
    return await this.itemModel.findOne({ _id: id })
  }

  async delete(id: string): Promise<Item> {
    return await this.itemModel.findByIdAndRemove(id)
  }

  async update(id: string, item: ItemInput): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true })
  }
}
