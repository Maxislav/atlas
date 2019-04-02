import { Injectable } from '@angular/core';
import * as io from '../../../libs/socket.io.js';
import * as SocketIO from 'socket.io';
import { Deferred } from 'src/app/utils/deferred';


class ExtensibleFunction extends Function {
  constructor(f) {
    super();
    return Object.setPrototypeOf(f, new.target.prototype);
  }
}

interface AtServer extends SocketIO.Server {
  $get: (eName: string, obj: { [key: string]: any }) => Promise<any>;
}

class AtSocketIo {
  public emit: (eName: string, obj: any) => void;
  public on: (eName: string, f: (data) => void) => void;
  private readonly deferredHash: { [key: string]: any };
  private readonly eNameListener: { [key: string]: any };
  private readonly server: SocketIO.Server;

  constructor(host) {
    this.deferredHash = {};
    this.eNameListener = {};
    this.server = io.connect(host);
    this.on = this.server.on.bind(this.server);
    this.emit = this.server.emit.bind(this.server);
  }

  $get(eName, obj: { [key: string]: any }): Promise<any> {

    const hash = this.getHash();
    this.deferredHash[hash] = {
      timeoutId: setTimeout(() => {
        this.deferredHash[hash].deferred.reject(`End of timeout -> ${eName}`);
        delete this.deferredHash[hash];
      }, 5000),
      deferred: new Deferred()
    };
    this.eNameListener[eName] = this.eNameListener[eName] || this.on(eName, (data) => {
      const timeoutId = this.deferredHash[data.hash].timeoutId;
      clearTimeout(timeoutId);
      this.deferredHash[data.hash].deferred.resolve(data);
      delete this.deferredHash[hash];
    });

    this.emit(eName, Object.assign(obj, {hash}));
    return this.deferredHash[hash].deferred.promise;
  }

  private getHash() {
    const $possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let hash = '';
    for (let i = 0; i < 32; i++) {
      hash += '' + $possible[this.getRandom(0, 61, true)];
    }
    if (!!this.deferredHash[hash]) {
      return this.getHash();
    } else {
      return hash;
    }
  }


  private getRandom(min, max, int): number {
    let rand = min + Math.random() * (max - min);
    if (int) {
      rand = Math.round(rand);
    }
    return rand;
  }

}


@Injectable()
export class SocketService {

  constructor() {
    const socket: AtSocketIo = new AtSocketIo('http://localhost:9092');
    socket.on('connect', () => {
      console.log('connect');
    });
    const d: Date = new Date();

    setTimeout(() => {
      socket.$get('getUser', {
        userName: 'userName',
        message: 'message'
      });
    }, 2000);
  }
}
