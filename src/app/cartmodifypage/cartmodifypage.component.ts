import {Component, OnInit} from '@angular/core';
import {Order} from "../../models/order.model";
import {Option} from "../../models/option.model";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DatabaseService} from "../../services/database.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-cartmodifypage',
  templateUrl: './cartmodifypage.component.html',
  styleUrls: ['./cartmodifypage.component.css']
})
export class CartmodifypageComponent implements OnInit {
  order: Order = new Order("", 1, 1, "");
  options: Option[] = [];

  form: FormGroup = new FormGroup({
    option: new FormControl(''),
    quantity: new FormControl(''),
    instruction: new FormControl(''),
  });
  submitted = false;

  constructor(private database: DatabaseService, private ar: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    const id: any = this.ar.snapshot.paramMap.get('id');
    this.database.selectOrder(id)
      .then((data) => {
        this.order = data;
        console.log(this.order)
      })
      .catch((err) => {
        console.log("Error in select: order not found: " + err.message);
      })
    this.database.getOption()
      .then((data) => {
        this.options = data;
        console.log(this.options);
      })
      .catch((err) => {
        alert(`Error in option: ${err.message}`);
      });

    this.form = this.formBuilder.group(
      {
        option: ['', Validators.required],
        quantity: ['', [Validators.required, Validators.min(0.01)]],
        instruction: ['']
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.btnUpdate_click();
    console.log(JSON.stringify(this.form.value, null, 2));
  }

  btnUpdate_click() {
    this.database.updateOrder(this.order)
      .then((data) => {
        alert("Record updated successfully");
      })
      .catch((err) => {
        alert("Error in update");
      })
  }

  btnDelete_click(order: Order) {
    let result = confirm("Really want to delete this menu?");
    if (result) {
      this.database.deleteOrder(order)
        .then((data)=>{
          console.log("Record deleted successfully");
          this.router.navigate([`/cartdetail`])
        })
        .catch((err)=>{
          console.log("Error in delete: " + err.message)
        })
    }
  }
}
