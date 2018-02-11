import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TransactionProvider } from '../../providers/transaction/transaction';
import * as firebase from 'firebase';
/**
 * Generated class for the OrdersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  
  public item =[];
  public display;
  public postSort='recent';
  public userID;
  public userTransact: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public transact: TransactionProvider,  public alertCtrl: AlertController) {
  	  this.userID = firebase.auth().currentUser.uid;
  	this.orderHistory(this.userID, 'descending');
    this.userTransact = firebase.database().ref('user-transact');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }

   orderHistory(theUserId, sort){
    this.item.length = 0;
    this.transact.viewUserTransact(theUserId).then(snapshot=>{
      let userid = snapshot.val();
      console.log(userid);
      if(userid != null && sort =='descending'){
          var keys = Object.keys(userid);
          
          for(var i = 0 ; i<keys.length; i++) {
            var k = keys[i];
            let myobj ={}; 
            myobj = userid[k].items;
            myobj['datetime'] = userid[k].dateTime;
            myobj['keys'] = k;
            this.item.push(myobj);
          }
          this.item.reverse();
      }else if (userid !=null && sort =='ascending'){
            var keyss = Object.keys(userid);
            for(var y = 0 ; y<keyss.length; y++) {
              var v = keyss[y];
              var myobjs={};
               myobjs = userid[v].items;
               myobjs['datetime'] = userid[v].dateTime;
               myobjs['keys'] = v;
               this.item.push(myobjs);
            }
      }else{
        this.display = true;
      }
      
    })
    console.log(this.item);
  }

  onSortChange(){
   if(this.postSort == 'recent'){
    this.orderHistory(this.userID, 'descending');
     this.postSort = 'recent';
     
   }else if(this.postSort == 'old'){
     this.orderHistory(this.userID, 'ascending');
     this.postSort = 'old';
      
   }
  }

  deleteItem(li){
  
   let confirm = this.alertCtrl.create({
      title: 'DELETE',
      message: "Are you sure you want to delete item?",
      buttons: [
        {
          text: 'Yes',
          handler: data => {
            let index = this.item.findIndex(x => x.keys==li.keys);
            if (index > -1) {
                let ref = this.userTransact.child(this.userID);
                ref.child(li.keys).remove();
                this.item.splice(index, 1);
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
}
