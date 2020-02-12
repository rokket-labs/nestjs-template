import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TerminusModule } from '@nestjs/terminus'
import { TypegooseModule } from 'nestjs-typegoose'
import { AccessControlModule } from 'nestjs-role-protected'

import { ItemsModule } from './items/items.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TerminusOptionsService } from './terminus-options.service'
import { OrdersModule } from './orders/orders.module'
import { roles } from './app.roles'
import { EventsModule } from './events/events.module'
import { EmailModule } from './email/email.module'
import { MailerModule, HandlebarsAdapter } from '@nest-modules/mailer'
import { FilesModule } from './files/files.module'

@Module({
  imports: [
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
    TerminusModule.forRootAsync({
      useClass: TerminusOptionsService,
    }),
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
    EmailModule,
    ItemsModule,
    AuthModule,
    UsersModule,
    OrdersModule,
    EventsModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
