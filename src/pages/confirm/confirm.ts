import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ConfirmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {
  
  public paymentMethod;
  public paymentIcon;
  public totalpay: number = 0;
  public orderNumber;
  public list = [];
  public shipping =[];
  public cartItem: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public loadingCtrl: LoadingController,) {
  	this.paymentMethod = this.navParams.get("paymentMethod");
  	this.paymentIcon = this.navParams.get("paymentIcon");
  	this.totalpay = this.navParams.get("totalpay");
  	this.orderNumber = this.navParams.get("orderNum");
    console.log(this.totalpay);
  	this.storage.forEach((value:any, key:string) => {
      this.storage.get(key).then((val)=>{
          if(key == 'cartId'){
             this.cartItem = val.id;
          }else if (key == 'shippingForm'){
            this.shipping.push({
               fullname: val.fullname,
               address: val.address,
               city: val.city,
               contact: val.contact
            });
          }else{
             this.list.push({
              image:val.image,
              item:val.title,
              price:val.price,
              desc:val.description,
              size: val.size, 
              qty: val.quantity, 
              keyname:key
            }); 
          }
      }) 
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
  }

 
  continue(){
    this.storage.clear();
    this.list.length=0;
    this.shipping.length=0;
  	this.navCtrl.setRoot(HomePage);
	  let loader = this.loadingCtrl.create({
    	duration: 1000
    });
    loader.present();
  }
}
