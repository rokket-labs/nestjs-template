import { prop } from '@typegoose/typegoose'
import { ObjectType, Field, ID } from 'type-graphql'
import { User } from 'src/users/users.schema'
import { Item } from 'src/items/items.schema'

@ObjectType()
export class Order {
  @Field(() => ID)
  public id!: string

  @Field(() => User)
  @prop()
  public user!: string

  @Field(() => Item)
  @prop()
  public item!: string

  @Field(() => Number)
  @prop()
  public quantity!: number
}
