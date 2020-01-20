import { prop } from '@typegoose/typegoose'

export class User {
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
