import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmPage } from './confirm';

@NgModule({
  declarations: [
    ConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmPage),
  ],
})
export class ConfirmPageModule {}
