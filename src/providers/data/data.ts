import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DataProvider {
  
  public items: any;

  constructor(public http: Http) {
    console.log('Hello DataProvider Provider');

    this.items = [
            { image:'assets/img/new-product/product1.png', 
		      title:"Cool Long Sleeve", 
		      price:300.00, 
		      description:["Relaxed Fit","Fashionable","Comfortable","60% Cotton 40% Polyester"],
		      cat: 'tops',
		      gender: 'new'
		    },
			{ image:'assets/img/best-seller/product1.png', 
	          title:"Cool Jacket", 
	          price:300.00, 
	          description:["Relaxed Fit","Fashionable","Comfortable","60% Cotton 40% Polyester"],
	          cat: 'tops',
	          gender: 'best'
	        },
	        { image:'assets/img/best-seller/product1.png', 
	          title:"Cool Jacket", 
	          price:300.00, 
	          description:["Relaxed Fit","Fashionable","Comfortable","60% Cotton 40% Polyester"],
	          cat: 'tops',
	          gender: 'best'
	        },
	        { image:'assets/img/best-seller/product1.png', 
	          title:"Cool Jacket", 
	          price:300.00, 
	          description:["Relaxed Fit","Fashionable","Comfortable","60% Cotton 40% Polyester"],
	          cat: 'tops',
	          gender: 'best'
	        },
	        { image:'assets/img/best-seller/product1.png', 
	          title:"Cool Jacket", 
	          price:300.00, 
	          description:["Relaxed Fit","Fashionable","Comfortable","60% Cotton 40% Polyester"],
	          cat: 'tops',
	          gender: 'best'
	        },
	        { image:'assets/img/best-seller/product1.png', 
	          title:"Cool Jacket", 
	          price:300.00, 
	          description:["Relaxed Fit","Fashionable","Comfortable","60% Cotton 40% Polyester"],
	          cat: 'tops',
	          gender: 'best'
	        },
	        { image:'assets/img/best-seller/product1.png', 
	          title:"Cool Jacket", 
	          price:300.00, 
	          description:["Relaxed Fit","Fashionable","Comfortable","60% Cotton 40% Polyester"],
	          cat: 'tops',
	          gender: 'best'
	        },
	        { image:'assets/img/categories/tops/bluePM.jpg', 
	          title:'Polo Shirt', 
	          price: 900.00, 
	          type: 'polo',
	          description:["Relaxed Fit","Fashionable","Comfortable","60% Cotton 40% Polyester"],
	          cat: 'tops',
	          gender: 'topmale'
	        },
	        { image:'assets/img/categories/tops/blackTM.jpg', 
	          title:'Black Shirt', 
	          price: 900.00, 
	          type: 'shirt',
	          description:["Relaxed Fit","Fashionable","Comfortable","60% Cotton 40% Polyester"],
	          cat: 'tops',
	          gender: 'topmale'
	        },
	        { image:'assets/img/categories/tops/merinoSM.jpg', 
	          title:'Merino Sweater', 
	          price: 900.00, 
	          type: 'sweater',
	          description:["Relaxed Fit","Fashionable","Comfortable","60% Cotton 40% Polyester"],
	          cat: 'tops',
	          gender: 'topmale'
	        },
	        { image:'assets/img/categories/tops/redPW.jpg', 
	          title:'Polo Shirt', 
	          price: 900.00, 
	          type: 'polo',
	          description:["Relaxed Fit","Fashionable","Comfortable","60% Cotton 40% Polyester"],
	          cat: 'tops',
	          gender: 'topfemale'
	        },
	        { image:'assets/img/categories/tops/reflectiveTW.jpg', 
	          title:'Dry Reflective', 
	          price: 900.00,
	           type: 'shirt', 
	          description:["Relaxed Fit","Fashionable","Comfortable","60% Cotton 40% Polyester"],
	          cat: 'tops',
	          gender: 'topfemale'
	        },
	        { image:'assets/img/categories/tops/lightCW.jpg', 
	          title:'Light Cardeigan', 
	          price: 900.00, 
	          type: 'sweater',
	          description:["Relaxed Fit","Fashionable","Comfortable","60% Cotton 40% Polyester"],
	          cat: 'tops',
	          gender: 'topfemale'
	        },
	        { image:'assets/img/categories/outwears/greenHM.jpg', 
	          title:'Green Fullzip', 
	          price: 900.00,
	          type: 'hoodies', 
	          description:["Relaxed Fit","Fashionable","Comfortable","60% Cotton 40% Polyester"],
	          cat: 'outwears',
	          gender: 'outmale'
	        },
	        { image:'assets/img/categories/outwears/corduroyJM.jpg', 
	          title:'Corduroy Jacket', 
	          price: 900.00,
	          type: 'jackets',  
	          description:["Relaxed Fit","Fashionable","Comfortable","60% Cotton 40% Polyester"],
	          cat: 'outwears',
	          gender: 'outmale'
	        },
	        { image:'assets/img/categories/outwears/darkHW.jpg', 
	          title:' Dark Blue Fullzip', 
	          price: 900.00,
	          type: 'hoodies', 
	          description:["Relaxed Fit","Fashionable","Comfortable","60% Cotton 40% Polyester"],
	          cat: 'outwears',
	          gender: 'outfemale'
	        },
	        { image:'assets/img/categories/outwears/blousonJW.jpg', 
	          title:'Blouson Jacket', 
	          price: 900.00,
	          type: 'jackets',  
	          description:["Relaxed Fit","Fashionable","Comfortable","60% Cotton 40% Polyester"],
	          cat: 'outwears',
	          gender: 'outfemale'
	        },
	        { image:'assets/img/categories/bottoms/slimfitJM.jpg', 
	          title:'Slim Fit Jeans', 
	          price: 900.00, 
	          type: 'jeans',
	          description:["Relaxed Fit","Fashionable","Comfortable","60% Cotton 40% Polyester"],
	          cat: 'bottoms',
	          gender: 'botmale'
	        },
	        { image:'assets/img/categories/bottoms/chinoSM.jpg', 
	          title:'Chino Shorts', 
	          price: 900.00, 
	          type: 'shorts',
	          description:["Relaxed Fit","Fashionable","Comfortable","60% Cotton 40% Polyester"],
	          cat: 'bottoms',
	          gender: 'botmale'
	        },
	        { image:'assets/img/categories/bottoms/joggerPM.jpg', 
	          title:'Jogger Pants', 
	          price: 900.00, 
	          type: 'pants',
	          description:["Relaxed Fit","Fashionable","Comfortable","60% Cotton 40% Polyester"],
	          cat: 'bottoms',
	          gender: 'botmale'
	        },
	        { image:'assets/img/categories/bottoms/taperedJW.jpg', 
	          title:'Light Tapered Jeans', 
	          price: 900.00, 
	          type: 'jeans',
	          description:["Relaxed Fit","Fashionable","Comfortable","60% Cotton 40% Polyester"],
	          cat: 'bottoms',
	          gender: 'botfemale'
	        },
	        { image:'assets/img/categories/bottoms/drapeSW.jpg', 
	          title:'Drape Skirt', 
	          price: 900.00, 
	          type: 'shorts',
	          description:["Relaxed Fit","Fashionable","Comfortable","60% Cotton 40% Polyester"],
	          cat: 'bottoms',
	          gender: 'botfemale'
	        },
	        { image:'assets/img/categories/bottoms/smartPW.jpg', 
	          title:'Smart Pants', 
	          price: 900.00, 
	          type: 'pants',
	          description:["Relaxed Fit","Fashionable","Comfortable","60% Cotton 40% Polyester"],
	          cat: 'bottoms',
	          gender: 'botfemale'
	        }

    ]
  }

    filterItems(searchTerm){
        return this.items.filter((item) => {
            return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });     
 
    }

    getItems(gender){
        return this.items.filter((item) => {
            return item.gender.toLowerCase().indexOf(gender.toLowerCase()) > -1;
        });     
 
    }
}
