import { NgModule } from '@angular/core';
import { LocalStorageService } from 'src/app/modules/local-storage/local-storage.service';

@NgModule({
  providers: [
    LocalStorageService
  ]
})
export class LocalStorageModule {}
