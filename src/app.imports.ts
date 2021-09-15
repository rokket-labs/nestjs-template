import { join } from 'path'

import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import { TerminusModule } from '@nestjs/terminus'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'

export const AppImports = [
  // ConfigModule for environment variables
  ConfigModule.forRoot({ isGlobal: true }),
  // MongooseModule for MongoDB
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGO_URL', process.env.MONGO_URL),
      // connectionFactory: (connection: Connection) => {
      //   // Add global mongoose plugins here
      //   console.log('ADDING PLUGIN TO MONGO')
      //   connection.plugin(accessibleRecordsPlugin)

      //   return connection
      // },
    }),
    inject: [ConfigService],
  }),
  // Apollo Server GraphQLModule
  GraphQLModule.forRoot({
    autoSchemaFile: join(process.cwd(), 'schema.gql'),
    sortSchema: true,
    playground: false,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  }),
  // Terminus
  TerminusModule,
]
