import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from './user';

@Component({
  selector: 'app-login',
  template: `
    <form (ngSubmit)="login()" [formGroup]="form">
      <label>Email</label>
      <input type="email" formControlName="email" />
      <label>Password</label>
      <input type="password" formControlName="password" />
      <button type="submit">Login</button>
    </form>
  `,
})
export class LoginComponent {
  @Output() loggedIn = new EventEmitter<User>();
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    4;
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login() {
    console.log(`Login ${this.form?.value}`);
    if (this.form?.valid) {
      this.loggedIn.emit(
        new User(this.form.value.email, this.form.value.password)
      );
    }
  }
}
