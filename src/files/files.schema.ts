import { prop } from '@typegoose/typegoose'
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class File {
  @Field(() => ID)
  @prop({ required: true })
  public url!: string

  @Field(() => Boolean)
  @prop({ required: true })
  public success!: boolean
}
