import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
// import { TerminusModule } from '@nestjs/terminus'
import { AccessControlModule } from 'nest-access-control'
import { TypegooseModule } from 'nestjs-typegoose'

import { roles } from './app.roles'

// import { TerminusOptionsService } from './terminus-options.service'

export const AppImports = [
  ConfigModule.forRoot({ isGlobal: true }),
  GraphQLModule.forRoot({
    autoSchemaFile: 'schema-generated.gql',
    context: ({ req, res }) => ({ req, res }),
  }),
  AccessControlModule.forRoles(roles),
  TypegooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
      uri: config.get<string>('MONGO_URL', process.env.MONGO_URL),
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    inject: [ConfigService],
  }),
  // TerminusModule.forRootAsync({
  //   useClass: TerminusOptionsService,
  // }),
  MailerModule.forRoot({
    transport: `smtps://${process.env.SMTP_USERNAME}:${process.env.SMTP_PASSWORD}@${process.env.SMTP_DOMAIN}`,
    defaults: {
      from: `"Testy Spammer" <${process.env.SMTP_EMAIL_ADDRESS}>`,
    },
    template: {
      dir: `${__dirname}/templates`,
      adapter: new HandlebarsAdapter(), // or new PugAdapter()
      options: {
        strict: true,
      },
    },
  }),
]
