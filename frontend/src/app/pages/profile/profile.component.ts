import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Router,ActivatedRoute  } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileEditForm!: FormGroup;
  confirmView : Boolean =false;
  passwordMatching: any= {};
  profileImage:any;
  Imageloaded:boolean = false;
  
  private profileData = {
      name: "Admin001",
      type: "admin",
      email: "admin@gmail.com",
      dob: "2022/06/23",
      phone :"09123456789",
      address : 'Yangon',
      image: 'https://www.freeiconspng.com/thumbs/profile-icon-png/account-profile-user-icon--icon-search-engine-10.png'
  };

  cards = [
    {title: 'Title 1', content: 'Content 1'},
    {title: 'Title 2', content: 'Content 2'},
    {title: 'Title 3', content: 'Content 3'},
    {title: 'Title 4', content: 'Content 4'}
  ];

  public name! : string;
  public email! : string;
  public type! :string;
  public dob! :string;
  public address! :string;
  public phone! :string;
  public profile! :FormControl;
  public currentId! :number;
  
  constructor(
    private location: Location,
    private router: Router,
    private activeroute: ActivatedRoute,
    private fb: FormBuilder,
    private changeDetector:ChangeDetectorRef
  ) {
      this.name = this.profileData.name;
      this.email = this.profileData.email;
      this.phone = this.profileData.phone;
      this.address = this.profileData.address;
      this.type = this.profileData.type;
      this.dob =  this.profileData.dob.split("/")[1]+"/"+this.profileData.dob.split("/")[2]+"/"+this.profileData.dob.split("/")[0];
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
    });
    this.activeroute.params.subscribe((params) => this.currentId = params['id']);
  }

  get myForm() {
    return this.profileEditForm.controls;
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.profileEditForm.controls[controlName].hasError(errorName);
  }
  public editProfile = () => {
    this.router.navigate(["profile-edit", this.currentId]);
  }
  public updateProfile = () => {
    if(this.confirmView==true) {
        this.router.navigate(["user-list", { editprofile: "success"}]);
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