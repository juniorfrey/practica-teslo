import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../auth/interfaces';

@WebSocketGateway({cors: true})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()  wss: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    
    const token = client.handshake.headers.authentication as string;
     let payload: JwtPayload;
    try {
      payload = this.jwtService.verify(token);
      await this.messagesWsService.registerClient(client, payload.id);
    } catch (error) {
      client.disconnect();
      return;
    }

    

    this.wss.emit('connected-clients', this.messagesWsService.getConnectedClients());
    console.log({conectados: this.messagesWsService.getConnectedClients()})
  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);
    this.wss.emit('connected-clients', this.messagesWsService.getConnectedClients());
  }

  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: NewMessageDto) {
    
    //! Emitir mensaje unicamente al cliente
     /* client.emit("message-from-server", {
       clientId: client.id,
       message: payload.message || "no-message",
     }); */

     //! Emitir a todos Menos, al cliente inicial
     /* client.broadcast.emit("message-from-server", {
       clientId: client.id,
       message: payload.message || "no-message",
     }); */

     this.wss.emit("message-from-server", {
       fullname: this.messagesWsService.getUserFullName(client.id),
       message: payload || "no-message",
     });
  }
}
