import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

import { ShippingPage } from '../shipping/shipping';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
   
    public user;
    public list = [];
    public display;
    public cartItem: number = 0;
    public singleItem: {image: string, title: string, price: number, description: Array<string>, size: string, quantity: number };

    constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public alertCtrl: AlertController, 
      public storage: Storage) {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
         this.user = true;
         unsubscribe();
        } 
      });
           
  }

  ionViewWillEnter(){
    this.storage.length().then(result =>{
      if(result == 0){
        this.display=false;
      }else{
         this.storage.forEach((value:any, key:string) => {
          this.storage.get(key).then((val)=>{
              if(key == 'cartId'){
                 this.cartItem = val.id;
              }else if (key == 'shippingForm'){
                return;
              }else{
                 this.display =true;
                 this.list.push({
                  image:val.image,
                  title:val.title,
                  price:val.price,
                  desc:val.description,
                  size: val.size, 
                  qty: val.quantity, 
                  keyname:key});   
              }
          }) 
        })
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
   
  }

  

  confirmPage(){
    if(this.user){
      this.navCtrl.push(ShippingPage);
       this.list.length=0;
    }else{
    	let alert = this.alertCtrl.create();
      alert.setTitle('Checkout Options');
      
      alert.addInput({
        type: 'radio',
        label: 'Continue As Guest',
        value: 'guest',
        checked: true
      });

      alert.addInput({
        type: 'radio',
        label: 'Login Existing Account',
        value: 'member'
      });


      alert.addButton('Cancel');
      alert.addButton({
        text: 'Ok',
        handler: data => {
          console.log('Radio data:', data);
          if(data == 'guest'){
          	this.navCtrl.push(ShippingPage);
          } else if(data == 'member'){
          	this.navCtrl.push(LoginPage,{member:'memberLogin'});
          }
          this.list.length=0;
        }
      });

      alert.present();
    }
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
            if (index > -1) {
               this.storage.remove(item.keyname);
               this.list.splice(index, 1);
            }
            this.cartItem--;
            if(this.list.length == 0){
              this.storage.remove('cartId');
              this.display = false;
            }else{
              this.storage.set('cartId',{id:this.cartItem});
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


  addQty(e,li) {
   li.qty++;
   this.storage.get(li.keyname).then((val) =>{
     let valueObj = val;

     valueObj.quantity = li.qty;

     this.storage.set(li.keyname,valueObj);
   })
  
  }
  minQty(e,li) {
    if(li.qty == 1){
      return;
    }else{
      li.qty--;
      this.storage.get(li.keyname).then((val) =>{
        let valueObj = val;

        valueObj.quantity = li.qty;

        this.storage.set(li.keyname,valueObj);
      })
    }
  }
 
}
