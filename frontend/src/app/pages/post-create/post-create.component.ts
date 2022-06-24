
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  postCreateForm!: FormGroup;
  confirmView : Boolean =false;
 // public postCreateFormValue!:any;

  constructor(private location: Location,private router: Router) { }
  ngOnInit() {
    this.postCreateForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      description: new FormControl('', [Validators.required])
    });
    sessionStorage.setItem("message", "");
  }
  
  public hasError = (controlName: string, errorName: string) =>{
    return this.postCreateForm.controls[controlName].hasError(errorName);
  }
  public onClear = () => {
    if(this.confirmView==true) {
    this.postCreateForm.controls['title'].enable();
    this.postCreateForm.controls['description'].enable();
    this.confirmView = false;
    }else{
        this.postCreateForm.reset();
    }
    //this.location.back();
  }
  public createPost = () => {
    if(this.confirmView==true) {
        sessionStorage.setItem("message", "Post successfully created.");
        this.router.navigate(["post-list"]);
    }
    if (this.postCreateForm.valid) {
        this.postCreateForm.controls['title'].disable();
        this.postCreateForm.controls['description'].disable();
        this.confirmView = true;
    }
  }
}