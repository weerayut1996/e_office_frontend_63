import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { environment } from "../../environments/environment";
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-user-document-list',
  templateUrl: './user-document-list.component.html',
  styleUrls: ['./user-document-list.component.scss']
})
export class UserDocumentListComponent implements OnInit {
  userData: any;
  documentList: Array<any>;
  documentWaitingList: Array<any> = Array();
  documentDoneList: Array<any> = Array();
  waitingNumber: number = 0;
  backendUrl = environment.backendUrl;

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.userData = jwt_decode(localStorage.getItem("token"));
    this.backendService.getDocumentByUser(this.userData.id).then(data => {
      console.log(data.dataList);
      this.documentList = data.dataList;

      this.documentList.forEach(item => {
        if (item.users_action.status == null) {
          this.waitingNumber = this.waitingNumber + 1;
          this.documentWaitingList.push(item);
        } else {
          this.documentDoneList.push(item);
        }

      })
    });
  }

  openNav() {
    //ความกว้างของ slide menu
    document.getElementById("mySidenav").style.width = "300px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
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

  submitRead(id, index) {
    console.log(id);
    this.documentWaitingList[index].users_action.action_date = new Date();
    this.documentDoneList.push(this.documentWaitingList[index]);
    this.waitingNumber = this.waitingNumber - 1;
    this.documentWaitingList.splice(index, 1);
    this.backendService.postUpdateActionDocument(id, this.userData.id, "รับทราบ").then(data => {
      console.log(data);

    })
  }

}
