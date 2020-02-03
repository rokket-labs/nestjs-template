import { prop, arrayProp } from '@typegoose/typegoose'
import { ObjectType, Field, ID, registerEnumType } from 'type-graphql'
import { Exclude } from 'class-transformer'
import { Order } from 'src/orders/orders.schema'
import { Roles } from 'src/app.roles'

registerEnumType(Roles, {
  name: 'Roles',
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

  @Field(() => [Roles])
  @arrayProp({ items: String, enum: Roles, default: Roles.USER })
  readonly roles?: Roles[]

  @Field(() => [Order])
  public orders?: Order[]
}
