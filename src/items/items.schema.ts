import { prop, Typegoose } from '@typegoose/typegoose'

export class Item extends Typegoose {
  @prop()
  title: string
  @prop()
  price: number
  @prop()
  description: string
}
