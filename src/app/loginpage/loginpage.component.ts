import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
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
    this.router.navigate([`/menu`])
  }
}
