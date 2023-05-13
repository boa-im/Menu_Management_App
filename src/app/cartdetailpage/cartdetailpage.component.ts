import {Component, OnInit} from '@angular/core';
import {Order} from "../../models/order.model";
import {DatabaseService} from "../../services/database.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Option} from "../../models/option.model";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-cartdetailpage',
  templateUrl: './cartdetailpage.component.html',
  styleUrls: ['./cartdetailpage.component.css']
})
export class CartdetailpageComponent implements OnInit {
  orders: Order[] = [];

  constructor(private database: DatabaseService, private router: Router) {
  }

  ngOnInit() {
    this.database.getOrders()
      .then((data)=>{
        this.orders = data;
        console.log(this.orders);
      })
      .catch((err)=>{
        console.log("Error in select all" + err.message);
      });
  }

  btnClear_click() {
    this.database.clearCart();
  }

  btnOrder_click(order: Order) {
    this.router.navigate([`/cartmodify/${order.id}`])
  }
}
