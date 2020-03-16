import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Metadata {
  @Field(() => Int)
  count?: number
}
