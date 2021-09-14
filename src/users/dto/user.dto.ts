import { ObjectType, OmitType, PartialType } from '@nestjs/graphql'

import { User } from '../schemas/users.model'

@ObjectType()
export class UserDto extends PartialType(OmitType(User, ['cognitoUserId'])) {}
