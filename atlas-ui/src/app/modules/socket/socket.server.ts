import { Deferred } from 'src/app/utils/deferred';
import * as SocketIO from '../../../libs/socket.io.js';

class XZ {
  constructor(c) {
    Object.setPrototypeOf(new.target.prototype, c);
  }
}

export class SocketServer extends XZ {
  public emit: (eName: string, obj: any) => void;
  public on: (eName: string, f: (data) => void) => void;
  private readonly deferredHash: { [key: string]: any };
  private readonly eNameListener: { [key: string]: any };

  constructor(host) {
    super(SocketIO.connect(host));
    this.deferredHash = {};
    this.eNameListener = {};
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
      this.deferredHash[data.hash].deferred.resolve(data.data);
      delete this.deferredHash[hash];
    });

    this.emit(eName, Object.assign(obj || {}, {hash}));
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
