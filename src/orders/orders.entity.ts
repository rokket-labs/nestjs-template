import { Field, ID, ObjectType } from '@nestjs/graphql'
import { prop, Ref } from '@typegoose/typegoose'
import { Item } from 'src/items/items.entity'
import { User } from 'src/users/users.entity'

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string

  @Field(() => User)
  @prop({ ref: 'User' })
  user: string

  @Field(() => Item)
  @prop({ ref: 'Item' })
  item: string

  @prop()
  quantity: number
}
