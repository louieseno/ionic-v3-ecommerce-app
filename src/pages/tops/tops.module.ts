import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopsPage } from './tops';

@NgModule({
  declarations: [
    TopsPage,
  ],
  imports: [
    IonicPageModule.forChild(TopsPage),
  ],
})
export class TopsPageModule {}
