import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { postList } from 'src/app/constant/constant';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  postForm!: FormGroup;
  confirmView: Boolean = false;
  pageTitle: string = 'Create a new post';
  buttonName: string = 'Create';

  constructor(
    public router: Router,
    private activatedRoute:ActivatedRoute) {
      this.postForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
        description: new FormControl('', [Validators.required]),
        status: new FormControl(true)
      });
    }

  ngOnInit() {
    let paramId =this.activatedRoute.snapshot.paramMap.get("id");
    if (this.router.url.indexOf('/update-post') !== -1 && paramId !== undefined) {
      this.pageTitle = 'Update a post';
      this.buttonName = 'Update';
      const filterData = postList.filter((data: any) => data.id.toString() === paramId);
      if (filterData.length > 0) {
        this.postForm.controls['title'].setValue(filterData[0].title);
        this.postForm.controls['description'].setValue(filterData[0].description);
      }
    }
  }

  /**
   * event for error.
   * @param controlName 
   * @param errorName 
   * @returns 
   */
  public hasError = (controlName: string, errorName: string) => {
    return this.postForm.controls[controlName].hasError(errorName);
  }

  /**
   * clear button.
   */
  public onClear = () => {
    if (this.confirmView == true) {
      this.postForm.controls['title'].enable();
      this.postForm.controls['description'].enable();
      this.postForm.controls['status'].enable();
      this.confirmView = false;
    } else {
      this.postForm.reset();
    }
  }

  /**
   * create a new post
   */
  public createPost = () => {
    if (this.confirmView == true && this.buttonName == 'Create') {
      this.router.navigate(["post-list", { msg: "create success" }]);
    } else if (this.confirmView == true && this.buttonName == 'Update') {
      this.router.navigate(["post-list", { msg: "update success" }]);
    }
    if (this.postForm.valid) {
      this.postForm.controls['title'].disable();
      this.postForm.controls['description'].disable();
      this.postForm.controls['status'].disable();
      this.confirmView = true;
    }
  }
}
