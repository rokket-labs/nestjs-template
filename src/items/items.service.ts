import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ReturnModelType } from '@typegoose/typegoose'

import { Item } from './items.schema'
import { ItemInput } from './dto/input-items.input'
import { ItemType } from './dto/create-item.dto'

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel('Item') private itemModel: ReturnModelType<typeof Item>,
  ) {}

  async create(createItemDto: ItemInput): Promise<ItemType> {
    const createdItem = new this.itemModel(createItemDto)
    return await createdItem.save()
  }

  async findAll(): Promise<ItemType[]> {
    return await this.itemModel.find().exec()
  }

  async findOne(id: string): Promise<ItemType> {
    return await this.itemModel.findOne({ _id: id })
  }

  async delete(id: string): Promise<ItemType> {
    return await this.itemModel.findByIdAndRemove(id)
  }

  async update(id: string, item: ItemInput): Promise<ItemType> {
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true })
  }
}
