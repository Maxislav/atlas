import { Injectable } from '@angular/core';
import { SocketService } from 'src/app/modules/socket/socket.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {



  constructor(private socketService: SocketService) {
    socketService.init();
    socketService.socketConnectionObservable.subscribe((eName) => {
      console.log(eName);
    });
  }

  public getUser() {
    return this.socketService.$get('getUser', null);
  }
}
