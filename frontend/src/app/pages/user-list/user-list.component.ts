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
  pageSize = 5;
  pageOptions = [5, 10, 15];

  public dataSubject: any = null;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.dataSubject = this.userService.dataSubject;
   }

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
    this.userService.getUsers(this.currentPage, this.pageSize).then((dist) => {
      this.userLists = dist.data;
      this.dataSource = new MatTableDataSource<any>(this.userLists);
      this.dataSubject.next(this.dataSource);
      this.dataSource.paginator = this.paginator;
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

    this.userService.findByName(this.currentPage, this.pageSize, payload).then((dist) => {
      this.userLists = dist.data;
      this.dataSource.data = this.userLists;
      this.dataSource.paginator = this.paginator;
      this.totalSize = this.userLists.length;
    })
  }

  /**
   * when pagination buttons click.
   * @param (e)
   */
   public handlePage(e: any) {
    this.pageSize = e.pageOptions;
    const pageIndex = e.pageIndex
    this.userService.getUsers(this.pageSize, pageIndex).then((dist) => {
      this.userLists = dist.data;
      this.dataSource = new MatTableDataSource<any>(this.userLists);
      this.dataSource.paginator = this.paginator;
      this.totalSize = this.userLists.length;
    })
  }
}
