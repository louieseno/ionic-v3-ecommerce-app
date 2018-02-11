import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import * as firebase from 'firebase';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
import { HomePage } from '../home/home';
import { ShippingPage } from '../shipping/shipping';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
   public loginForm: FormGroup;
   public submitAttempt: boolean = false;
   public loginError: boolean = false;
   public loginMessage;
   public shipping;
   public fireAuth: any;
   
  constructor(
   public navCtrl: NavController,
   public navParams: NavParams,
   public formBuilder: FormBuilder,
   public loadingCtrl: LoadingController,
   public usersService: UserServiceProvider) {
    this.fireAuth = firebase.auth();
    this.loginForm = formBuilder.group({
        email: ['',Validators.required],
        password: ['', Validators.compose([Validators.minLength(8), 
        Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],    
    });
    if(this.navParams.get('member') == 'memberLogin'){
      this.shipping = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  loginUser(){
  	this.submitAttempt = true;
  	if(!this.loginForm.valid){
      return;
    } else {
        this.usersService.login(this.loginForm.value.email,this.loginForm.value.password).then(authData=>{
          if(this.shipping){
            this.navCtrl.push(ShippingPage);
            
          }else{
            this.navCtrl.setRoot(HomePage,{welcome:'member'});
          }
         
        }, error =>{
          this.loginError = true;
          this.loginMessage = error.message;
        });
    }
    /*let loader = this.loadingCtrl.create({
      duration: 1000
    });
    loader.present();*/
  }

  
  
}
