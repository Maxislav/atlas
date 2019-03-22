import { NgModule } from '@angular/core';
import { SocketService } from 'src/app/modules/socket/socket.service';
@NgModule({
  providers: [
    SocketService
  ]
})
export class SocketModule {}
