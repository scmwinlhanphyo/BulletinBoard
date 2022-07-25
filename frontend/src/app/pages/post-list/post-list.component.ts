import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { postList } from 'src/app/constant/constant';
import { PostService } from 'src/app/services/post.service';
import { PostDataModel } from 'src/app/interfaces/interfaces';
import { Subject } from 'rxjs';
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
  public userInfo: any;

  dataSubject : Subject<any> = new Subject();

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
    this.postService.getPosts(this.currentPage, this.pageSize).then((dist) => {
      this.postLists = dist.data;
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
    this.currentPage = e.pageIndex;
    console.log(this.currentPage)
    this.postService.getPosts(this.pageSize, this.currentPage).then((dist) => {
      this.postLists = dist.data;
      this.dataSource = new MatTableDataSource<any>(this.postLists);
      this.dataSource.paginator = this.paginator;
      this.totalSize = this.postLists.length;
    })
  }
}
