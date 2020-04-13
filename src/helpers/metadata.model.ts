import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Metadata {
  count?: number
}
