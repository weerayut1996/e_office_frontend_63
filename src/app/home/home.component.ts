import { Component, OnInit } from "@angular/core";
import { BackendService } from "../backend.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  userName: string;
  rank: string;

  constructor(private backend: BackendService) { }

  ngOnInit(): void {
    this.backend.getUser().then((obj) => {
      console.log(obj);
      this.userName = obj.data.name;
      this.rank = obj.data2.rank;
    });
  }

  openNav() {
    //ความกว้างของ slide menu
    document.getElementById("mySidenav").style.width = "320px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
}
