import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginErrMsg = "";
  public resetMail:any ="";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('resetEmail') === "success") {
        this.resetMail = "Email sent with password reset instructions."
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
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,20}')
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
    this.userService.login(payload)
    .subscribe((dist) => {
      // this.utilSvc.homePageData = [];
      // this.utilSvc.filterSetting = {};
      // this.utilSvc.allBoxDetail = {};
      // this.storageSvc.setData('user', dist);
      // this.getUserRefInterval(dist);
      // this.getCategory1CD(dist.corporationId);
      // this.loaderService.dismiss();
      // if (dist.userDivision !== CommonConstants.UserRole.admin) {
      //   this.router.navigateByUrl('/home');
      // } else {
      //   this.router.navigateByUrl('/user-management');
      // }
    }, loginError => {
      // this.loaderService.dismiss();
      // this.rescueSvc.handleErrorMessage(loginError);
      this.loginForm.patchValue({
        loginId: '',
        password: ''
      });
    });


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
