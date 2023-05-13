import { Component } from '@angular/core';
import {Menu} from "../../models/menu.model";
import {DatabaseService} from "../../services/database.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-showpage',
  templateUrl: './showpage.component.html',
  styleUrls: ['./showpage.component.css']
})
export class ShowpageComponent {
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

  btnAdd_click() {
    this.router.navigate([`/add`])
  }

  btnModify_click(item: Menu) {
    this.router.navigate([`/modify/${item.id}`])
  }

  btnDelete_click(item: Menu){
    let result = confirm("Really want to delete this menu?");
    if (result) {
      this.database.delete(item)
        .then((data)=>{
          console.log("Record deleted successfully");
          this.ngOnInit();
        })
        .catch((err)=>{
          console.log("Error in delete: " + err.message)
        })
    }
  }
}
