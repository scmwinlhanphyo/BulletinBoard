import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
    private router: Router,
    private authService: AuthService
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
      const data: any = localStorage.getItem('userLoginData') || "";
      const token: any = localStorage.getItem('token');
      const id: string = JSON.parse(data)._id;
      const payload = {
        oldPassword: this.passwordForm.controls['oldPassword'].value,
        newPassword: this.passwordForm.controls['newPassword'].value,
      }
      this.authService.passwordChange(id, payload, token).then((dist) => {
        this.authService.logout().then((dist: any) => {
          localStorage.removeItem('userId');
          localStorage.clear();
          this.authService.isLoggedIn();
          this.router.navigateByUrl('/login');
        });
      }).catch((err) => {
        this.errorConfirm = err.error.message;
      });
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
