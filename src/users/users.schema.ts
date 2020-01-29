import { prop, arrayProp } from '@typegoose/typegoose'
import { ObjectType, Field, ID, registerEnumType } from 'type-graphql'
import { Exclude } from 'class-transformer'
import { Order } from 'src/orders/orders.schema'

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User role for permissions',
})

@ObjectType()
export class User {
  @Field(() => ID)
  public id!: string

  @Field(() => String)
  @prop({ unique: true })
  public email!: string

  @Exclude()
  @prop({ required: true })
  readonly password!: string

  @Field(() => String)
  @prop()
  public firstName?: string

  @Field(() => String)
  @prop()
  public lastName?: string

  @Field(() => [Role])
  @arrayProp({ items: String, enum: Role, default: Role.USER })
  readonly roles?: Role[]

  @Field(() => [Order])
  public orders?: Order[]
}
