import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { environment } from "../../environments/environment";
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

const backendUrl = environment.backendUrl;
@Component({
  selector: 'app-command-add-file',
  templateUrl: './command-add-file.component.html',
  styleUrls: ['./command-add-file.component.scss']
})
export class CommandAddFileComponent implements OnInit {
  selectedFile: Array<File> = [];
  uploadedLink: Array<string> = [];
  previewPdf: any;

  constructor(private backendService: BackendService, private sanitizer: DomSanitizer,
    private router: Router,) { }

  ngOnInit(): void {
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
        this.uploadedLink.push(backendUrl + "preview/" + data.result.insertedId);
      }).catch(err => {
        alert(err);
      });
    });
  }

  submit() {
    this.router.navigate(["/command-select-user"]);
  }

  openPreviewPdf(link) {
    this.previewPdf = this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }

  closePreviewPdf() {
    this.previewPdf = null;
  }

}
