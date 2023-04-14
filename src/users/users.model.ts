import {
  Field,
  HideField,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql'
import { prop } from '@typegoose/typegoose'

import { Roles } from 'src/app.roles'
import { Order } from 'src/orders/orders.model'

registerEnumType(Roles, {
  name: 'Roles',
  description: 'User role for permissions',
})

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string

  @prop({ unique: true })
  email: string

  @HideField()
  @prop({ required: true })
  password: string

  @prop()
  firstName?: string

  @prop()
  lastName?: string

  @prop({ type: String, enum: Roles, default: Roles.USER })
  roles?: Roles[]

  orders?: Order[]
}
