import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TransactionProvider } from '../../providers/transaction/transaction';
import * as firebase from 'firebase';
/**
 * Generated class for the ReviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
import { HomePage } from '../home/home';
import { ConfirmPage } from '../confirm/confirm';

@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {
  
  public list = [];
  public shipping =[];
  public paymentMethod;
  public paymentIcon;
  public cartItem: number = 0;
  public total: number = 0;
  public itemRemove: number = 0;
  public member;
  public orderNumber;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public storage: Storage,
    public alertCtrl: AlertController,
    public transact: TransactionProvider,
    public modalCtrl: ModalController
  ) {
   this.paymentMethod = this.navParams.get('payment');
   this.paymentIcon = this.navParams.get('icon');

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
            this.total += (val.price * val.quantity);  
          }
      }) 
    })
   
   const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
       this.member = true;
       unsubscribe();
      } else {  
          this.member = false;
          unsubscribe();
      }
    });
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPage');
  }

  deleteItem(item){
    
    let confirm = this.alertCtrl.create({
      title: 'DELETE',
      message: "Are you sure you want to delete item?",
      buttons: [
        {
          text: 'Yes',
          handler: data => {
            let index = this.list.findIndex(x => x.keyname==item.keyname);
            this.itemRemove = item.price * item.qty;
            if (index > -1) {
               
               this.storage.remove(item.keyname);
               this.list.splice(index, 1);
            }
            this.cartItem--;
            if(this.cartItem == 0){
              this.storage.clear();
              this.navCtrl.push(HomePage);
            }else{
              this.storage.set('cartId',{id:this.cartItem});
              this.total -= this.itemRemove;
            }
          }
        },
        {
          text: 'No',
          handler: data => {
            console.log('Cancelled');
          }
        }
      ]
    });
    confirm.present();
  }

  payOrder(){
    this.orderNumber = this.stringGen(6);
    
      for(var i = 0; i < this.list.length; i++){
        let items = this.list[i];
        let shipment = this.shipping;
        let orderDetails ={
          payment: this.paymentMethod,
          total: this.total,
          orderNumber: this.orderNumber
        };

         if(this.member){
         let userID = firebase.auth().currentUser.uid;
         this.transact.memberTransact(userID,items,shipment,orderDetails);
         this.navCtrl.setRoot(ConfirmPage,{
            "paymentMethod" : this.paymentMethod,
            "paymentIcon" : this.paymentIcon,
            "totalpay": this.total,
            "orderNum": this.orderNumber
         });
         }else{

            this.transact.nonmemberTransact(items,shipment,orderDetails);
            this.navCtrl.setRoot(ConfirmPage,{
              "paymentMethod" : this.paymentMethod,
              "paymentIcon" : this.paymentIcon,
              "totalpay": this.total,
              "orderNum": this.orderNumber
           });
         }
      }
      
    
  }

  stringGen(len){
      var text = " ";
      
      var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
      
      for( var i=0; i < len; i++ )
          text += charset.charAt(Math.floor(Math.random() * charset.length));
      
      return text;
    }


}
