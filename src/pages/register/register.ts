import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';

import { HomePage } from '../home/home';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  
  public registerForm: FormGroup;
  public submitAttempt: boolean = false;
  public loginError: boolean = false;
  public loginMessage;
  
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public usersService: UserServiceProvider) {

  	this.registerForm = formBuilder.group({
        firstname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],

        lastname: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],

        email: ['',Validators.required],

        birthday: ['',Validators.required],

        gender: ['',Validators.required],

        password: ['', Validators.compose([Validators.minLength(8), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],

        contact: ['', Validators.compose([Validators.minLength(11),Validators.maxLength(11), Validators.pattern('[0-9 ]*'), Validators.required])]
       
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
  	this.submitAttempt = true;
  	if(!this.registerForm.valid){
      return;
    } else {
        this.usersService.registerUser(
        this.registerForm.value.email,
        this.registerForm.value.password,
        this.registerForm.value.firstname,
        this.registerForm.value.lastname,
        this.registerForm.value.gender,
        this.registerForm.value.birthday,
        this.registerForm.value.contact).then((authData)=>{
           this.usersService.login( 
            this.registerForm.value.email,
            this.registerForm.value.password).then((logging)=>{
              this.navCtrl.setRoot(HomePage,{welcome:'member'});
            });
        }, error =>{
           this.loginError = true;
           this.loginMessage = error.message;
        })
        let loader = this.loadingCtrl.create({
            duration: 1000
        });
        loader.present();
    }
   
    
  }

}
