import { Component, OnInit } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { BackendService } from '../backend.service';
import { environment } from "../../environments/environment";


@Component({
  selector: 'app-command-check',
  templateUrl: './command-check.component.html',
  styleUrls: ['./command-check.component.scss']
})
export class CommandCheckComponent implements OnInit {
  userData: any;
  documentList: Array<any>;
  backendUrl = environment.backendUrl;
  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.userData = jwt_decode(localStorage.getItem("token"));
    this.backendService.getDocumentByOwner(this.userData.id).then(data => {
      console.log(data.dataList);
      this.documentList = data.dataList;
    });
  }

  openNav() {
    //ความกว้างของ slide menu
    document.getElementById("mySidenav").style.width = "300px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  submit() {

  }

  formalDate(date: string) {
    let dateFormal = new Date(date);
    let options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return dateFormal.toLocaleDateString("th-TH", options);
  }

  formalTime(date: string) {
    let dateFormal = new Date(date);
    let options = { hour: '2-digit', minute: '2-digit' };
    return dateFormal.toLocaleTimeString('th-TH', options) + " น.";
  }

}
