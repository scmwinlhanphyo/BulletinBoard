import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MustMatch } from 'src/app/validators/must-match.validator';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  public passwordForm!: FormGroup;
  password: string = "abc123";
  errorConfirm = "";
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, MustMatch]]
    },
    {
        validator: MustMatch('newPassword', 'confirmPassword')
    });
  }

  /**
   * get form controls.
   */
  get myForm() {
    return this.passwordForm.controls;
  }

  /**
   * form validation error.
   * @param controlName
   * @param errorName
   * @returns
   */
  public myError = (controlName: string, errorName: string) => {
    return this.passwordForm.controls[controlName].hasError(errorName);
  }

  /**
   * password change submit data.
   * @param formValue
   */
  onSubmit(formValue: any) {
    if (this.passwordForm.valid) {
      if (this.password !== formValue.oldPassword) {
        this.errorConfirm = "Current Password is wrong!.";
      }
     else {
        this.passwordForm.controls['oldPassword']
        this.passwordForm.controls['newPassword'];
        this.passwordForm.controls['CurrentPassword']
        this.router.navigate(["user-list", { updatepw: "success"}]);
    }
  } else {
    this.submitted = true;
  }
}

  changePasswordText() {
    if (this.passwordForm.controls['newPassword'].value !== this.passwordForm.controls['confirmPassword'].value) {
      this.passwordForm.controls['confirmPassword'].setErrors({
        misMatch: true
      })
    }
  }

}
