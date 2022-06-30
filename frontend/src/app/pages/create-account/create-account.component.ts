import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
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
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit() {

  }

  /**
   * clear button.
   */
  public onClear = () => {
    this.createAccountForm.reset();
  }

  /**
   * create a new post
   */
  public createAccount() {
    const payload = {
      name: this.createAccountForm.controls['username'].value,
      email: this.createAccountForm.controls['email'].value,
      password: this.createAccountForm.controls['password'].value
    }
    this.userService.createUser(payload).then((dist) => {
      console.log(dist);
    })
    this.router.navigate(['/login']);
  }

  changePassword() {
    if (this.createAccountForm.controls['password'].value !== this.createAccountForm.controls['confirmPassword'].value) {
      ''
      this.createAccountForm.controls['confirmPassword'].setErrors({
        notMatched: true
      })
    }
  }
}
