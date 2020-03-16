import { User } from 'src/users/users.entity'

export interface Payload {
  userId: string
  user: User
}
