import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DatabaseService} from "../../services/database.service";

@Component({
  selector: 'app-reservationloginpage',
  templateUrl: './reservationloginpage.component.html',
  styleUrls: ['./reservationloginpage.component.css']
})
export class ReservationloginpageComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  constructor(private database: DatabaseService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.pattern('admin*')]],
        password: ['', [Validators.required, Validators.pattern('admin*')]]
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
    this.btnLogin_click();
    console.log(JSON.stringify(this.form.value, null, 2));
  }

  btnLogin_click() {
    this.database.clearReservation();
    this.router.navigate([`/reservation`]);
  }
}
