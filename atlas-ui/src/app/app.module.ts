import { BrowserModule } from '@angular/platform-browser';
import { ApplicationRef, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { MainContentComponent } from './component/main-content/main-content.component';
import { MapComponent } from './component/map/map.component';
import { AuthComponent } from './component/auth/auth.component';
import { SocketModule } from 'src/app/modules/socket/socket.module';
import { SocketService } from 'src/app/modules/socket/socket.service';
import { MenuLeftComponent } from './component/header/menu-left/menu-left.component';
import { MenuRightComponent } from './component/header/menu-right/menu-right.component';
import { OnAirComponent } from './component/header/menu-left/on-air/on-air.component';
import { LocalStorageModule } from 'src/app/modules/local-storage/local-storage.module';
import { RoutesComponent } from './component/header/menu-left/routes/routes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from 'src/app/service/user.service';
import { ApiModule } from 'src/app/modules/api/api.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainContentComponent,
    MapComponent,
    AuthComponent,
    MenuLeftComponent,
    MenuRightComponent,
    OnAirComponent,
    RoutesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SocketModule,
    LocalStorageModule,
    ApiModule
  ],
  entryComponents: [AppComponent],
  providers: [
    UserService
  ],
  // bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private userService: UserService) {
    // socketService.init();
    userService.defineUser();
  }

  ngDoBootstrap(appRef: ApplicationRef) {
    appRef.bootstrap(AppComponent);
  }
}
