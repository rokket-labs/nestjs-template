import { User } from 'src/users/users.model'

export type UserPayload = {
  userId: string
  user: User
}

export type Payload = {
  user: UserPayload
}
