import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TransactionProvider } from '../../providers/transaction/transaction';
/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
import { CartPage } from '../cart/cart';
import { WritePage } from '../write/write';
@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  

  public list;
  public postSort='recent';
  public stars = "all";
  public review =[];
  public badge;
  public cartItem = 0;
  public pushCart;
  public getSize;
  public sizeErr: boolean = false;
  public keyname;
  public singleItem: {image: string, title: string, price: number, description: Array<string>, size: string, quantity: number };
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,  public toastCtrl: ToastController,public transact: TransactionProvider, public modalCtrl: ModalController) {

   this.list = navParams.get("searchItem");

    this.pushCart = CartPage;

    this.getReviews(this.list.title,'descending'); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

   ionViewWillEnter(){
   this.storage.length().then(result =>{
      if(result == 0  ){
        this.badge = false;
      }else{
        this.storage.get('cartId').then((val)=>{  
           this.badge = true;
           this.cartItem = val.id;   
        }) 
      }
    })
  }

   addCart() {
   //PICK SIZE
    if(this.getSize == undefined ){
      this.sizeErr = true;
    }else{
       this.sizeErr = false;
       this.singleItem ={ 
        image: this.list.image,
        title: this.list.title,
        price: this.list.price,
        description: this.list.description,
        size: this.getSize,
        quantity: 1
        }

        this.keyname = this.list.title + this.getSize;
    
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
      position: position
    });

    toast.present(toast);
  }

  reviewThis(){
    let openGestureModal = this.modalCtrl.create(WritePage,{
     productItem: this.list.title,
     productPrice: this.list.price
    });
    openGestureModal.onDidDismiss(data => {
     
      this.review.length = 0;
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
     this.review.length = 0;
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
                this.review.push(myobj);
              }
             
            }
            this.review.reverse();
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
                 this.review.push(myobjs);
               }
            }
        }else{
         console.log("Aw");
        }
        })
     }else if (this.stars == 'all'){
       this.review.length = 0;
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
              this.review.push(myobj);
             
            }
            this.review.reverse();
            
        }else if (userid !=null && sort =='ascending'){
            var keyss = Object.keys(userid);
            for(var y = 0 ; y<keyss.length; y++) {
              var v = keyss[y];
              var myobjs={};
               myobjs = userid[v].reviewDetails;
               myobjs['datetime'] = userid[v].dateTime;
               myobjs['rate'] = userid[v].productRate;
               this.review.push(myobjs);
            }
        }else{
         console.log("Aw");
        }
        })
     }

  }

  

  onSortChange(){
   if(this.postSort == 'recent'){
    this.getReviews(this.list.title, 'descending');
     this.postSort = 'recent';
     
   }else if(this.postSort == 'old'){
     this.getReviews(this.list.title, 'ascending');
     this.postSort = 'old';
      
   }
  }

  onFilterChange(selected: any){
   if(this.postSort == 'recent'){
    this.getReviews(this.list.title, 'descending');
    this.stars = selected;
   }else if (this.postSort == 'old'){
    this.getReviews(this.list.title, 'ascending');
    this.stars = selected;
   }

  }
}