import { ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

// import { Role } from 'src/roles/schemas/roles.model'

@Schema()
@ObjectType()
export class User {
  @Prop({ index: 'text', unique: true })
  cognitoUserId: string

  // @Prop({ type: Types.ObjectId, ref: 'Role' })
  // role: Role

  @Prop({ required: true, lowercase: true })
  email: string

  @Prop()
  firstName: string

  @Prop()
  lastName: string

  @Prop()
  isAdmin: boolean
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)
