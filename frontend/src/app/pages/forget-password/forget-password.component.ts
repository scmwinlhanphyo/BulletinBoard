import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  forgetPwForm!: FormGroup;
  forgetEmail: string = "admin@gmail.com";
  emailErr= "";

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.forgetPwForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])
    })
  }

  get forgetForm() {
    return this.forgetPwForm.controls;
  }

  public forgetPW() {
    if (this.forgetEmail === this.forgetPwForm.value.email) {
      this.router.navigate(["login", { resetEmail: "success"}]);
    } else {
      this.emailErr = "Email does not Exists.";
    }
  }

}
