import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
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
  actualPaginator?: MatPaginator;
  currentPage = 0;
  totalSize = 0;
  pageSize = 5;
  pageOptions = [5, 10, 15];
  keyword = "";
  public message: any = "";
  postLists: any;
  postData: any = [];
  postArr: any = [];
  public userInfo: any;
  public dataSubject: any = null;
  public exporter: any = null;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
  ) {
    this.dataSubject = this.postService.dataSubject;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    const userLoginData: any = localStorage.getItem('userLoginData') || "";
    const data = JSON.parse(userLoginData);
    this.userInfo = data._id;
    this.getPosts();

    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('msg') === "create success") {
        this.message = "Post successfully created."
        this.getPosts();
      } else if (params.get('msg') === "update success") {
        this.message = "Post successfully updated."
        this.getPosts();
      } else if (params.get('msg') === "delete success") {
        this.message = "Post deleted successfully."
        this.getPosts();
      }
    })

  }

  /**
   * get post data.
   */
  public getPosts() {
    this.postService.getPosts(this.currentPage, this.pageSize).then((dist) => {
      this.postLists = dist.data;
      this.postLists.map((result: any) => {
        let res = {
          Title: result.title,
          Description: result.description,
          Posted_User: result.created_user_id ? result.created_user_id["name"]: result.updated_user_id["name"],
          Posted_Date: new Date(result.createdAt).toLocaleString()
        }
        this.postArr.push(res);
      })
      this.postData = this.postArr;
      this.dataSource = new MatTableDataSource<any>(this.postLists);
      this.dataSubject.next(this.dataSource);
      this.dataSource.paginator = this.paginator;
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
    this.postService.findByName(this.currentPage, this.pageSize, payload).then((dist) => {
      this.postLists = dist.data;
      this.dataSource = new MatTableDataSource<any>(this.postLists);
      this.dataSubject.next(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.totalSize = this.postLists.length;
    })
  }

  /**
   * when pagination buttons click.
   * @param (e)
   */
   public handlePage(e: any) {
    this.pageSize = e.pageOptions;
    // console.log(this.pageSize)
    // this.pageSize = e.pageSize;
    const pageIndex = e.pageIndex
    this.postService.getPosts(this.pageSize, pageIndex).then((dist) => {
      this.postLists = dist.data;
      this.dataSource = new MatTableDataSource<any>(this.postLists);
      this.dataSource.paginator = this.paginator;
      this.totalSize = this.postLists.length;
    })
  }
}
