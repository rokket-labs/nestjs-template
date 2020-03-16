import { InputType } from '@nestjs/graphql'
import { Exclude } from 'class-transformer'
import { IsArray, IsEnum } from 'class-validator'
import { Roles } from 'src/app.roles'

@InputType()
export class UserInput {
  @Exclude()
  _id?: string

  @Exclude()
  @IsArray()
  @IsEnum(Roles, { each: true })
  roles?: Roles[]

  email: string

  password: string

  firstName?: string

  lastName?: string
}
