import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-post-delete-dialog',
  templateUrl: './post-delete-dialog.component.html',
  styleUrls: ['./post-delete-dialog.component.scss']
})
export class PostDeleteDialogComponent implements OnInit {

  _id?: string;
  title?: string;
  description?: string;
  status?: string;

  constructor(
    public dialogRef: MatDialogRef<PostDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostDeleteDialogComponent,
  ) { }

  ngOnInit(): void {
  }

  cancel(){
    this.dialogRef.close(null);
  }

  remove(){
    this.dialogRef.close('delete');
  }

}
