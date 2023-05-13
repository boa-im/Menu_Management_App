import { Component, OnInit } from '@angular/core';
import {Menu} from "../../models/menu.model";
import {DatabaseService} from "../../services/database.service";
import {ActivatedRoute} from "@angular/router";
import {Course} from "../../models/course.model";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-modifypage',
  templateUrl: './modifypage.component.html',
  styleUrls: ['./modifypage.component.css']
})
export class ModifypageComponent implements OnInit {
  menu: Menu = new Menu("", "", 35.12, 2);
  courses: Course[] = [];

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    course: new FormControl(''),
  });
  submitted = false;

  constructor(private database: DatabaseService, private ar: ActivatedRoute, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    const id: any = this.ar.snapshot.paramMap.get('id');
    this.database.select(id)
      .then((data) => {
        this.menu = data;
        console.log(this.menu);
      })
      .catch((err) => {
        console.log("Error in select: order not found: " + err.message);
      })
    this.database.getCourse()
      .then((data) => {
        this.courses = data;
        console.log(this.courses);
      })
      .catch((err) => {
        alert(`Error in course: ${err.message}`);
      });

    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', [Validators.required, Validators.min(0.01)]],
        course: ['', Validators.required]
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
    this.btnSave_click();
    console.log(JSON.stringify(this.form.value, null, 2));
  }

  btnSave_click() {
    this.database.update(this.menu)
      .then((data) => {
        alert("Record updated successfully");
      })
      .catch((err) => {
        alert("Error in update");
      })
  }
}
