import { prop } from '@typegoose/typegoose'
import { ObjectType, Field, ID } from 'type-graphql'
import { Order } from 'src/orders/orders.schema'

@ObjectType()
export class Item {
  @Field(() => ID)
  public id!: string

  @Field(() => String)
  @prop()
  public title!: string

  @Field(() => Number)
  @prop()
  public price!: number

  @Field(() => String)
  @prop()
  public description!: string

  @Field(() => [Order], { nullable: 'itemsAndList' })
  public orders?: Order[]
}
