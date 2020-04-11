import { MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets'

@WebSocketGateway()
export class EventsGateway {
  @SubscribeMessage('events')
  handleMessage(@MessageBody() data: string): WsResponse<string> {
    const event = 'events'
    return { event, data: 'pong' }
  }
}
