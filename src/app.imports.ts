import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TerminusModule } from '@nestjs/terminus'
import { AccessControlModule } from 'nestjs-role-protected'
import { TypegooseModule } from 'nestjs-typegoose'

import { roles } from './app.roles'

export const AppImports = [
  ConfigModule.forRoot({ isGlobal: true }),
  GraphQLModule.forRoot({
    autoSchemaFile: 'schema-generated.gql',
  }),
  TypegooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
      uri: config.get<string>('MONGO_URI', process.env.MONGO_URI),
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    inject: [ConfigService],
  }),
  AccessControlModule.forRoles(roles),
  TerminusModule,
]
