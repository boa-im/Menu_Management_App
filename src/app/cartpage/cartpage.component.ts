import {Component, OnInit} from '@angular/core';
import {Menu} from "../../models/menu.model";
import {Course} from "../../models/course.model";
import {Order} from "../../models/order.model";
import {Option} from "../../models/option.model";
import {DatabaseService} from "../../services/database.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css']
})
export class CartpageComponent implements OnInit {
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
    this.database.select(id)
      .then((data) => {
        this.order.name = data.name;
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
    this.btnAdd_click();
    console.log(JSON.stringify(this.form.value, null, 2));
    this.router.navigate([`/cartdetail`])
  }

  btnAdd_click() {
    this.database.insertCart(this.order)
      .then((data) => {
        //alert("Record added successfully");
      })
      .catch((err) => {
        alert("Error in insert");
      });
  }
}
