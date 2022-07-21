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
    this.postService.getPosts().then((dist) => {
      this.postLists = dist.data;
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
}
