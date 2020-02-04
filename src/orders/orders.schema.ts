import { prop, Ref } from '@typegoose/typegoose'
import { ObjectType, Field, ID } from 'type-graphql'
import { User } from 'src/users/users.schema'
import { Item } from 'src/items/items.schema'

@ObjectType()
export class Order {
  @Field(() => ID)
  public id!: string

  @Field(() => User)
  @prop({ ref: 'User' })
  public user!: Ref<User>

  @Field(() => Item)
  @prop({ ref: 'Item' })
  public item!: Ref<Item>

  @Field(() => Number)
  @prop()
  public quantity!: number
}
