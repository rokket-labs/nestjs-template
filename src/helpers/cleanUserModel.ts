import { assoc, omit, pipe, prop } from 'ramda'

import { User } from 'src/users/users.model'

const omitValues = omit(['_id', '__v', 'password'])

const renameToId = (user: User): User => {
  const id = prop('_id', user)

  return assoc('id', id, user)
}

export const cleanUserModel: (user: User) => User = pipe(
  JSON.stringify,
  JSON.parse,
  renameToId,
  omitValues,
)
