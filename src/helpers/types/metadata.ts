import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Metadata {
  @Field(() => Number)
  public count?: number
}
