import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CSVRecord } from 'src/app/interfaces/CSV_Model';
import { PostService } from 'src/app/services/post.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-upload-post',
  templateUrl: './upload-post.component.html',
  styleUrls: ['./upload-post.component.scss']
})
export class UploadPostComponent implements OnInit {
  public csvFile: any;
  public filename: string = "";
  public uplaodPostErrMsg: string = "";
  public noFileErrMsg: string = "";
  public csvErrMsg: string = "";
  public userInfo: any;
  public records: any;
  public postList: any = [];
  public duplicateTitle: any;
  public uploadData: any = [];
  files: any;

  constructor(
    private router: Router,
    private postService: PostService
  ) { }

  @ViewChild('csvReader', { static: false }) csvReader: any;
  ngOnInit(): void {
    const data: any = localStorage.getItem('userLoginData') || "";
    this.userInfo = JSON.parse(data)._id;
  }

  /**
   * submit csv file
   */
  uploadCSV() {
    if (!this.csvFile || this.uploadData === undefined) {
      this.noFileErrMsg = "Please select a file";
      this.onClear();
    }

    this.postService.createPost(this.uploadData).then((dist) => {
      this.router.navigate(["post-list", { msg: "success" }]);
    });
  }

  /**
   * scan csv file
   */
  uploadListener(fileInput: any): void {
    this.files = fileInput.srcElement.files;
    if (this.isValidCSVFile(this.files[0])) {

      let input = fileInput.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);
      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        let headersRow = this.getHeaderArray(csvRecordsArray);
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        this.uploadData = [];

        this.records.map((result: any) => {
          let res = {
            title: result.title,
            description: result.description,
            created_user_id: this.userInfo,
          }
          this.uploadData.push(res);
        })
      };
      reader.onerror = function () {
      };
    } else {
      this.uplaodPostErrMsg = "Please select a correct CSV file";
      this.onClear();
    }
  }

  /**
   * check csv format
   */
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let currentRecord = (<string>csvRecordsArray[i]).split(',');
      if (currentRecord.length == headerLength) {
        let csvRecord: CSVRecord = new CSVRecord();
        csvRecord.title = currentRecord[0];
        csvRecord.description = currentRecord[1];
        if (!currentRecord[0] || !currentRecord[1]) {
          this.csvErrMsg = "Please select a formatted CSV file";
          this.onClear();
        } else {
          csvArr.push(csvRecord);
        }
      }
    }
    return csvArr;
  }

  /**
   * check csv file extension
   */
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

  /**
   * clear button
   */
  onClear() {
    this.csvReader.nativeElement.value = "";
    this.uploadData = undefined;
  }

}
