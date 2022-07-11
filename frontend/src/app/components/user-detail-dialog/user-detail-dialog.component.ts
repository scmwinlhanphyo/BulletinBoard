import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-detail-dialog',
  templateUrl: './user-detail-dialog.component.html',
  styleUrls: ['./user-detail-dialog.component.scss']
})
export class UserDetailDialogComponent implements OnInit {

  name?: string;
  email?: string;
  created_user_id?: string;
  type?: string;
  phone?: string;
  dob?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
  updated_user_id?: string;
  profile?: string;

  constructor(
    public dialogRef: MatDialogRef<UserDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDetailDialogComponent,
  ) { }

  ngOnInit(): void {
    console.log('dialog', this.data);
  }

  cancel() {
    this.dialogRef.close();
  }

}
