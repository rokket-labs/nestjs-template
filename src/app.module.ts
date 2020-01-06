import { Module, ValidationPipe } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ItemsModule } from './items/items.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { APP_PIPE } from '@nestjs/core'

const databaseUrl = process.env.MONGO_URL
  ? `${process.env.MONGO_URL}/nestgraphql`
  : 'mongodb://localhost/nestgraphql'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    MongooseModule.forRoot(databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    ItemsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
