import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from 'src/app/component/map/map.component';
import { AuthComponent } from 'src/app/component/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/map',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthComponent,
    resolve: {},
    children: [
      {
        path: 'map',
        component: MapComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
