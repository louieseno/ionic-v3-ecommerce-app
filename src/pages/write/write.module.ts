import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WritePage } from './write';

@NgModule({
  declarations: [
    WritePage,
  ],
  imports: [
    IonicPageModule.forChild(WritePage),
  ],
})
export class WritePageModule {}
