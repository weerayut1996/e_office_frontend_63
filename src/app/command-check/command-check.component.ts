import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-command-check',
  templateUrl: './command-check.component.html',
  styleUrls: ['./command-check.component.scss']
})
export class CommandCheckComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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

}
