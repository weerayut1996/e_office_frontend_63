import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { environment } from "../../environments/environment";
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import * as jwt_decode from "jwt-decode";

const backendUrl = environment.backendUrl;
@Component({
  selector: 'app-command-add-file',
  templateUrl: './command-add-file.component.html',
  styleUrls: ['./command-add-file.component.scss']
})
export class CommandAddFileComponent implements OnInit {
  selectedFile: Array<File> = [];
  uploadedLink: Array<string> = [];
  uploadedId: Array<string> = [];
  previewPdf: any;
  form: FormGroup;
  actionNumber: number = 0;

  constructor(private backendService: BackendService, private sanitizer: DomSanitizer,
    private router: Router,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      files: this.formBuilder.array([]),
      owner: this.createOwner(),
    });
    this.form.reset();

    //ตั้งค่าข้อมูลผู้ส่ง
    let userData = jwt_decode(localStorage.getItem("token"));
    let fullName = userData.rank + userData.first_name + " " + userData.last_name;
    this.form.get("owner")['controls']['_id'].setValue(userData.id);
    this.form.get("owner")['controls']['name'].setValue(fullName);
    console.log(this.form.value);

    this.backendService.getCountDocumentByUser(userData.id).then(data => {
      this.actionNumber = data.dataList.users_action;
    })
  }

  createOwner(): FormGroup {
    return this.formBuilder.group({
      _id: ["", Validators.required],
      name: ["", Validators.required]
    });
  }

  createFile(): FormGroup {
    return this.formBuilder.group({
      _id: ["", Validators.required],
      name: ["", Validators.required]
    });
  }

  openNav() {
    //ความกว้างของ slide menu
    document.getElementById("mySidenav").style.width = "300px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  onFileSelect(event) {
    this.selectedFile.push(event.target.files[0]);
    console.log(this.selectedFile);
  }

  removeFile(index) {
    if (index > -1) {
      this.selectedFile.splice(index, 1);
      console.log(this.selectedFile);
    }
  }

  upload() {
    this.selectedFile.forEach((element) => {
      this.backendService.uploadFile(element).then(data => {
        this.uploadedId.push(data.result.insertedId);
        this.uploadedLink.push(backendUrl + "preview/" + data.result.insertedId);
      }).catch(err => {
        alert(err);
      });
    });
  }

  submit() {
    this.selectedFile.forEach((item, index) => {
      let files: FormGroup = this.createFile();
      files.get("_id").setValue(this.uploadedId[index]);
      files.get("name").setValue(item.name);
      (this.form.get("files") as FormArray).push(files);
      console.log(this.form.value);
    });

    this.backendService.postDocument(this.form.value).then(data => {
      console.log(data);
      if (data.status == true) {
        this.router.navigate(["/command-select-user"],
          {
            queryParams: { id: data.result.insertedId }
          });
      } else {
        alert("เกิดข้อผิดพลาด");
      }
    });
  }

  openPreviewPdf(link) {
    this.previewPdf = this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }

  closePreviewPdf() {
    this.previewPdf = null;
  }

}
