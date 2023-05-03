import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { User } from '../users/schemas/users.model'

import { CreateArticleInput } from './dto/create-article.input'
import { UpdateArticleInput } from './dto/update-article.input'
import { Article, ArticleDocument } from './schemas/articles.model'

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name)
    private articleModel: Model<ArticleDocument>,
  ) {}
  async create(createArticleInput: CreateArticleInput, user: User) {
    return this.articleModel.create({
      ...createArticleInput,
      user,
    })
  }

  async findAll() {
    return this.articleModel.find()
  }

  async findMyArticles(user: User) {
    return this.articleModel.find({ user })
  }

  async findOne(id: number) {
    return this.articleModel.findById(id)
  }

  async update(id: string, updateArticleInput: UpdateArticleInput) {
    return this.articleModel.findByIdAndUpdate(id, updateArticleInput, {
      new: true,
    })
  }

  async remove(id: string) {
    return `This action removes a #${id} article`
  }
}
