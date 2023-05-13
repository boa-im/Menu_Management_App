import { Component } from '@angular/core';
import {Menu} from "../../models/menu.model";
import {DatabaseService} from "../../services/database.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-orderpage',
  templateUrl: './orderpage.component.html',
  styleUrls: ['./orderpage.component.css']
})
export class OrderpageComponent {
  menus: Menu[] = [];

  constructor(private database: DatabaseService, private router: Router) {
  }

  ngOnInit() {
    this.database.selectAll()
      .then((data)=>{
        this.menus = data;
        console.log(this.menus);
      })
      .catch((err)=>{
        console.log("Error in select all" + err.message);
      });
  }

  btnCart_click(item: Menu) {
    this.router.navigate([`/cart/${item.id}`])
  }
}
