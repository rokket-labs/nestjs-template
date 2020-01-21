import { prop } from '@typegoose/typegoose'
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class User {
  @Field(() => ID)
  public id!: string

  @Field(() => String)
  @prop({ unique: true })
  public email!: string

  @Field(() => String)
  @prop()
  public firstName?: string

  @Field(() => String)
  @prop()
  public lastName?: string

  @Field(() => String)
  @prop()
  public password!: string
}
