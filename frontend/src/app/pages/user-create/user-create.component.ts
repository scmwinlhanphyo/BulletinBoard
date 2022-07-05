import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/validators/must-match.validator';
import { ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  userCreateForm!: FormGroup;
  confirmView: Boolean = false;
  passwordMatching: any = {};
  profileImage: any;
  Imageloaded: boolean = false;
  typeOption = [
    { enum: 'Admin' },
    { enum: 'User' }
  ];
  pickDate: any;
  today = new Date();
  public userInfo: any;
  submitted: boolean = false;
  imgFile: any;

  constructor(
    private location: Location,
    private router: Router,
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    localStorage.setItem("userInfo", JSON.stringify(new String("62bea112b226e6d6c11caf93")));
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') || "[]");

    console.log(this.userInfo);
    this.userCreateForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required]],
      confirmPwd: ['', [Validators.required]],
      type: ['', [Validators.required]],
      address: ['', [Validators.required]],
      profile: ['', [Validators.required]],
      dob: [''],
      phone: [''],
    },
      {
        validator: MustMatch('password', 'confirmPwd')
      }
    );
  }

  get myForm() {
    return this.userCreateForm.controls;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.userCreateForm.controls[controlName].hasError(errorName);
  }
  public onClear = () => {
    if (this.confirmView == true) {
      this.userCreateForm.controls['name'].enable();
      this.userCreateForm.controls['email'].enable();
      this.userCreateForm.controls['password'].enable();
      this.userCreateForm.controls['confirmPwd'].enable();
      this.userCreateForm.controls['type'].enable();
      this.userCreateForm.controls['address'].enable();
      this.userCreateForm.controls['profile'].enable();
      this.userCreateForm.controls['dob'].enable();
      this.userCreateForm.controls['phone'].enable();
      this.confirmView = false;
    } else {
      this.userCreateForm.reset();
    }
    //this.location.back();
  }
  public createUser = () => {
    if (this.confirmView == true) {
      const formData = new FormData();
      formData.append('name', this.userCreateForm.controls['name'].value);
      formData.append('email', this.userCreateForm.controls['email'].value);
      formData.append('password', this.userCreateForm.controls['password'].value);
      formData.append('type', this.userCreateForm.controls['type'].value);
      formData.append('phone', this.userCreateForm.controls['phone'].value);
      formData.append('dob', this.userCreateForm.controls['dob'].value);
      formData.append('address', this.userCreateForm.controls['address'].value);
      formData.append('profile', this.imgFile);
      formData.append('created_user_id', this.userInfo);

      this.userService.createUser(formData).then((dist) => {
        console.log(dist);
      })
      this.router.navigate(["user-list", { msg: "success" }]);
    }
    if (this.userCreateForm.valid) {
      this.userCreateForm.controls['name'].disable();
      this.userCreateForm.controls['email'].disable();
      this.userCreateForm.controls['password'].disable();
      this.userCreateForm.controls['confirmPwd'].disable();
      this.userCreateForm.controls['address'].disable();
      this.userCreateForm.controls['profile'].disable();
      this.userCreateForm.controls['type'].disable();
      this.userCreateForm.controls['dob'].disable();
      this.userCreateForm.controls['phone'].disable();
      this.confirmView = true;
    }
  }

  imageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      this.imgFile = file;
      const reader = new FileReader();
      reader.onload = e => this.profileImage = reader.result;
      reader.readAsDataURL(file);
    }
  }
  // handleImageLoad() {
  //   this.Imageloaded = true;
  // }

  OnDateChange(event: any) {
    this.pickDate = event;
    console.log(this.pickDate);
  }
  // public onDate(event: any): void {
  //   this.roomsFilter.date = event;
  //   this.getData(this.roomsFilter.date);
  //   console.log(this.getData(this.roomsFilter.date));
  // }

}
