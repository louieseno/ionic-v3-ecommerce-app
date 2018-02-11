 import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
	
	public fireAuth: any;
	public userProfile: any;
    public firstname: string;
    public lastname: string;
    public email: string;

	constructor(public http: Http) {
	 // Initialize Firebase
    var config = {
      apiKey: "AIzaSyA7_-bCt_ixsmqtuIFFYfWuBbw-jCFO11s",
      authDomain: "apparadoor.firebaseapp.com",
      databaseURL: "https://apparadoor.firebaseio.com",
      projectId: "apparadoor",
      storageBucket: "apparadoor.appspot.com",
      messagingSenderId: "409386408933"
    };
  firebase.initializeApp(config);
	    console.log('Hello UserServiceProvider Provider');
	    this.fireAuth = firebase.auth();
	    this.userProfile = firebase.database().ref('users');
	}

	registerUser(
	email: string, password: string, 
	firstname: string, lastname: string, 
	gender: string, birthday: string, contact: number){
		return this.fireAuth.createUserWithEmailAndPassword(email, password).then((newUser) => {
				this.userProfile.child(newUser.uid).set({
					email:email,
					firstname:firstname,
					lastname: lastname,
					gender: gender,
					birthday: birthday,
					contact: contact,
				});
		});

	}
    
    login(email: string, password: string){
        return this.fireAuth.signInWithEmailAndPassword(email, password);
    }

	logout(){
		return this.fireAuth.signOut();
	}
    
    getuser(userid: any){
    	let userRef = this.userProfile.child(userid);
    	return userRef.once('value');
    }

    resetPassword(email: string) {
	  return this.fireAuth.sendPasswordResetEmail(email);
	}
    

}
