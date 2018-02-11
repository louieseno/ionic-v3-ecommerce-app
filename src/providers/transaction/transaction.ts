import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
/*
  Generated class for the TransactionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TransactionProvider {
  
  public fireRef: any;
  public transactNode: any;
  public userTransact: any;
  public itemReview: any;
  constructor(public http: Http) {
    console.log('Hello TransactionProvider Provider');
    this.transactNode = firebase.database().ref('transact');
    this.userTransact = firebase.database().ref('user-transact');
    this.itemReview = firebase.database().ref('product-review');
    this.fireRef = firebase.database().ref();
  }
  
  //CERTAIN TRANSACTION
  viewTransact(transactId){
  	let userRef = this.transactNode.child(transactId);
  	return userRef.once('value');
  }
  //VIEW ALL POST BY A CERTAIN USER

  viewUserTransact(transactId){
  	let userRef = this.userTransact.child(transactId);
  	return userRef.once('value');
  }

   review(item){
    let itemRef = this.itemReview.child(item);
    return itemRef.once("value");
  }

  listTransact(){
  	return this.transactNode.once('value');
  }

  memberTransact(userId, items,shipment,orderDetails){
    	 
        //GET A KEY FOR A NEW POST
        let newPostKey = this.transactNode.push().key;
        let d = new Date();
        let e = this.formatDate(d);
        //TRANSACT ENTRY
        let postData = {
          uid: userId,
          items: items,
          shipment: shipment,
          details: orderDetails,
          postKey: newPostKey,
          dateTime: e
        };

        // WRITE THE NEW TRANSACT DATA SIMULTANEOUSLY IN THE TRANSACT LIST  AND USER TRANSACTION

        let updatePath = {};
        updatePath['/transact/' + newPostKey] = postData;
        updatePath['/user-transact/' + userId + "/" + newPostKey] = postData;

        //UPDATE BOTH TABLES SIMULTANEOUSLY
        return this.fireRef.update(updatePath);
	
  }

  nonmemberTransact(items,shipment,orderDetails){
    //GET A KEY FOR A NEW POST
      let newPostKey = this.transactNode.push().key;
      let d = new Date();
      let e = this.formatDate(d);
    //TRANSACT ENTRY
    let postData = {
      items: items,
      shipment: shipment,
      details: orderDetails,
      postKey: newPostKey,
      dateTime: e
    }
    

    let updatePath = {};
    updatePath['/transact/' + newPostKey] = postData;

    //UPDATE  TABLE
      return this.fireRef.update(updatePath);
  }

  productReview(title,data,star){

    //GET A KEY FOR A NEW POST
    let newPostKey = this.itemReview.push().key;
    let d = new Date();
    let e = this.formatDate(d);

    let review={
     productRate: star,
     reviewDetails: data,
     dateTime: e
    }

  

    let updatePath = {};
    updatePath['/product-review/' + title + "/" + newPostKey] = review;

    //UPDATE  TABLE
      return this.fireRef.update(updatePath);

  } 
  star(val){
   return val;
  }

  formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
  }

   delOrder(item){
    return this.userTransact.child(item).remove();
     
  }

  

}
