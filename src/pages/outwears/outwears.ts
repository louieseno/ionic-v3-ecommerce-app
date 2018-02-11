import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DataProvider } from '../../providers/data/data';
/**
 * Generated class for the OutwearsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

import { ProductPage } from '../product/product';
import { CartPage } from '../cart/cart';

@IonicPage()
@Component({
  selector: 'page-outwears',
  templateUrl: 'outwears.html',
})
export class OutwearsPage {
  
  public cat: string = "men"; // default button
  public style: string = "hoodies"; // default button
  public outM: Array<{image: string, title: string, price:number, type: string, description: Array<string> }>;
  public outW: Array<{image: string, title: string, price:number, type: string, description: Array<string> }>;
  public pushCart: any;
  public cartItem;
  public badge;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,public dataService: DataProvider){

    this.pushCart = CartPage;

  	this.outM=this.dataService.getItems('outmale');
    this.outW=this.dataService.getItems('outfemale');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OutwearsPage');
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
      cat: 'outwears'
    });
  }

  filterItemsOfType(type, item){
   if(item == 'outM'){
    return this.outM.filter(x => x.type == type);
   } else if(item == 'outW'){
    return this.outW.filter(x => x.type == type);
   }  
  }

}
