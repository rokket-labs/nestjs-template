import { Field, ID, ObjectType } from '@nestjs/graphql'
import { prop } from '@typegoose/typegoose'

@ObjectType()
export class File {
  @Field(() => ID)
  @prop({ required: true })
  url: string

  @prop({ required: true })
  success: boolean
}
