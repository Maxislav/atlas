import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketModule } from 'src/app/modules/socket/socket.module';
import { SocketService } from 'src/app/modules/socket/socket.service';
import { ApiService } from 'src/app/modules/api/api.service';

@NgModule({
  declarations: [],
  providers: [
    ApiService
  ],
  imports: [
    CommonModule,
    SocketModule
  ]
})
export class ApiModule {
  constructor(private socketService: SocketService) {
    socketService.init();
  }
}
