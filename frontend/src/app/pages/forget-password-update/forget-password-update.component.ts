import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forget-password-update',
  templateUrl: './forget-password-update.component.html',
  styleUrls: ['./forget-password-update.component.scss']
})
export class ForgetPasswordUpdateComponent implements OnInit {
  forgetPasswordUpdateForm!: FormGroup;
  public passwordMatch: boolean = true;
  public errorMsg: string = '';
  public userId: string = '';
  public token: string = '';


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params['userId'];
    this.token = this.activatedRoute.snapshot.params['token'];

    this.authService.resetPassword(this.userId, this.token).then((data: any) => {
      this.forgetPasswordUpdateForm = new FormGroup({
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
      });
    }).catch((err: any) => {
      this.router.navigate(['/forget-password', {forgetPassword: "failed"}]);
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
      this.errorMsg = "Password and Password confirmation are not matched";
    } else {
      const payload = {
        password: this.forgetPasswordUpdateForm.controls['password'].value
      }
      this.authService.resetPasswordUpdate(this.userId, this.token, payload)
      this.router.navigate(['/login', {resetEmail: 'success'}]);
    }
  }
}

