import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import * as firebase from 'firebase';
/**
 * Generated class for the ShippingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

import { PaymentPage } from '../payment/payment';

@IonicPage()
@Component({
  selector: 'page-shipping',
  templateUrl: 'shipping.html',
})
export class ShippingPage {
  
 public shipping;
 public shippingForm: FormGroup;
 public submitAttempt: boolean = false;
 public contactBind;
 public fullnameBind;
 public attribute;
 
  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams, 
  public formBuilder: FormBuilder, 
  public storage: Storage,
  public usersService: UserServiceProvider) {
  	this.shippingForm = formBuilder.group({
        fullname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        address: ['',Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9#,-_ ]*'), Validators.required])],
        city: ['',Validators.required],
        contact: ['', Validators.compose([Validators.minLength(11),Validators.maxLength(11), Validators.pattern('[0-9 ]*'), Validators.required])]
    });
    
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let userID = firebase.auth().currentUser.uid;
        this.usersService.getuser(userID).then(snapshot => {
        this.fullnameBind = snapshot.val().firstname + " " + snapshot.val().lastname;
        this.contactBind = snapshot.val().contact;
        
      })
        unsubscribe();
      } 
    });
   
     
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShippingPage');
  }

  conShip(){
  	this.submitAttempt = true;
  	if(!this.shippingForm.valid){
      return;
    } else {
       this.storage.set("shippingForm", this.shippingForm.value);
       this.navCtrl.push(PaymentPage);
    }
  }
}
