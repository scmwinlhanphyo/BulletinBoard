import { ViewChild, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
import { UserDataModel } from 'src/app/interfaces/interfaces';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {

  public dataSource = new MatTableDataSource<UserDataModel>();
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
      } else if (params.get('msg') === 'delete success') {
        this.message = 'User deleted successfully.';
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
}
