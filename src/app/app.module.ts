import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { Ionic2RatingModule } from 'ionic2-rating';

import { MyApp } from './app.component';
import { TopsPage } from '../pages/tops/tops';
import { BottomsPage } from '../pages/bottoms/bottoms';
import { OutwearsPage } from '../pages/outwears/outwears';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProductPage } from '../pages/product/product';
import { CartPage } from '../pages/cart/cart';
import { ShippingPage } from '../pages/shipping/shipping';
import { PaymentPage } from '../pages/payment/payment';
import { ReviewPage } from '../pages/review/review';
import { CreditPage } from '../pages/credit/credit';
import { SearchPage } from '../pages/search/search';
import { UserPage } from '../pages/user/user';
import { ConfirmPage } from '../pages/confirm/confirm';
import { OrdersPage } from '../pages/orders/orders';
import { WritePage } from '../pages/write/write';
import { DataProvider } from '../providers/data/data';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { TransactionProvider } from '../providers/transaction/transaction';




@NgModule({
  declarations: [
    MyApp,
    TopsPage,
    BottomsPage,
    OutwearsPage,
    HomePage,
    LoginPage,
    RegisterPage,
    ProductPage,
    CartPage,
    ShippingPage,
    PaymentPage,
    ReviewPage,
    CreditPage,
    SearchPage,
    UserPage,
    ConfirmPage,
    OrdersPage,
    WritePage
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      swipeBackEnabled: 'true'
    }),
    IonicStorageModule.forRoot(),
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
   MyApp,
    TopsPage,
    BottomsPage,
    OutwearsPage,
    HomePage,
    LoginPage,
    RegisterPage,
    ProductPage,
    CartPage,
    ShippingPage,
    PaymentPage,
    ReviewPage,
    CreditPage,
    SearchPage,
    UserPage,
    ConfirmPage,
    OrdersPage,
    WritePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    UserServiceProvider,
    TransactionProvider 
  ]
})
export class AppModule {}
