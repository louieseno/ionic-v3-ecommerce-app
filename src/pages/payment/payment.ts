import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
import { CreditPage } from '../credit/credit';
import { ReviewPage } from '../review/review';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  
  public pay='creditcard';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  paymentCon(){
  	if(this.pay == 'cashon'){
  		this.navCtrl.push(ReviewPage,{
        payment: 'Cash On Delivery',
        icon: 'cash'
      });
  	} else if(this.pay == 'creditcard'){
      this.navCtrl.push(CreditPage);
    }
  }

}
