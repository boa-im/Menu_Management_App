import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddpageComponent } from './addpage/addpage.component';
import { ModifypageComponent } from './modifypage/modifypage.component';
import { ShowpageComponent } from './showpage/showpage.component';
import { AboutpageComponent } from './aboutpage/aboutpage.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { NavComponent } from './nav/nav.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { OrderpageComponent } from './orderpage/orderpage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { CartpageComponent } from './cartpage/cartpage.component';
import { CartdetailpageComponent } from './cartdetailpage/cartdetailpage.component';
import { CartmodifypageComponent } from './cartmodifypage/cartmodifypage.component';
import { ReservationpageComponent } from './reservationpage/reservationpage.component';
import { AddreservationpageComponent } from './addreservationpage/addreservationpage.component';
import { ModifyreservationpageComponent } from './modifyreservationpage/modifyreservationpage.component';
import { ReservationloginpageComponent } from './reservationloginpage/reservationloginpage.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AddpageComponent,
    ModifypageComponent,
    ShowpageComponent,
    AboutpageComponent,
    ErrorpageComponent,
    NavComponent,
    OrderpageComponent,
    LoginpageComponent,
    CartpageComponent,
    CartdetailpageComponent,
    CartmodifypageComponent,
    ReservationpageComponent,
    AddreservationpageComponent,
    ModifyreservationpageComponent,
    ReservationloginpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
