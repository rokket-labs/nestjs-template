import { Field, ID, ObjectType } from '@nestjs/graphql'
import { prop, Ref } from '@typegoose/typegoose'
import { Item } from 'src/items/items.model'
import { User } from 'src/users/users.model'

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string

  @Field(() => User)
  @prop({ ref: 'User' })
  user: Ref<User>

  @Field(() => Item)
  @prop({ ref: 'Item' })
  item: Ref<Item>

  @prop()
  quantity: number
}
