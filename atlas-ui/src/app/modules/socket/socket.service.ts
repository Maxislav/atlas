import { Injectable } from '@angular/core';
import * as io from '../../../libs/socket.io.js';

@Injectable()
export class SocketService {
  constructor() {
    const socket = io.connect('http://localhost:9092');
    socket.on('connect', function () {
      console.log('connect');
    });

  }
}
