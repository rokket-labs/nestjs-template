import { prop } from '@typegoose/typegoose'
import { ObjectType, Field, ID } from 'type-graphql'

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
}
