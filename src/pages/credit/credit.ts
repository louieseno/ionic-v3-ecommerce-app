import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CreditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

import { ReviewPage } from '../review/review';

@IonicPage()
@Component({
  selector: 'page-credit',
  templateUrl: 'credit.html',
})
export class CreditPage {
  
  month: '1990-02-19';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreditPage');
  }

  paymentCon(){
  	
  	this.navCtrl.push(ReviewPage,{
  		payment : 'Pay By Credit Card',
  		icon: 'card'
  	});

  }

}
