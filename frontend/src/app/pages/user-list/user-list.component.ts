import { ViewChild, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
import { UserDetailDialogComponent } from 'src/app/components/user-detail-dialog/user-detail-dialog.component';
import { UserDeleteDialogComponent } from 'src/app/components/user-delete-dialog/user-delete-dialog.component';
import { UserDataModel } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {

  public dataSource = new MatTableDataSource<UserDataModel>();
  public employees: any[] = [];
  public selectedEmployeeName = '';
  public showTimeFlag: any;
  public columnToDisplay = [
    'no',
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
  pageSizes = [2, 4, 8];
  actualPaginator?: MatPaginator;
  currentPage = 0;
  totalSize = 0;
  username = "";
  email = "";
  fromDate = "";
  toDate = "";
  today = new Date();
  public message: any = "";
  userLists: any;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.getUsers();
    // this.dataSource.data = this.userLists;
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('msg') === 'success') {
        this.message = 'User successfully created.';
        this.getUsers();
      } else if (params.get('updatepw') === 'success') {
        this.message = 'Password is successfully updated.';
        this.getUsers();
      } else if (params.get('editprofile') === 'success') {
        this.message = 'User profile successfully updated.';
        this.getUsers();
      }
    });
  }

  /**
   * get user data.
   */
  public getUsers() {
    const payload = {}
    this.userService.getUsers(payload).then((dist) => {
      this.userLists = dist.data;
      // const result = []
      this.dataSource.data = dist.data;
      this.dataSource.paginator = this.paginator;
      this.currentPage = 0;
      this.totalSize = this.userLists.length;
    })
  }

  /**
   * search user button click.
   */
  public searchUser() {
    let payload: any = {};
    console.log('from date', this.fromDate);
    console.log('to date', this.toDate);
    this.username ? payload['username'] = this.username : '';
    this.email ? payload['email'] = this.email : '';
    this.fromDate ? payload['fromDate'] = moment(this.fromDate).format('YYYY/MM/DD') : '';
    this.toDate ? payload['toDate'] = moment(this.toDate).format('YYYY/MM/DD') : '';
    
    this.userService.findByName(payload).then((dist) => {
      this.userLists = dist.data;
      this.dataSource.data = this.userLists;
      this.dataSource.paginator = this.paginator;
      this.currentPage = 0;
      this.totalSize = this.userLists.length;
    })
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
   * delete user data.
   * @param data 
   */
  public deleteUser(data: any) {
    const userId = data._id;
    console.log(userId)
    let dialogRef = this.dialog.open(UserDeleteDialogComponent, {
      width: '40%',
      data: data,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        // localStorage.setItem("userInfo", JSON.stringify(new String("62bea112b226e6d6c11caf93")));
        // const deleted_user_id = JSON.parse(localStorage.getItem('userInfo') || "[]");
        const deleted_user_id = localStorage.getItem('userId');
        this.userService.deleteUser(userId).then((dist) => {
          console.log(dist);
          this.message = 'User Delete Successfully.';
          this.getUsers();
        })
      }
    });
  }
}
