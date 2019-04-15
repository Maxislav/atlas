import { Injectable } from '@angular/core';
import { CONNECTION, SocketService } from 'src/app/modules/socket/socket.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  public isOnline: CONNECTION;
  public socketConnectionObservable: Observable<CONNECTION>;

  constructor(private socketService: SocketService) {
    socketService.init();
    socketService.socketConnectionObservable.subscribe((con: CONNECTION) => {
      this.isOnline = con;
    });

    this.socketConnectionObservable = socketService.socketConnectionObservable;
  }


  init() {

  }

  public getUser() {
    return this.socketService.$get('getUser', null);
  }

  public onAuth() {
    return this.socketService.$get('onAuth', null);
  }
}
