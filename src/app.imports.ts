import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TerminusModule } from '@nestjs/terminus';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AccessControlModule } from 'nestjs-role-protected';
import { roles } from './app.roles';

export const AppImports = [
  ConfigModule.forRoot({ isGlobal: true }),
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: 'schema.gql',
    subscriptions: {
      'graphql-ws': true,
    },
  }),
  TypegooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
      uri: config.get<string>('MONGO_URI', process.env.MONGO_URI),
    }),
    inject: [ConfigService],
  }),
  AccessControlModule.forRoles(roles),
  TerminusModule,
];
