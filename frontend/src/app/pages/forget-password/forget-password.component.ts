import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  forgetPwForm!: FormGroup;
  emailErr= "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.forgetPwForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])
    });
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('forgetPassword') === "failed") {
        this.emailErr = "Your token has expired. Please try again";
      }
    })
  }

  get forgetForm() {
    return this.forgetPwForm.controls;
  }

  public forgetPW() {
    let payload = {
      email: this.forgetPwForm.controls['email'].value
    };
    this.authService.forgetPassword(payload).then((dist: any) => {
      this.emailErr = "Email sent with password reset instructions.";
    }).catch((err: any) => {
      this.emailErr = "Email does not exist.";
    });
  }

}
