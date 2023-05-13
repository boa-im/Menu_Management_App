import { Component } from '@angular/core';
import {Reservation} from "../../models/reservation.model";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DatabaseService} from "../../services/database.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reservationpage',
  templateUrl: './reservationpage.component.html',
  styleUrls: ['./reservationpage.component.css']
})
export class ReservationpageComponent {
  reservation: Reservation = new Reservation("", "", 2, new Date(), 6);
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
  });
  submitted = false;

  constructor(private database: DatabaseService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        id: ['', Validators.required]
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
    this.database.selectReservation(this.reservation.id)
      .then((data) => {
        this.reservation = data;
        console.log(this.reservation);
        this.router.navigate([`/modifyreservation/${this.reservation.id}`])
      })
      .catch((err) => {
        alert(`We can't find the reservation with ${this.reservation.id}`);
      });
    console.log(JSON.stringify(this.form.value, null, 2));
  }
}
