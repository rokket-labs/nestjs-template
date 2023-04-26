import { Action, AppAbility } from 'src/casl/casl-ability.factory'
import { IPolicyHandler } from 'src/casl/policies.guard'

import { Article } from '../schemas/articles.model'

export class EditArticleHandler implements IPolicyHandler {
  constructor(private article: Article) {}

  handle(ability: AppAbility): boolean {
    if (!this.article) return false

    return ability.can(Action.Update, this.article)
  }
}
