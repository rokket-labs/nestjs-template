import { prop, Typegoose } from '@typegoose/typegoose'

export class User extends Typegoose {
  @prop({ unique: true })
  email: string
  @prop()
  firstName: string
  @prop()
  lastName: string
  @prop()
  password: string
  @prop({ default: Date.now })
  createdAt: Date
  @prop({ default: Date.now })
  updatedAt: Date
}
