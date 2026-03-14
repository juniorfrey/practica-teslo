import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

interface ConnetedCLients {
    [id: string]: {
        socket: Socket;
        user: User;
    };
}

@Injectable()
export class MessagesWsService {

    private connectedClients: ConnetedCLients = {};

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){

    }

    async registerClient(client: Socket, userId: string) {
        const user = await this.userRepository.findOneBy({id: userId});
        if (!user) throw new Error("User not found");
        if (!user.isActive) throw new Error("User is not active");

        this.checkUserConnection(user);

        this.connectedClients[client.id] = {
            socket: client,
            user,
        };
    }

    removeClient(clientId: string) {
        delete this.connectedClients[clientId];
    }

    getConnectedClients(): string[] {
        //return this.connectedClients;
        console.log(this.connectedClients);
        return Object.keys(this.connectedClients);
    }

    getUserFullName(socketId: string) {
        return this.connectedClients[socketId].user.fullname;
    }

    private checkUserConnection(user: User){
        for(const clietId of Object.keys(this.connectedClients)){
            const connectedClient = this.connectedClients[clietId];
            if(connectedClient.user.id === user.id){
                connectedClient.socket.disconnect();
                break
            }
        }
    }

}
