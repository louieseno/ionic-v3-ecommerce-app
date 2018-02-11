import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserServiceProvider } from '../providers/user-service/user-service';
import * as firebase from 'firebase';

import { TopsPage } from '../pages/tops/tops';
import { BottomsPage } from '../pages/bottoms/bottoms';
import { OutwearsPage } from '../pages/outwears/outwears';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { UserPage } from '../pages/user/user';
import { OrdersPage } from '../pages/orders/orders';




@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  
   @ViewChild(Nav) nav: Nav;

  rootPage:any= HomePage ;
  
  public pages: Array<{title: string, component: any, icon: string}>;
  public userPages: Array<{title: string, component: any, icon: string}>;
  public activePage: any;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    menu: MenuController,
    public usersService: UserServiceProvider

  ) {
  
    
    // used for an example of ngFor and navigation
        this.pages = [
          { title: 'Home', component: HomePage, icon:"home" },
          { title: 'Tops', component: TopsPage, icon:"arrow-forward" },
          { title: 'Bottoms', component: BottomsPage, icon:"arrow-forward" },
          { title: 'Outwears', component: OutwearsPage, icon:"arrow-forward" },
          { title: 'Login', component: LoginPage, icon:"log-in" },
          { title: 'Register', component: RegisterPage, icon:"person-add" }

     ];
     this.userPages = [
          { title: 'Home', component: HomePage, icon:"home" },
          { title: 'Tops', component: TopsPage, icon:"arrow-forward" },
          { title: 'Bottoms', component: BottomsPage, icon:"arrow-forward" },
          { title: 'Outwears', component: OutwearsPage, icon:"arrow-forward" },
          { title: 'Orders', component: OrdersPage, icon:"cube" },
          { title: 'My Account', component: UserPage, icon:"person" },
     ];
    
    
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        menu.enable(true, 'menu1');
        menu.enable(false, 'menu2');
        unsubscribe();
        
      } else {  
         menu.enable(true, 'menu2');
         menu.enable(false, 'menu1');
        unsubscribe();
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  
   
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
       this.nav.push(page.component);
       this.activePage = page;
  }

  checkActive(page){
    return page == this.activePage;
  }

  logout(){
    this.usersService.logout();
    this.nav.setRoot(HomePage);
  }
}

