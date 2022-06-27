import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  profileEditForm!: FormGroup;
  confirmView : Boolean =false;
  passwordMatching: any= {};
  profileImage:any;
  Imageloaded:boolean = false;
  
  private profileData = {
      name: "Admin001",
      type: "admin",
      email: "admin@gmail.com",
      dob: "2022/06/22",
      phone :"09123456789",
      address : 'Yangon',
      image: 'https://www.freeiconspng.com/thumbs/profile-icon-png/account-profile-user-icon--icon-search-engine-10.png'
  };

  public name! : string;
  public email! : string;
  public type! :string;
  public dob! :FormControl;
  public address! :string;
  public phone! :string;
  public profile! :FormControl;
  
  constructor(
    private location: Location,
    private router: Router,
    private fb: FormBuilder,
    private changeDetector:ChangeDetectorRef
  ) {
      this.name = this.profileData.name;
      this.email = this.profileData.email;
      this.phone = this.profileData.phone;
      this.address = this.profileData.address;
      this.type = this.profileData.type;
      this.dob =  new FormControl(new Date("2022/06/22"));
      this.profileImage = this.profileData.image;
      this.profile = new FormControl(this.profileImage);
  }

  ngOnInit(): void {
    this.profileEditForm = this.fb.group({
      name: ['', Validators.required],
      email:['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      type: ['', [Validators.required]],
      address: ['', [Validators.required]],
      profile: ['', this.profileImage.length==0? [Validators.required]:''],
      dob: [''],
      phone: [''],
    }
    );
  }

  get myForm() {
    return this.profileEditForm.controls;
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.profileEditForm.controls[controlName].hasError(errorName);
  }
  public onClear = () => {
    if(this.confirmView==true) {
    this.profileEditForm.controls['name'].enable();
    this.profileEditForm.controls['email'].enable();
    this.profileEditForm.controls['type'].enable();
    this.profileEditForm.controls['address'].enable();
    this.profileEditForm.controls['profile'].enable();
    this.profileEditForm.controls['dob'].enable();
    this.profileEditForm.controls['phone'].enable();
    this.confirmView = false;
    }else{
        this.profileEditForm.reset();
    }
    //this.location.back();
  }
  public updateProfile = () => {
    if(this.confirmView==true) {
        this.router.navigate(["user-list", { msg: "success"}]);
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

  imageUpload(event:any)
  {
    var file = event.target.files.length;
    for(let i=0;i<file;i++)
    {
       var reader = new FileReader();
       reader.onload = (event:any) =>
       {
           this.profileImage = event.target.result;
           this.changeDetector.detectChanges();
       }
       reader.readAsDataURL(event.target.files[i]);
    }
  }
  handleImageLoad()
  {
    this.Imageloaded = true;
  }

}