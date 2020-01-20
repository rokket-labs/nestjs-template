import { prop } from '@typegoose/typegoose'

export class Item {
  @prop()
  title: string
  @prop()
  price: number
  @prop()
  description: string
}
