import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface UserDataModel {
  name: string,
  email: string,
  created_user: string,
  type: string,
  phone: string,
  dob: string,
  address: string,
  created_at: string,
  updated_at: string,
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public tableData = [
    {
      name: "Aung Aung",
      email: "aungaung@gmail.com",
      created_user: "Aung Aung",
      type: "Admin",
      phone: "0912345",
      dob: "2022/06/21",
      address: "Insein",
      created_at: "2022/06/21",
      updated_at: "2022/06/21"
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
      updated_at: "2022/06/21"
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
      updated_at: "2022/06/21"
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
      updated_at: "2022/06/21"
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
      updated_at: "2022/06/21"
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
      updated_at: "2022/06/21"
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

  constructor(
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<UserDataModel>(this.tableData);
    this.currentPage = 0;
    this.totalSize = this.tableData.length;
  }

  /**
   * when pagination buttons click.
   * @param (e)
   */
  public handlePage(e: any) {

  }

  /**
   * search user button click.
   */
  public searchUser() {

  }

}
