import { Injectable } from '@angular/core';
import { SocketServer } from 'src/app/modules/socket/socket.server';


@Injectable()
export class SocketService {
  private socketServer: SocketServer;

  public init() {
    this.socketServer = new SocketServer('http://localhost:9092');
    this.socketServer.on('connect', () => {
      console.log('Socket connect');
    });
    this.socketServer.on('disconnect', () => {
      console.log('Socket disconnect');
    });
    /*setTimeout(() => {
      this.socketServer.$get('getUser', {
        userName: 'userName',
        message: 'message'
      });
    }, 2000);*/
  }

  $get(eName: string, data: any): Promise<any> {
    return this.socketServer.$get(eName, data);
  }
}
