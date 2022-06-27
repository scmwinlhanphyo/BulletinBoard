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
  created_user?: string;
  type?: string;
  phone?: string;
  dob?: string;
  address?: string;
  created_at?: string;
  updated_at?: string;
  updated_user?: string;

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