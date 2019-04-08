import { Injectable } from '@angular/core';
import { SocketServer } from 'src/app/modules/socket/socket.server';
import { Observable } from 'rxjs';
import { Subscriber } from 'rxjs/src/internal/Subscriber';

export enum CONNECTION {
  CONNECT,
  DISCONNECT
}


@Injectable()
export class SocketService {

  private _socketServer: SocketServer;
  private _subscriber: Subscriber<CONNECTION>;
  public socketConnectionObservable: Observable<CONNECTION>;

  constructor() {
    this.socketConnectionObservable = Observable.create((subscriber) => {
      this._subscriber = subscriber;
    });
  }

  public init() {
    this._socketServer = new SocketServer('http://localhost:9092');
    this._socketServer.on('connect', () => {
      if (!!this._subscriber) {
        this._subscriber.next(CONNECTION.CONNECT);
      }
    });
    this._socketServer.on('disconnect', () => {
      if (!!this._subscriber) {
        this._subscriber.next(CONNECTION.DISCONNECT);
      }
    });
  }

  getSocketServer(): SocketServer {
    return this._socketServer;
  }

  $get(eName: string, data: any): Promise<any> {
    return this._socketServer.$get(eName, data);
  }
}
