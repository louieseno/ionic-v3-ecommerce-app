import { Component } from '@angular/core';
import { NavController, MenuController, ToastController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DataProvider } from '../../providers/data/data';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import * as firebase from 'firebase';

import { TopsPage } from '../tops/tops';
import { BottomsPage } from '../bottoms/bottoms';
import { OutwearsPage } from '../outwears/outwears';
import { ProductPage } from '../product/product';
import { CartPage } from '../cart/cart';
import { SearchPage } from '../search/search';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  public tabs: Array<{title: string, component: any}>;
  public bestSeller: Array<{image: string, title: string, price: number, description: Array<string> }>;
  public newProduct: Array<{image: string, title: string, price: number, description: Array<string> }>;
  public badge;
  public cartItem;
  public homeCat: string = "bestsells"; // default button  
  public pushCart: any;
  public member;
  public searchTerm: string = '';
  public items: any;
  public searching: boolean = false;

  constructor( 
    public navCtrl: NavController,
    public storage: Storage,
    public dataService: DataProvider,
    public toastCtrl: ToastController,
    public usersService: UserServiceProvider,
    public menu: MenuController,
    public navParams: NavParams) {
    if(this.navParams.get('welcome') == 'member'){
      this.member = true;
    }

    if(this.member){
      let userID = firebase.auth().currentUser.uid;
         this.displayUser(userID);
    }

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.menu.enable(true, 'menu1');
        this.menu.enable(false, 'menu2');
        unsubscribe();
        
      } else {  
         this.menu.enable(true, 'menu2');
         this.menu.enable(false, 'menu1');
        unsubscribe();
      }
    });

    this.pushCart = CartPage;
    
    this.bestSeller = this.dataService.getItems('best');

    this.newProduct = this.dataService.getItems('new');

     this.tabs = [
        {title:'Tops', component:TopsPage},
        {title:'Bottoms', component:BottomsPage},
        {title:'Outwears', component:OutwearsPage}
    ];
  }

  
  ionViewDidLoad() {
    this.searching = false;
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
  
  displayUser(theUserId){
    this.usersService.getuser(theUserId).then(snapshot => {
      console.log(snapshot.key);
      let firstname= snapshot.val().firstname;
      let lastname=snapshot.val().lastname;
      
      let fullname = this.ucwords(firstname) + " "+this.ucwords(lastname);
       this.showToast(fullname);
    })
  }

  ucwords(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  showToast(name: string) {
    let toast = this.toastCtrl.create({
      message: 'Welcome' + " " + name + "!",
      duration: 2000,
      position: 'top',
      cssClass: "toastCss",
    });

    toast.present(toast);
  }

  onSearchInput(){
    
    if(this.searchTerm.length>0){
       this.items = this.dataService.filterItems(this.searchTerm);
       this.searching = true;
       
    }else{
      this.searching = false;
    }
  }


  openPage(par) {
    this.navCtrl.push(par.component);
  }
  
  productPage(par) {
    this.navCtrl.push(ProductPage,{
      title: par.title,
      price: par.price,
      image: par.image,
      description: par.description,
      cat: 'tops'
    });
  }

  

  select(item){
    this.searchTerm = item.title;
    this.searching = false;
    this.navCtrl.push(SearchPage,{searchItem:item});
  }
  
}
