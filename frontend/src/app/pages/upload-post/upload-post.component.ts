import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-post',
  templateUrl: './upload-post.component.html',
  styleUrls: ['./upload-post.component.scss']
})
export class UploadPostComponent implements OnInit {
  public csvFile: any;
  public filename: string = "";
  public uplaodPostErrMsg: string = "";

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  uploadCSV() {
    console.log('uploadCSV');
  }

  fileChangeEvent(fileInput: any) {

    if (fileInput.target.files && fileInput.target.files[0]) {


      // this.filename = '';
      this.uplaodPostErrMsg = "Please select a correct CSV file";
      fileInput.target.files.map((file: File) => {
        console.log(file);
        this.filename += file.name + ',';
      });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {

          // Return Base64 Data URL
          const imgBase64Path = e.target.result;

        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);

      // Reset File Input to Selct Same file again
      this.csvFile.nativeElement.value = "";
    } else {
      this.filename = 'Select File';
    }
  }

}
