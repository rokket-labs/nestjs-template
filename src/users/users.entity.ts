import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'
import { arrayProp, prop } from '@typegoose/typegoose'
import { Exclude } from 'class-transformer'
import { Roles } from 'src/app.roles'
import { Order } from 'src/orders/orders.entity'

registerEnumType(Roles, {
  name: 'Roles',
  description: 'User role for permissions',
})

@ObjectType()
export class User {
  @Field(() => ID)
  id: string

  @prop({ unique: true })
  email: string

  @Exclude()
  @prop({ required: true })
  password: string

  @prop()
  firstName?: string

  @prop()
  lastName?: string

  @arrayProp({ items: String, enum: Roles, default: Roles.USER })
  roles?: Roles[]

  orders?: Order[]
}
