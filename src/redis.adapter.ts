import { IoAdapter } from '@nestjs/platform-socket.io'
import * as redisIoAdapter from 'socket.io-redis'

const redisAdapter = redisIoAdapter({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
})

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: object): object {
    const server = super.createIOServer(port, options)
    server.adapter(redisAdapter)
    return server
  }
}
