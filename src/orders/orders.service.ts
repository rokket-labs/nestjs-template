import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { User } from 'src/users/users.entity'

import { Order } from './orders.entity'
import { OrderInput, OrderUpdate } from './orders.input'

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: ReturnModelType<typeof Order>,
  ) {}

  async create(createItemDto: OrderInput): Promise<Order> {
    const createdItem = new this.orderModel(createItemDto)
    return await createdItem.save()
  }

  async findAll(): Promise<Order[]> {
    return await this.orderModel.find().exec()
  }

  async find(input: Partial<OrderInput>): Promise<Order[]> {
    return await this.orderModel.find(input).exec()
  }

  async findOne(id: string): Promise<Order> {
    return await this.orderModel.findOne({ _id: id })
  }

  async delete(id: string, user: User, canDoAny: boolean): Promise<Order> {
    if (canDoAny) return await this.orderModel.findByIdAndRemove(id)
    return await this.orderModel.findOneAndRemove({ id, user: user.id })
  }

  async update(
    id: string,
    user: User,
    item: OrderUpdate,
    canDoAny: boolean,
  ): Promise<Order> {
    if (canDoAny)
      return await this.orderModel.findByIdAndUpdate(id, item, { new: true })

    return await this.orderModel.findOneAndUpdate({ id, user: user.id }, item, {
      new: true,
    })
  }
}
