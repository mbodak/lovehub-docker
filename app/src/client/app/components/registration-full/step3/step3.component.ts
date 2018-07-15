import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['../registration-full.component.scss']
})
export class Step3Component implements OnInit {

  @Output() formEvent = new EventEmitter<object>();
  constructor() {
  }

  myform: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  age: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.age = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*')
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.confirmPassword = new FormControl('', [
      Validators.required,
    ]);
  }
  passwordMatchValidator(fg: FormGroup) {
    return fg.get('password').value === fg.get('confirmPassword').value ? null : { 'mismatch': true };
  }

  createForm() {
    this.myform = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      age: this.age,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    }, this.passwordMatchValidator);
  }

  onSubmit() {
    if (this.myform.valid) {
      console.log('Form sent!');
      console.log(this.myform);
      const user = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        age: this.age.value,
        email: this.email.value,
        password: this.password.value
      };
      this.formEvent.emit(user);
      this.myform.reset();
    }
  }
}
