import {
  TerminusEndpoint,
  TerminusOptionsFactory,
  DNSHealthIndicator,
  TerminusModuleOptions,
  MongooseHealthIndicator,
} from '@nestjs/terminus'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
  constructor(
    private readonly dns: DNSHealthIndicator,
    private readonly mongoose: MongooseHealthIndicator,
  ) {}

  createTerminusOptions(): TerminusModuleOptions {
    const healthEndpoint: TerminusEndpoint = {
      url: '/health',
      healthIndicators: [
        async () => this.dns.pingCheck('google', 'https://google.com'),
        async () => this.mongoose.pingCheck('mongo', { timeout: 3000 }),
      ],
    }
    return {
      endpoints: [healthEndpoint],
    }
  }
}
