import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import * as firebase from 'firebase';


/**
 * Generated class for the UserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  
  public firstname: string;
  public lastname: string;
  public email: string;
  public contact: number;
  public gender: string;
  public birthday: string;
  public genderIcon: string;
  public userID;
  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
     public usersService: UserServiceProvider) {
   
     this.userID = firebase.auth().currentUser.uid;
    this.displayUser(this.userID);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

 
  displayUser(theUserId){
    this.usersService.getuser(theUserId).then(snapshot => {
      console.log(snapshot.key);
      this.firstname = snapshot.val().firstname;
      this.lastname =  snapshot.val().lastname;
      this.email =  snapshot.val().email;
      this.contact = snapshot.val().contact;
      this.gender =  snapshot.val().gender;
      this.birthday =  snapshot.val().birthday;
    })
    if(this.gender == 'Male'){
      this.genderIcon = 'male';
    }else{
      this.genderIcon = 'female';
    }
  }
 
}
