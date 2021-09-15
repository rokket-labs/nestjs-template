import { AbilityBuilder } from '@casl/ability'

import { Article } from 'src/articles/schemas/articles.model'
import { User } from 'src/users/schemas/users.model'

import { Action, AppAbility } from '../casl-ability.factory'

export const ArticleAbilities = (
  { can, cannot }: AbilityBuilder<AppAbility>,
  user: User,
) => {
  can(Action.Update, Article, { user })
  cannot(Action.Delete, Article, { isPublished: true })
}
