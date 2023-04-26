import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { GqlAuthGuard } from 'src/auth/gql-auth.guard'
import { Action, AppAbility } from 'src/casl/casl-ability.factory'
import {
  CheckPolicies,
  HasPermission,
  PoliciesGuard,
} from 'src/casl/policies.guard'
import { User } from 'src/users/schemas/users.model'
import { CurrentUser } from 'src/utils/decorators/current-user'

import { CreateArticleInput } from './dto/create-article.input'
import { UpdateArticleInput } from './dto/update-article.input'
import { EditArticleHandler } from './policies/edit-article-policy.handler'
import { Article } from './schemas/articles.model'
import { ArticlesService } from './articles.service'

@Resolver(() => Article)
export class ArticlesResolver {
  constructor(private readonly articlesService: ArticlesService) {}

  @UseGuards(GqlAuthGuard, PoliciesGuard)
  @HasPermission([[Action.Create, Article]])
  // @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Article))
  @Mutation(() => Article)
  createArticle(
    @Args('createArticleInput') createArticleInput: CreateArticleInput,
    @CurrentUser() currentUser: User,
  ) {
    return this.articlesService.create(createArticleInput, currentUser)
  }

  @Query(() => [Article], { name: 'articles' })
  findAll() {
    return this.articlesService.findAll()
  }

  @UseGuards(GqlAuthGuard, PoliciesGuard)
  @Query(() => [Article], { name: 'myArticles' })
  findMyArticles(@CurrentUser() currentUser: User) {
    return this.articlesService.findMyArticles(currentUser)
  }

  @Query(() => Article, { name: 'article' })
  findOne(@Args('id') id: number) {
    return this.articlesService.findOne(id)
  }

  @UseGuards(GqlAuthGuard, PoliciesGuard)
  // @HasPermission([[Action.Update, Article]])
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Update, Article, '123'),
  )
  @Mutation(() => Article)
  updateArticle(
    @Args('updateArticleInput') updateArticleInput: UpdateArticleInput,
  ) {
    return this.articlesService.update(
      updateArticleInput.id,
      updateArticleInput,
    )
  }

  @UseGuards(GqlAuthGuard, PoliciesGuard)
  @CheckPolicies(EditArticleHandler)
  // @HasPermission([[Action.Delete, Article]])
  @Mutation(() => Boolean)
  removeArticle(@Args('id') id: string) {
    console.log(id)

    return true
    // return this.articlesService.remove(id)
  }
}
