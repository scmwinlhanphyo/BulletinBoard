import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  public passwordMatch: boolean = true;

  public createAccountForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router) {
  }

  ngOnInit() {

  }

  /**
   * clear button.
   */
  public onClear = () => {

  }

  /**
   * create a new post
   */
  public createAccount () {
    this.router.navigate(['/login']);
  }

  changePassword() {
    if (!this.createAccountForm.controls.confirmPassword.value) {
      this.createAccountForm.controls.confirmPassword.setErrors(null);
    } else {
      if (this.createAccountForm.controls.password.value && this.createAccountForm.controls.confirmPassword.value && this.createAccountForm.controls.password.value === this.createAccountForm.controls.confirmPassword.value) {
        this.passwordMatch = true;
        this.createAccountForm.controls.confirmPassword.setErrors(null);
      } else {
        this.passwordMatch = false;
        this.createAccountForm.controls.confirmPassword.setErrors({
          notMatched: true
       });
      }
    }
  }
}
