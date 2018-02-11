import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DataProvider } from '../../providers/data/data';
/**
 * Generated class for the BottomsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

import { ProductPage } from '../product/product';
import { CartPage } from '../cart/cart';

@IonicPage()
@Component({
  selector: 'page-bottoms',
  templateUrl: 'bottoms.html',
})
export class BottomsPage {
  
  public cat: string = "men"; // default button
  public style: string = "jeans"; // default button
  public botM: Array<{image: string, title: string, price:number, type: string, description: Array<string> }>;
  public botW: Array<{image: string, title: string, price:number, type: string, description: Array<string> }>;
  public pushCart: any;
  public cartItem;
  public badge;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,public dataService: DataProvider) {

    this.pushCart = CartPage;
    this.botM = this.dataService.getItems('botmale');
  	
    this.botW= this.dataService.getItems('botfemale');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BottomsPage');
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
      cat: 'bottoms'
    });
  }

  filterItemsOfType(type, item){
   if(item == 'botM'){
    return this.botM.filter(x => x.type == type);
   } else if(item == 'botW'){
    return this.botW.filter(x => x.type == type);
   }  
  }

}
