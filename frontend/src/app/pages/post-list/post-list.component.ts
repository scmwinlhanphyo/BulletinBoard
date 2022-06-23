import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PostDetailComponent } from 'src/app/pages/post-detail/post-detail.component';
import { PostDeleteComponent } from 'src/app/pages/post-delete/post-delete.component';

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

  public tableData = [
    {
      title: "Title01",
      description: "Description01",
      created_user: "admin",
      created_at: "2022/06/21"
    },
    {
      title: "Title02",
      description: "Description01",
      created_user: "admin",
      created_at: "2022/06/21"
    },
    {
      title: "Title03",
      description: "Description01",
      created_user: "admin",
      created_at: "2022/06/21"
    },
    {
      title: "Title04",
      description: "Description01",
      created_user: "admin",
      created_at: "2022/06/21"
    },
    {
      title: "Title05",
      description: "Description01",
      created_user: "admin",
      created_at: "2022/06/21"
    },
    {
      title: "Title06",
      description: "Description01",
      created_user: "admin",
      created_at: "2022/06/21"
    },
  ];
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
  postDelete = "";

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<PostDataModel>(this.tableData);
    this.currentPage = 0;
    this.totalSize = this.tableData.length;
  }

  public createUser() {
    // this.dialogRef = this.dialog.open(UserInputDialogComponent, {
    //   panelClass: 'overlay-dialog',
    //   height: '130px',
    //   width: '130px'
    // });
  }

  public uploadUser() {
    // this.dialogRef = this.dialog.open(UserInputDialogComponent, {
    //   panelClass: 'overlay-dialog',
    //   height: '130px',
    //   width: '130px'
    // });
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
    this.dialog.open(PostDetailComponent, {
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
    let dialogRef = this.dialog.open(PostDeleteComponent, {
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
        this.postDelete = "Post Delete Successfully.";
        // console.log('delete success');
      }
    });
  }
}
