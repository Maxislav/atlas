import { Injectable } from '@angular/core';
import { SocketServer } from 'src/app/modules/socket/socket.server';


@Injectable()
export class SocketService {
  public init() {
    const socket: SocketServer = new SocketServer('http://localhost:9092');
    socket.on('connect', () => {
      console.log('Socket connect');
    });
    socket.on('disconnect', () => {
      console.log('Socket disconnect');
    });
    setTimeout(() => {
      socket.$get('getUser', {
        userName: 'userName',
        message: 'message'
      });
    }, 2000);
  }
}
