import { Action, AppAbility } from '../../casl/casl-ability.factory'
import { IPolicyHandler } from '../../casl/policies.guard'
import { Article } from '../schemas/articles.model'

export class EditArticleHandler implements IPolicyHandler {
  constructor(private article: Article) {}

  handle(ability: AppAbility): boolean {
    if (!this.article) return false

    return ability.can(Action.Update, this.article)
  }
}
