import { Component } from '@angular/core';
import {Reservation} from "../../models/reservation.model";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DatabaseService} from "../../services/database.service";
import {Router} from "@angular/router";
import {Time} from "../../models/time.model";

@Component({
  selector: 'app-addreservationpage',
  templateUrl: './addreservationpage.component.html',
  styleUrls: ['./addreservationpage.component.css']
})
export class AddreservationpageComponent {
  reservation: Reservation = new Reservation("", "", 2, new Date(), 6);
  times: Time[] = [];

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    nop: new FormControl(''),
    date: new FormControl(''),
    time: new FormControl(''),
  });
  submitted = false;

  constructor(private database: DatabaseService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.database.getTime()
      .then((data) => {
        this.times = data;
        console.log(this.times);
      })
      .catch((err) => {
        alert(`Error in course: ${err.message}`);
      });

    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        nop: ['', [Validators.required, Validators.min(1)]],
        date: ['', Validators.required],
        time: ['']
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
    this.Save();
    console.log(JSON.stringify(this.form.value, null, 2));
    this.router.navigate([`/reservation`])
  }

  Save() {
    this.database.insertReservation(this.reservation)
      .then((data) => {
      })
      .catch((err) => {
        alert("Error in insert");
      });
    this.database.getId(this.reservation)
      .then((data) => {
        alert(`Please Note! Your order number is ${data.id}`)
      })
      .catch((err) => {
        alert("Error in getId");
      });
  }

}
