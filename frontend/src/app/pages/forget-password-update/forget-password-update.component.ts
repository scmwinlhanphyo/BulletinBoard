import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forget-password-update',
  templateUrl: './forget-password-update.component.html',
  styleUrls: ['./forget-password-update.component.scss']
})
export class ForgetPasswordUpdateComponent implements OnInit {
  forgetPasswordUpdateForm!: FormGroup;
  public passwordMatch: boolean = true;
  public errorMsg: string = '';


  constructor(
    private router: Router) {
  }

  ngOnInit() {
    this.forgetPasswordUpdateForm = new FormGroup({
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  /**
   * event for error.
   * @param controlName 
   * @param errorName 
   * @returns 
   */
  public hasError = (controlName: string, errorName: string) => {
    return this.forgetPasswordUpdateForm.controls[controlName].hasError(errorName);
  }

  /**
   * clear button.
   */
  public onClear = () => {

  }

  /**
   * reset Password.
   */
  public resetPassword() {
    if (this.forgetPasswordUpdateForm.controls['password'].value && this.forgetPasswordUpdateForm.controls['confirmPassword'].value &&
      this.forgetPasswordUpdateForm.controls['password'].value !== this.forgetPasswordUpdateForm.controls['confirmPassword'].value) {
      this.errorMsg = "Passwor and Password confirmation are not matched";
    } else {
      this.router.navigate(['/login']);
    }
  }
}

