import { Module } from '@nestjs/common'

import { ArticlesModule } from './articles/articles.module'
import { AuthModule } from './auth/auth.module'
import { CaslModule } from './casl/casl.module'
import { FilesModule } from './files/files.module'
import { HealthController } from './health/health.controller'
import { UsersModule } from './users/users.module'
import { AppImports } from './app.imports'
import { AppResolver } from './app.resolver'
import { AppService } from './app.service'

@Module({
  imports: [
    ...AppImports,
    AuthModule,
    UsersModule,
    CaslModule,
    ArticlesModule,
    FilesModule,
  ],
  controllers: [HealthController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
