import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.scss']
})
export class PostDeleteComponent implements OnInit {

  id?: number;
  title?: string;
  description?: string;
  status?: string;

  constructor(
    public dialogRef: MatDialogRef<PostDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostDeleteComponent,
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
