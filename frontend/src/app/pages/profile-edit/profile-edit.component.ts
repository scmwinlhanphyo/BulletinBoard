import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  profileEditForm!: FormGroup;
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

  userData: any;
  imgFile: any;
  public userID: any;

  constructor(
    private location: Location,
    private router: Router,
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
  ) {
    const id: string = activatedRoute.snapshot.params['id'];

    this.profileEditForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      type: ['', [Validators.required]],
      address: ['', [Validators.required]],
      profile: ['', this.profileImage?.length == 0 ? [Validators.required] : ''],
      dob: [''],
      phone: [''],
    }
    );

    const payload = {};
    this.userService.findUser(payload, id).then((dist) => {
      this.userData = dist.data;
      console.log(dist.data);
      if (this.userData) {
        this.profileEditForm.controls['name'].setValue(this.userData.name);
        this.profileEditForm.controls['email'].setValue(this.userData.email);
        this.profileEditForm.controls['phone'].setValue(this.userData.phone);
        this.profileEditForm.controls['address'].setValue(this.userData.address);
        this.profileEditForm.controls['type'].setValue(this.userData.type);
        this.profileEditForm.controls['dob'].setValue(this.userData.dob);
        this.profileImage = 'http://localhost:5000/' + this.userData.profile;
        this.profileEditForm.controls['profile'].setValue(this.profileImage);
      }
    })
  }

  ngOnInit(): void {
    const id: string = this.activatedRoute.snapshot.params['id'];
    const payload = {};
    this.userService.findUser(payload, id).then((dist) => {
      this.userData = dist.data;
      console.log(dist.data);
    });

    const data: any = localStorage.getItem('userLoginData') || "";
    this.userID = data._id;
  }

  /**
   * form controls.
   */
  get myForm() {
    return this.profileEditForm.controls;
  }

  /**
   * form validation error.
   * @param controlName 
   * @param errorName 
   * @returns 
   */
  public hasError = (controlName: string, errorName: string) => {
    return this.profileEditForm.controls[controlName].hasError(errorName);
  }

  /**
   * on clear form.
   */
  public onClear = () => {
    if (this.confirmView == true) {
      this.profileEditForm.controls['name'].enable();
      this.profileEditForm.controls['email'].enable();
      this.profileEditForm.controls['type'].enable();
      this.profileEditForm.controls['address'].enable();
      this.profileEditForm.controls['profile'].enable();
      this.profileEditForm.controls['dob'].enable();
      this.profileEditForm.controls['phone'].enable();
      this.confirmView = false;
    } else {
      this.profileEditForm.reset();
    }
  }

  /**
   * update profile.
   */
  public updateProfile = () => {
    // let paramId =this.activatedRoute.snapshot.paramMap.get("id");

    const id: string = this.activatedRoute.snapshot.params['id'];
    if (this.confirmView == true) {

      const formData = new FormData();
      formData.append('name', this.profileEditForm.controls['name'].value);
      formData.append('email', this.profileEditForm.controls['email'].value);
      formData.append('type', this.profileEditForm.controls['type'].value);
      formData.append('phone', this.profileEditForm.controls['phone'].value);
      formData.append('dob', this.profileEditForm.controls['dob'].value);
      formData.append('address', this.profileEditForm.controls['address'].value);
      this.imgFile ? formData.append('profile', this.imgFile) : "";
      formData.append('updated_user_id', this.userID);

      this.userService.updateUser(formData, id).then((dist) => {
        console.log(dist);
        this.location.back();
      })
    }
    if (this.profileEditForm.valid) {
      this.profileEditForm.controls['name'].disable();
      this.profileEditForm.controls['email'].disable();
      this.profileEditForm.controls['address'].disable();
      this.profileEditForm.controls['profile'].disable();
      this.profileEditForm.controls['type'].disable();
      this.profileEditForm.controls['dob'].disable();
      this.profileEditForm.controls['phone'].disable();
      this.confirmView = true;
    }
  }

  /**
   * user profile upload data.
   * @param event 
   */
  imageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      this.imgFile = file;
      const reader = new FileReader();
      reader.onload = e => this.profileImage = reader.result;
      reader.readAsDataURL(file);

    }
  }

  /**
   * on date change.
   * @param event 
   */
  OnDateChange(event: any) {
    this.pickDate = event;
    console.log(this.pickDate);
  }
}
