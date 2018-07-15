import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';
import { UserProfile } from '../../models/user-profile';
import {IUserStorage} from '../../services/IUserStorage';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error = '';

  constructor(private fb: FormBuilder, private loginService: LoginService,
              @Inject('IUserStorage') private storage: IUserStorage,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.fb.group({
        email: [ null, [
            Validators.required,
            Validators.email
          ]
        ],
        password: [ null , [
            Validators.required
          ]
        ]
    });
  }

  onSubmit(): void {

    if (!this.checkForm()) {
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    console.log(this.loginForm.value);

    this.authService.sign(email, password).subscribe((response) => {
      if(response.isLoggedIn) {
        // const url: string = this.authService.getRedirectUrl(),
          const redirectUrl = `/profile/${this.authService.getLoggedInUser().userId}`;
        this.onRedirect(redirectUrl);
      }
    });
  }

  private checkForm(): boolean {

    if (this.loginForm.controls['email'].invalid) {
      this.error = 'That is not a valid email';

      return false;
    }

    if (this.loginForm.controls['password'].invalid) {
      this.error = 'The password field can not be empty ';

      return false;
    }

    return true;
  }

  public onRegisterRedirect() {
    this.router.navigateByUrl('/register');
  }

  public onRedirect(redirectUrl: string) {
    this.router.navigateByUrl(redirectUrl);
  }
}
