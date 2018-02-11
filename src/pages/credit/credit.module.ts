import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreditPage } from './credit';

@NgModule({
  declarations: [
    CreditPage,
  ],
  imports: [
    IonicPageModule.forChild(CreditPage),
  ],
})
export class CreditPageModule {}
