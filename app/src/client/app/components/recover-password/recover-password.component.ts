import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecoverPassService } from '../../services/recover-pass.service';


@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  recoverPassForm: FormGroup;
  error = '';
  isMailSend = false;

  constructor(private fb: FormBuilder,
              private readonly recoverPassService: RecoverPassService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.recoverPassForm = this.fb.group({
      email: [null, [
        Validators.email,
        Validators.required
        ]
      ]
    });
  }

  onSubmit(): void {
    if ( !this.checkForm()) {
      return;
    }

    const email = this.recoverPassForm.value.email;

    this.recoverPassService.recoverUserPassword(email).subscribe(result => {
      if (result['error']) {
        this.error = result['error'];
        this.recoverPassForm.reset();
      }

      if (result['message']) {
        this.isMailSend = true;
      }
    }, error => {
      console.log(error);
      this.error = 'Something went wrong, try again later.';
    });
  }

  private checkForm(): boolean {
    if (this.recoverPassForm.controls['email'].invalid) {
      this.error = 'That is not a valid email';

      return false;
    }

    return true;
  }

}
