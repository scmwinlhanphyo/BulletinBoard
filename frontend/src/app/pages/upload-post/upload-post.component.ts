import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CSVRecord } from 'src/app/interfaces/CSV_Model';
import { PostService } from 'src/app/services/post.service';
@Component({
  selector: 'app-upload-post',
  templateUrl: './upload-post.component.html',
  styleUrls: ['./upload-post.component.scss']
})
export class UploadPostComponent implements OnInit {
  public csvFile: any;
  public filename: string = "";
  public uplaodPostErrMsg: string = "";
  public userInfo: any;
  public records: any;
  public postList: any = [];
  public duplicateTitle: any;
  public uploadData: any = [];

  constructor(
    private router: Router,
    private postService: PostService
  ) { }

  @ViewChild('csvReader') csvReader: any;
  ngOnInit(): void {
    localStorage.setItem("userInfo", JSON.stringify(new String("62bea112b226e6d6c11caf93")));
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') || "[]");
  }

  uploadCSV() {
    console.log('uploadCSV');
    this.postService.createPost(this.uploadData).then((dist) => {
      console.log(dist);
      this.router.navigate(["post-list", { msg: "success" }]);
    });
  }

  uploadListener(fileInput: any): void {
    let files = fileInput.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      let input = fileInput.target;
      // console.log(input.files[0].name);

      let reader = new FileReader();
      reader.readAsText(input.files[0]);


      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);

          this.records.map((result: any) => {
            let res = {
              title: result.title,
              description: result.description,
              created_user_id: this.userInfo,
              updated_user_id: this.userInfo,
              created_at: new Date(),
              updated_at: new Date(),
              deleted_at: "",
            }
          this.uploadData = res;
          })
      };

      reader.onerror = function () {
        console.log('Error is occured while reading file!');
      };
    } else {
      this.uplaodPostErrMsg = "Please select a correct CSV file";
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let currentRecord = (<string>csvRecordsArray[i]).split(',');
      if (currentRecord.length == headerLength) {
        let csvRecord: CSVRecord = new CSVRecord();
        csvRecord.title = currentRecord[0];
        csvRecord.description = currentRecord[1];
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
  }

  onClear() {
    window.location.reload();
  }
  // uploadListener(fileInput: any) {

  //   if (fileInput.target.files && fileInput.target.files[0]) {
  //     // this.filename = '';
  //     this.uplaodPostErrMsg = "Please select a correct CSV file";
  //     fileInput.target.files.map((file: File) => {
  //       console.log(file);
  //       this.filename += file.name + ',';
  //     });
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       const image = new Image();
  //       image.src = e.target.result;
  //       image.onload = rs => {
  //         // Return Base64 Data URL
  //         const imgBase64Path = e.target.result;
  //       };
  //     };
  //     reader.readAsDataURL(fileInput.target.files[0]);

  //     // Reset File Input to Selct Same file again
  //     this.csvFile.nativeElement.value = "";
  //   } else {
  //     this.filename = 'Select File';
  //   }
  // }

}
