import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-post-detail-dialog',
  templateUrl: './post-detail-dialog.component.html',
  styleUrls: ['./post-detail-dialog.component.scss']
})
export class PostDetailDialogComponent implements OnInit {

  title?: string;
  description?: string;
  status?: string;
  created_user_id?: string;
  createdAt?: string;
  updated_user_id?: string;
  updatedAt?: string

  constructor(
    public dialogRef: MatDialogRef<PostDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostDetailDialogComponent,
  ) { }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close();
  }

}
