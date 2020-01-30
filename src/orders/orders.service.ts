import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { Order } from './orders.schema'
import { ReturnModelType } from '@typegoose/typegoose'
import { OrderInput, OrderUpdate } from './orders.input'
import { User } from 'src/users/users.schema'
import { Roles } from 'src/app.roles'

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

  async update(id: string, user: User, item: OrderUpdate): Promise<Order> {
    const { roles } = user
    if (roles.includes(Roles.ADMIN))
      return await this.orderModel.findByIdAndUpdate(id, item, { new: true })

    return await this.orderModel.findOneAndUpdate({ id, user: user.id }, item, {
      new: true,
    })
  }
}
