import {Component, OnInit} from '@angular/core';
import {DatabaseService} from "../../services/database.service";
import {Menu} from "../../models/menu.model";
import {Course} from "../../models/course.model";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-addpage',
  templateUrl: './addpage.component.html',
  styleUrls: ['./addpage.component.css']
})

export class AddpageComponent implements OnInit {
  menu: Menu = new Menu("Sirloin Steak", "Sirloin steak comes from the rear back portion of the cow, and comes in two parts; the top sirloin and the bottom sirloin.", 35.69, 2);
  courses: Course[] = [];

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    course: new FormControl(''),
  });
  submitted = false;

  constructor(private database: DatabaseService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
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
    this.btnAdd_click();
    console.log(JSON.stringify(this.form.value, null, 2));

    this.router.navigate([`/menu`])
  }

  btnClear_click() {
    this.database.clearDB();
  }

  btnAdd_click() {
    this.database.insert(this.menu)
      .then((data) => {
        //alert("Record added successfully");
      })
      .catch((err) => {
        alert("Error in insert");
      });
  }

  btnManage_click() {
    this.router.navigate([`/menu`])
  }
}
