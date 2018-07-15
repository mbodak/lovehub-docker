import { Component, OnInit, NgModule, Pipe} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UsersProfileService } from '../../services/users-profile.service';
import { User } from '../../models/user';
import { UserProfile } from '../../models/user-profile';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  myform: FormGroup;
  name: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  user: User;
  userProfile: UserProfile;

  constructor(private userService: UsersService, private usersProfileService: UsersProfileService) {}

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.userProfile = new UserProfile();
    this.user = new User();
  }

  createFormControls() {
    this.name = new FormControl('', Validators.required);
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
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    }, this.passwordMatchValidator);
  }

  onSubmit() {
    if (this.myform.valid) {
      console.log('Form Submitted!');
      this.user.name = this.name.value;
      this.user.email = this.email.value;
      this.user.password = this.password.value;
      this.userService.registration(this.user as User).subscribe( user => {
        this.userProfile.firstName = user.name;
        this.userProfile.lastName = '';
        this.userProfile.sex = 'UNDEFINED';
        this.userProfile.orientation = 'UNDEFINED';
        this.userProfile.preference = 'UNDEFINED';
        this.userProfile.userId = user.id;
        this.usersProfileService.registration(this.userProfile as UserProfile).subscribe();
      });
      alert('Congratulation! You are registered!');
      this.myform.reset();
    }
  }
}
