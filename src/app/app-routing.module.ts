import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {AddpageComponent} from "./addpage/addpage.component";
import {ModifypageComponent} from "./modifypage/modifypage.component";
import {AboutpageComponent} from "./aboutpage/aboutpage.component";
import {ErrorpageComponent} from "./errorpage/errorpage.component";
import {ShowpageComponent} from "./showpage/showpage.component";
import {LoginpageComponent} from "./loginpage/loginpage.component";
import {OrderpageComponent} from "./orderpage/orderpage.component";
import {CartpageComponent} from "./cartpage/cartpage.component";
import {CartdetailpageComponent} from "./cartdetailpage/cartdetailpage.component";
import {CartmodifypageComponent} from "./cartmodifypage/cartmodifypage.component";
import {ReservationpageComponent} from "./reservationpage/reservationpage.component";
import {AddreservationpageComponent} from "./addreservationpage/addreservationpage.component";
import {ModifyreservationpageComponent} from "./modifyreservationpage/modifyreservationpage.component";
import {ReservationloginpageComponent} from "./reservationloginpage/reservationloginpage.component";

const routes: Routes = [
  {path: "home", component: HomepageComponent},
  {path: "add", component: AddpageComponent},
  {path: "menu", component: ShowpageComponent},
  {path: "order", component: OrderpageComponent},
  {path: "login", component: LoginpageComponent},
  {path: "reservation", component: ReservationpageComponent},
  {path: "addreservation", component: AddreservationpageComponent},
  {path: "modifyreservation/:id", component: ModifyreservationpageComponent},
  {path: "cartdetail", component: CartdetailpageComponent},
  {path: "cart/:id", component: CartpageComponent},
  {path: "reservationlogin", component: ReservationloginpageComponent},
  {path: "cartmodify/:id", component: CartmodifypageComponent},
  {path: "modify/:id", component: ModifypageComponent},
  {path: "about", component: AboutpageComponent},
  {path: "", redirectTo: '/home', pathMatch:'full'},
  {path: "**", component: ErrorpageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
