import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PostDeleteDialogComponent } from 'src/app/components/post-delete-dialog/post-delete-dialog.component';
import { PostDetailDialogComponent } from 'src/app/components/post-detail-dialog/post-detail-dialog.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { postList } from 'src/app/constant/constant';

export interface PostDataModel {
  title: string,
  description: string,
  created_user: string,
  created_at: string
}

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
  pageSizes = [2, 4, 8];
  actualPaginator?: MatPaginator;
  currentPage = 0;
  totalSize = 0;
  keyword = "";
  public message:any ="";

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<PostDataModel>(this.tableData);
    this.currentPage = 0;
    this.totalSize = this.tableData.length;
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('msg') === "create success") {
        this.message = "Post successfully created."
      } else if (params.get('msg') === "update success") {
        this.message = "Post successfully updated."
      }
    })
  }

  public createUser() {
    // this.dialogRef = this.dialog.open(UserInputDialogComponent, {
    //   panelClass: 'overlay-dialog',
    //   height: '130px',
    //   width: '130px'
    // });
  }

  public uploadPost() {
    // this.dialogRef = this.dialog.open(UserInputDialogComponent, {
    //   panelClass: 'overlay-dialog',
    //   height: '130px',
    //   width: '130px'
    // });
    this.router.navigate(['/upload-csv-post']);
    
  }

  public downloadUser() {

  }

  public searchUser() {

  }

  /**
   * when pagination buttons click.
   * @param (e)
   */
  public handlePage(e: any) {

  }

  public postDetail() {
    this.dialog.open(PostDetailDialogComponent, {
      width: '40%',
      data: {
        title: "Title01",
        description: "Description01",
        status: "Active",
        created_user: "admin",
        created_at: "2022/06/23",
        updated_user: "admin",
        updated_at: "2022/06/23"
      }
    });
  }

  public deletePost() {
    let dialogRef = this.dialog.open(PostDeleteDialogComponent, {
      width: '40%',
      data: {
        id: 2,
        title: "Title01",
        description: "Description01",
        status: "Active",
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.message = "Post Delete Successfully.";
        // console.log('delete success');
      }
    });
  }
}
