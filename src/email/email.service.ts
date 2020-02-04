import { Injectable } from '@nestjs/common'
import { MailerService } from '@nest-modules/mailer'

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  async example(token: string, email: string): Promise<void> {
    return this.mailerService.sendMail({
      to: email, // list of receivers
      subject: 'Testing Nest MailerModule ✔', // Subject line
      template: 'welcome', // The `.pug` or `.hbs` extension is appended automatically.
      context: {
        // Data to be sent to template engine.
        token,
        username: 'john doe',
      },
    })
  }
}
