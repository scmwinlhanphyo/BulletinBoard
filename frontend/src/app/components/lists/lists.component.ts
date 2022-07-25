import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { PostDeleteDialogComponent } from 'src/app/components/post-delete-dialog/post-delete-dialog.component';
import { PostDetailDialogComponent } from 'src/app/components/post-detail-dialog/post-detail-dialog.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { UserDetailDialogComponent } from 'src/app/components/user-detail-dialog/user-detail-dialog.component';
import { UserDeleteDialogComponent } from 'src/app/components/user-delete-dialog/user-delete-dialog.component';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  @Input() sub! : Subject<any>;

  dataSource: any;
  public columnToDisplayPost = [
    'title',
    'description',
    'created_user',
    'created_at',
    'operation',
  ];
  public columnToDisplayUser = [
    'name',
    'email',
    'created_user',
    'type',
    'phone',
    'dob',
    'address',
    'created_at',
    'updated_at',
    'operation',
  ];
  public userInfo: any;

  constructor(
    private dialog: MatDialog,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private userService: UserService
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    const userLoginData: any = localStorage.getItem('userLoginData') || "";
    const data = JSON.parse(userLoginData);
    this.userInfo = data._id;

    this.sub.subscribe((response :any) => this.dataSource = response);
    // console.log(this.dataSource)
  }

  /**
   * post detail data.
   * @param data
   */
   public postDetail(data: any) {
    this.dialog.open(PostDetailDialogComponent, {
      width: '40%',
      data: data
    });
  }

  /**
   * open user detail dialog.
   * @param data
   */
   public userDetail(data: any) {
    this.dialog.open(UserDetailDialogComponent, {
      width: '40%',
      data: data,
    });
  }


  /**
   * update user form.
   * @param userId
   */
   updateUser(userId: any) {
    const userID = userId._id;
    this.router.navigate(['profile-edit/' + userID]);
  }


  /**
   * delete post.
   * @param data
   */
   public deletePost(data: any) {
    const postId = data._id;
    let dialogRef = this.dialog.open(PostDeleteDialogComponent, {
      width: '40%',
      data: data
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.postService.deletePost(postId).then((dist) => {
          this.router.navigate(["post-list", { msg: "delete success" }]);
        });
      }
    });
  }

  /**
   * delete user data.
   * @param data
   */
   public deleteUser(data: any) {
    const userId = data._id;
    let dialogRef = this.dialog.open(UserDeleteDialogComponent, {
      width: '40%',
      data: data,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.userService.deleteUser(userId).then((dist) => {
          this.router.navigate(["user-list", { msg: "delete success" }]);
        })
      }
    });
  }
}
function doSomething(): void {
  throw new Error('Function not implemented.');
}

