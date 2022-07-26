import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

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
  public userInfo: any;
  postData: any;
  data: any;
  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private postService: PostService
    ) {
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

      this.data = this.activatedRoute.snapshot.data['post'];
      const id: string = this.activatedRoute.snapshot.params['id'];
      if (this.data) {
          this.postForm.controls['title'].setValue(this.data.data.title);
          this.postForm.controls['description'].setValue(this.data.data.description);
          this.postForm.controls['status'].setValue(this.data.data.status)
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
      const data: any = localStorage.getItem('userLoginData') || "";
      this.userInfo = JSON.parse(data)._id;
      const payload = {
        title: this.postForm.controls['title'].value,
        description: this.postForm.controls['description'].value,
        created_user_id: this.userInfo
      }
      this.postService.createPost(payload).then((dist) => {
        this.router.navigate(["post-list", { msg: "create success" }]);
      });
    }
    else if (this.confirmView == true && this.buttonName == 'Update') {
      const data: any = localStorage.getItem('userLoginData') || "";
      this.userInfo = JSON.parse(data)._id;

      const id: string = this.activatedRoute.snapshot.params['id'];
      const payload = {
        title: this.postForm.controls['title'].value,
        description: this.postForm.controls['description'].value,
        status: this.postForm.controls['status'].value,
        updated_user_id: this.userInfo
      }
      this.postService.updatePost(payload, id).then((dist) => {
        this.router.navigate(["post-list", { msg: "update success" }]);
      })
    }
    if (this.postForm.valid) {
      this.postForm.controls['title'].disable();
      this.postForm.controls['description'].disable();
      this.postForm.controls['status'].disable();
      this.confirmView = true;
    }
  }
}
