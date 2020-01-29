import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { Order } from './orders.schema'
import { ReturnModelType } from '@typegoose/typegoose'
import { OrderInput } from './orders.input'

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

  async delete(id: string): Promise<Order> {
    return await this.orderModel.findByIdAndRemove(id)
  }

  async update(id: string, item: Partial<OrderInput>): Promise<Order> {
    return await this.orderModel.findByIdAndUpdate(id, item, { new: true })
  }
}
