import { Component } from '@angular/core';
import {Reservation} from "../../models/reservation.model";
import {Time} from "../../models/time.model";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DatabaseService} from "../../services/database.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-modifyreservationpage',
  templateUrl: './modifyreservationpage.component.html',
  styleUrls: ['./modifyreservationpage.component.css']
})
export class ModifyreservationpageComponent {
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

  constructor(private database: DatabaseService, private formBuilder: FormBuilder, private ar: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const id: any = this.ar.snapshot.paramMap.get('id');
    this.database.selectReservation(id)
      .then((data) => {
        this.reservation = data;
        console.log(this.reservation)
      })
      .catch((err) => {
        console.log("Error in select: order not found: " + err.message);
      })
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
    this.Update();
    console.log(JSON.stringify(this.form.value, null, 2));
  }

  Update() {
    this.database.updateReservation(this.reservation)
      .then((data) => {
        alert(`Your order with id, ${this.reservation.id}, has been updated`);
      })
      .catch((err) => {
        alert("Error in update");
      });
  }

  btnCancel_click() {
    let result = confirm("Really want to cancel this reservation?");
    if (result) {
      this.database.deleteReservation(this.reservation)
        .then((data)=>{
          console.log("Record deleted successfully");
          this.ngOnInit();
        })
        .catch((err)=>{
          console.log("Error in delete: " + err.message)
        })
      this.router.navigate([`/reservation`]);
    }
  }
}
