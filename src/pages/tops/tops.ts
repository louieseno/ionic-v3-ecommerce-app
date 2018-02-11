import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DataProvider } from '../../providers/data/data';
/**
 * Generated class for the TopsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

import { ProductPage } from '../product/product';
import { CartPage } from '../cart/cart';

@IonicPage()
@Component({
  selector: 'page-tops',
  templateUrl: 'tops.html',
})
export class TopsPage {
  
	public cat: string = "men"; // default button
  public style: string = "polo"; // default button
  public topM: Array<{image: string, title: string, price:number, type: string, description: Array<string> }>;
  public topW: Array<{image: string, title: string, price:number, type: string, description: Array<string> }>;
  public pushCart: any;
  public cartItem;
  public badge;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,public dataService: DataProvider){

    this.pushCart = CartPage;

    this.topM=this.dataService.getItems('topmale');
    this.topW=this.dataService.getItems('topfemale');
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TopsPage');
  }

   ionViewWillEnter(){
     this.cartItem = 0;
     this.storage.length().then(result =>{
      if(result == 0  ){
        this.badge = false;
      }else{
        this.storage.forEach((value:any, key:string) => {
        this.storage.get(key).then((val)=>{
            if(key == 'cartId'){
              this.badge = true;
               this.cartItem = val.id;
            }else {
              return;
            }
        }) 
      })
      }
    })
  }

  productPage(par) {
    this.navCtrl.push(ProductPage,{
      title: par.title,
      price: par.price,
      image: par.image,
      description: par.description,
      cat:'tops'
    });
  }
  
  filterItemsOfType(type, item){
   if(item == 'topM'){
    return this.topM.filter(x => x.type == type);
   } else if(item == 'topW'){
    return this.topW.filter(x => x.type == type);
   }  
  }


}
