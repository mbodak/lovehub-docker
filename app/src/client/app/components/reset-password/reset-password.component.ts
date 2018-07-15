import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecoverPassService } from '../../services/recover-pass.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPassForm: FormGroup;
  error = '';
  isValidLink = true;
  isPassChanged = false;
  token;

  constructor(private readonly fb: FormBuilder,
              private readonly route: ActivatedRoute,
              private readonly recPassService: RecoverPassService) { }

  ngOnInit() {
    this.initForm();
    this.token = this.route.snapshot.paramMap.get('token');
    this.recPassService.isTokenValid(this.token).subscribe(result => {
      if (result['error']) {
        this.error = result['error'];
        this.isValidLink = false;
      }
    }, error => {
      this.error = 'Something went wrong, try again later.';
      this.isValidLink = false;
    });
  }

  initForm(): void {
    this.resetPassForm = this.fb.group({
      password: [null, [
        Validators.required
        ]
      ],
      verify_password: [null, [
        Validators.required
        ]
      ]
    });
  }

  onSubmit(): void {
    if (!this.checkForm()) {
      return;
    }

    const newPassword = this.resetPassForm.value.password;

    this.recPassService.resetUserPassword(newPassword, this.token).subscribe(data => {
      if (data['message']) {
        this.isPassChanged = true;
      }

      if (data['error']) {
        this.error = data['error'];
      }
    }, error => {
      console.log(error);
    });
  }

  checkForm(): boolean {
    if ( this.resetPassForm.controls['password'].invalid || this.resetPassForm.controls['verify_password'].invalid) {
      this.error = 'All fields cannot be empty!';

      return false;
    }

    if (this.resetPassForm.value.password !== this.resetPassForm.value.verify_password) {
      this.error = 'Password field should be equal Verify Password field';

      return false;
    }

    return true;
  }

}
