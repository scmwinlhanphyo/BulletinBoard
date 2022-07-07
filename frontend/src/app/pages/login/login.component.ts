import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginErrMsg = "";
  public resetMail: any = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('resetEmail') === "success") {
        this.resetMail = "Password has been reset";
      }
    })
    this.loginForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      rememberme: ['']
    })
  }

  get myLoginForm() {
    return this.loginForm.controls;
  }

  login() {
    const payload = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    }
    this.authService.login(payload).then((dist) => {
      console.log(dist);
      localStorage.setItem('token', dist.token);
      localStorage.setItem('userId', dist.user._id);
      this.router.navigate(["/post-list"]);
    }).catch((err) => {
      this.loginErrMsg = err;
    });
  }
}
