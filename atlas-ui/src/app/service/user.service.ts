import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/modules/api/api.service';
import { CONNECTION } from 'src/app/modules/socket/socket.service';

import JSEncrypt from '../../libs/jsencrypt.js';


export interface User {
  id: number;
  name: string;
  device: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;
  public mattsPublicKeyString: string;
  public clientPubKey: string;

  constructor(private  apiService: ApiService) {
    this.user = {
      id: -1,
      name: null,
      device: null
    };
  }

  defineUser() {
    // const rsa: RSA = new RSA();
    // const pubKey = rsa.pubKey
    this.apiService.socketConnectionObservable.subscribe((connection: CONNECTION) => {

      switch (connection) {
        case CONNECTION.CONNECT: {

          const rr = new JSEncrypt();
          rr.getKey((k) => {
            const f = rr.getPublicKeyB64();
            this.apiService.onAuth({
              pubKey: f //  `${this.mattsPublicKeyString}` // `${this.mattsPublicKeyString}`
            })
              .then(data => {
                console.log(data);
                this.clientPubKey = data.pubKey;
                console.log(rr.decrypt(data.name));

                /// c onst decryptionResult = cryptico.decrypt(data.name, mattsRSAkey);
                // this.user.name = data.name;
              });
          });
          break;
        }
        default: {

        }
      }

      if (connection === CONNECTION.CONNECT) {


      }
    });
  }

  onConnect() {

  }
}
