import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PostDeleteDialogComponent } from 'src/app/components/post-delete-dialog/post-delete-dialog.component';
import { PostDetailDialogComponent } from 'src/app/components/post-detail-dialog/post-detail-dialog.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { postList } from 'src/app/constant/constant';
import { PostService } from 'src/app/services/post.service';
import { PostDataModel } from 'src/app/interfaces/interfaces';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit {
  public tableData = postList;
  public dataSource = new MatTableDataSource<PostDataModel>();
  public employees: any[] = [];
  public selectedEmployeeName = '';
  public showTimeFlag: any;
  public columnToDisplay = [
    'title',
    'description',
    'created_user',
    'created_at',
    'operation',
  ];
  actualPaginator?: MatPaginator;
  currentPage = 0;
  totalSize = 0;
  keyword = "";
  public message: any = "";
  postLists: any;
  public userInfo: any;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    localStorage.setItem("userInfo", JSON.stringify(new String("62bea112b226e6d6c11caf93")));
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') || "[]");

    this.getPosts();
    this.dataSource = new MatTableDataSource<PostDataModel>(this.postLists);
    this.currentPage = 0;
    this.totalSize = this.tableData.length;
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('msg') === "create success") {
        this.message = "Post successfully created."
        this.getPosts();
      } else if (params.get('msg') === "update success") {
        this.message = "Post successfully updated."
        this.getPosts();
      }
    })
  }

  /**
   * get post data.
   */
  public getPosts() {
    this.postService.getPosts().then((dist) => {
      this.postLists = dist.data;
      console.log(this.postLists)
      this.dataSource = new MatTableDataSource<any>(this.postLists);
      this.dataSource.paginator = this.paginator;
      this.currentPage = 0;
      this.totalSize = this.postLists.length;
    })
  }

  /**
   * upload post csv.
   */
  public uploadPost() {
    this.router.navigate(['/upload-csv-post']);
  }

  /**
   * search user.
   */
  public searchUser() {
    const payload = {
      title: this.keyword,
    }
    this.postService.findByName(payload).then((dist) => {
      this.postLists = dist.data;
      this.dataSource = new MatTableDataSource<any>(this.postLists);
      this.dataSource.paginator = this.paginator;
      this.currentPage = 0;
      this.totalSize = this.postLists.length;
    })
  }

  /**
   * post detail data.
   * @param data 
   */
  public postDetail(data: any) {
    console.log('data', data);
    this.dialog.open(PostDetailDialogComponent, {
      width: '40%',
      data: data
    });
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
          console.log(dist);
          this.message = "Post Delete Successfully.";
          this.getPosts();
        });
      }
    });
  }
}
