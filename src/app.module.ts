import { Module } from '@nestjs/common'

import { ArticleModule } from './articles/articles.module'
import { AuthModule } from './auth/auth.module'
import { CaslModule } from './casl/casl.module'
// import { RolesModule } from './roles/roles.module'
import { UsersModule } from './users/users.module'
import { AppImports } from './app.imports'
import { AppResolver } from './app.resolver'
import { AppService } from './app.service'

@Module({
  imports: [...AppImports, AuthModule, UsersModule, CaslModule, ArticleModule],
  providers: [AppService, AppResolver],
})
export class AppModule {}
