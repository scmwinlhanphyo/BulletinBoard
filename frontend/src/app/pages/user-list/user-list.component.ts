import { ViewChild, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserDetailDialogComponent } from 'src/app/components/user-detail-dialog/user-detail-dialog.component';
import { UserDeleteDialogComponent } from 'src/app/components/user-delete-dialog/user-delete-dialog.component';

export interface UserDataModel {
  name: string;
  email: string;
  created_user: string;
  type: string;
  phone: string;
  dob: string;
  address: string;
  created_at: string;
  updated_at: string;
  updated_user: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {

  public tableData =
    [
      {
        name: "Aung Aung",
        email: "aungaung@gmail.com",
        created_user: "Aung Aung",
        type: "Admin",
        phone: "0912345",
        dob: "2022/06/21",
        address: "Insein",
        created_at: "2022/06/21",
        updated_at: "2022/06/21",
        updated_user: "Admin",
      },
      {
        name: "Mg Mg",
        email: "mgmg@gmail.com",
        created_user: "Mg Mg",
        type: "Admin",
        phone: "0912345",
        dob: "2022/06/21",
        address: "Yangon",
        created_at: "2022/06/21",
        updated_at: "2022/06/21",
        updated_user: "Admin"
      },
      {
        name: "Zaw Zaw",
        email: "zawzaw@gmail.com",
        created_user: "Zaw Zaw",
        type: "User",
        phone: "0912345",
        dob: "2022/06/21",
        address: "Loi Kaw",
        created_at: "2022/06/21",
        updated_at: "2022/06/21",
        updated_user: "Admin"
      },
      {
        name: "Aung Aung",
        email: "aungaung@gmail.com",
        created_user: "Aung Aung",
        type: "Admin",
        phone: "0912345",
        dob: "2022/06/21",
        address: "Insein",
        created_at: "2022/06/21",
        updated_at: "2022/06/21",
        updated_user: "Admin"
      },
      {
        name: "Aung Aung",
        email: "aungaung@gmail.com",
        created_user: "Aung Aung",
        type: "Admin",
        phone: "0912345",
        dob: "2022/06/21",
        address: "Insein",
        created_at: "2022/06/21",
        updated_at: "2022/06/21",
        updated_user: "Admin"
      },
    ];
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
    const payload = {}
    this.userService.getUsers(payload).then((dist) => {
      // console.log(dist);
      this.userLists = dist.data;
      const result = []
      // for (let [key, value] of this.userLists.entries()) {
      // console.log(value);
      // this.tableData.unshift({
      //   name: value.name,
      //   email: value.email,
      //   created_user: value.created_user_id,
      //   dob: value.dob,
      //   phone: value.phone,
      //   type: value.type,
      //   created_at: value.createdAt,
      //   updated_at: value.updatedAt,
      //   updated_user: value.updated_user,
      //   address: value.address
      // })
      // }
      // console.log(this.tableData)
      this.dataSource = new MatTableDataSource<any>(dist.data);
      this.dataSource.paginator = this.paginator;
      this.currentPage = 0;
      this.totalSize = this.userLists.length;
    })
    // this.dataSource.data = this.userLists;
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('msg') === 'success') {
        this.message = 'User successfully created.';
      } else if (params.get('updatepw') === 'success') {
        this.message = 'Password is successfully updated.';
      } else if (params.get('editprofile') === 'success') {
        this.message = 'User profile successfully updated.';
      }
    });
  }

  /**
   * when pagination buttons click.
   * @param (e)
   */
  public handlePage(e: any) { }

  /**
   * search user button click.
   */
  public searchUser() { }

  /**
   * open user detail dialog.
   * @param data
   */
  public userDetail(data: any) {
    console.log('data', data);
    this.dialog.open(UserDetailDialogComponent, {
      width: '40%',
      data: data,
    });
  }

  updateUser(userId: any) {
    const userID = userId._id;
    // console.log(userID)
    this.router.navigate(['profile-edit/' + userID]);
  }

  public deleteUser(data: any) {
    // console.log('data', data);
    const userId = data._id;
    // console.log(userId);
    // console.log('userID', userId);
    // const payload = {}
    // this.userService.findUser(payload).then((dist) => {
    //   // console.log(dist);
    //   this.userLists = dist.data;
    //   console.log(this.userLists);
    // })
    let dialogRef = this.dialog.open(UserDeleteDialogComponent, {
      width: '40%',
      data: data,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        localStorage.setItem("userInfo", JSON.stringify(new String("62bea112b226e6d6c11caf93")));
        const deleted_user_id = JSON.parse(localStorage.getItem('userInfo') || "[]");
        const payload = {
          deleted_user_id: deleted_user_id
        }
        console.log(payload)
        this.userService.deleteUser(payload, userId).then((dist) => {
          console.log(dist);
        })
        this.message = 'User Delete Successfully.';
        // console.log('delete success');
      }
    });
  }
}
