import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TransactionProvider } from '../../providers/transaction/transaction';


/**
 * Generated class for the ProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
import { CartPage } from '../cart/cart';
import { WritePage } from '../write/write';

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  
  public list = [];
  public postSort='recent';
  public stars = "all";
  public badge;
  public cartItem;
  public category;
  public getImage;
  public getTitle;
  public getPrice;
  public getDesc;
  public getSize;
  public getId;
  public pushCart;
  public sizeErr: boolean = false;
  public keyname;
  
  public singleItem: {image: string, title: string, price: number, description: Array<string>, size: string, quantity: number };

  constructor(
   public navCtrl: NavController, 
   public navParams: NavParams, 
   public storage: Storage, 
   public toastCtrl: ToastController,
   public modalCtrl: ModalController,
   public transact: TransactionProvider
   ) {
    
    this.pushCart = CartPage; 
    
    this.getImage = navParams.get("image");
  	this.getTitle = navParams.get("title");
  	this.getPrice = navParams.get("price");
    this.getDesc = navParams.get("description");
    this.category = navParams.get("cat");
    
    
    this.getReviews(this.getTitle,'descending');
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
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }
  

   addCart() {
   //PICK SIZE
    if(this.getSize == undefined ){
      this.sizeErr = true;
    }else{
       this.sizeErr = false;
       this.singleItem ={ 
        image: this.getImage,
        title: this.getTitle,
        price: this.getPrice,
        description: this.getDesc,
        size: this.getSize,
        quantity: 1
        }

        this.keyname = this.getTitle + this.getSize;
    
      this.storage.length().then(result =>{
        if(result == 0  ){
          this.cartItem++;
          this.badge = true;
          this.storage.set(this.keyname,this.singleItem);
          this.storage.set("cartId", {id: this.cartItem});   
        } else if (result > 0) {
           this.storage.get(this.keyname).then(val => {
              if(val == null){
                this.cartItem++;
                this.badge = true;
                this.storage.set(this.keyname,this.singleItem);
                this.storage.set("cartId", {id: this.cartItem}); 
              }else{
                this.showToast('middle');
              }
            })
        }
      })
    }
  }

  showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: 'Item Already Added!',
      duration: 2000,
      position: position,
      cssClass: "toastCss"
    });

    toast.present(toast);
  }

  review(){
    let openGestureModal = this.modalCtrl.create(WritePage,{
     productItem: this.getTitle,
     productPrice: this.getPrice
    });
    openGestureModal.onDidDismiss(data => {
      if(this.postSort == 'recent'){
        this.getReviews(data.title,'descending');
       
       }else if(this.postSort == 'old'){
         this.getReviews(data.title, 'ascending');
    
       }
      
    });
    openGestureModal.present();
  }

  

  getReviews(itemId, sort){
    
     if(this.stars != 'all') {
     this.list.length = 0;
       this.transact.review(itemId).then(snapshot=>{
        let userid = snapshot.val();
            if(userid != null && sort == 'descending'){
            var keys = Object.keys(userid);
            for(var i = 0 ; i<keys.length; i++) {
              var k = keys[i];
              var myobj={}; 
              if(this.stars == userid[k].productRate){
                myobj = userid[k].reviewDetails;
                myobj['datetime'] = userid[k].dateTime;
                myobj['rate'] = userid[k].productRate;
                this.list.push(myobj);
              }
             
            }
            this.list.reverse();
            console.log(this.list);
        }else if (userid !=null && sort =='ascending'){
            var keyss = Object.keys(userid);
            for(var y = 0 ; y<keyss.length; y++) {
              var v = keyss[y];
              var myobjs={};
               if(this.stars == userid[v].productRate){
                 myobjs = userid[v].reviewDetails;
                 myobjs['datetime'] = userid[v].dateTime;
                 myobjs['rate'] = userid[v].productRate;
                 this.list.push(myobjs);
               }
            }
        }else{
         console.log("Aw");
        }
        })
     }else if (this.stars == 'all'){
       this.list.length = 0;
       this.transact.review(itemId).then(snapshot=>{
        let userid = snapshot.val();
            if(userid != null && sort == 'descending'){
            var keys = Object.keys(userid);
            for(var i = 0 ; i<keys.length; i++) {
              var k = keys[i];
              var myobj={};        
              myobj = userid[k].reviewDetails;
              myobj['datetime'] = userid[k].dateTime;
              myobj['rate'] = userid[k].productRate;
              this.list.push(myobj);
             
            }
            this.list.reverse();
            
        }else if (userid !=null && sort =='ascending'){
            var keyss = Object.keys(userid);
            for(var y = 0 ; y<keyss.length; y++) {
              var v = keyss[y];
              var myobjs={};
               myobjs = userid[v].reviewDetails;
               myobjs['datetime'] = userid[v].dateTime;
               myobjs['rate'] = userid[v].productRate;
               this.list.push(myobjs);
            }
        }else{
         console.log("Aw");
        }
        })
     }

  }

  

  onSortChange(){
   if(this.postSort == 'recent'){
    this.getReviews(this.getTitle, 'descending');
     this.postSort = 'recent';
     
   }else if(this.postSort == 'old'){
     this.getReviews(this.getTitle, 'ascending');
     this.postSort = 'old';
      
   }
  }

  onFilterChange(selected: any){
   if(this.postSort == 'recent'){
    this.getReviews(this.getTitle, 'descending');
    this.stars = selected;
   }else if (this.postSort == 'old'){
    this.getReviews(this.getTitle, 'ascending');
    this.stars = selected;
   }
  
  }
  

}
