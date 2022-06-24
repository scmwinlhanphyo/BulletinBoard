import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginErrMsg = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,20}')
      ]),
      rememberme: ['']
    })
  }

  get myLoginForm() {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.value.email === "admin@gmail.com" && this.loginForm.value.password === "Admin@123") {
      sessionStorage.setItem("Userinfo", "Admin");
      this.router.navigate(["/post-list"]);
    } else if (this.loginForm.value.email !== "admin@gmail.com" && this.loginForm.value.password !== "Admin@123") {
      this.loginErrMsg = "Incorrect Email & Password!"
    } else if (this.loginForm.value.email !== "admin@gmail.com") {
      this.loginErrMsg = "Email does not Exists.";
    } else if (this.loginForm.value.password !== "Admin@123") {
      this.loginErrMsg = "Incorrect Password!";
    }
  }
}
