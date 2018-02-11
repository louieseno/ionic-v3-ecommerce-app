import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionProvider } from '../../providers/transaction/transaction';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import * as firebase from 'firebase';
/**
 * Generated class for the WritePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-write',
  templateUrl: 'write.html',
})
export class WritePage {
	
	public writtenForm: FormGroup;
	public submitAttempt: boolean = false;
	public item;
	public price;
  public star;
  public fullnameBind;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public viewCtrl: ViewController, public formBuilder: FormBuilder, public transact: TransactionProvider, public usersService: UserServiceProvider) {
  	this.item = this.navParams.get("productItem");
  	this.price = this.navParams.get("productPrice");
  	this.writtenForm = formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        retitle: ['', Validators.compose([Validators.maxLength(20), Validators.required])],  
        redesc:['', Validators.compose([Validators.maxLength(50), Validators.required])]  
    });

     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let userID = firebase.auth().currentUser.uid;
        this.usersService.getuser(userID).then(snapshot => {
        this.fullnameBind = snapshot.val().firstname + " " + snapshot.val().lastname;
      })
        unsubscribe();
      } 
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WritePage');

  }

  closeModal() {
    this.viewCtrl.dismiss({title:this.item});
  }

  writeRev(){
  	this.submitAttempt = true;
  	if(!this.writtenForm.valid){
     return;
    }else{
      this.transact.productReview(this.item,this.writtenForm.value,this.star);
      this.viewCtrl.dismiss({title:this.item});
    }
  }
  onModelChange(value){
   
   this.star = value; 
  
  }
}
