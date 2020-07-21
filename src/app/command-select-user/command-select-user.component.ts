import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-command-select-user',
  templateUrl: './command-select-user.component.html',
  styleUrls: ['./command-select-user.component.scss']
})
export class CommandSelectUserComponent implements OnInit {
  form: FormGroup;
  userAll: Array<any> = Array();

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private backendService: BackendService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      user_list: this.formBuilder.array([this.createUser()]),
    });

    this.backendService.getUserAll().then(data => {
      console.log(data.dataList);
      this.userAll = data.dataList;
    })
  }

  createUser(): FormGroup {
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

  addUser() {
    (this.form.get('user_list') as FormArray).push(this.createUser());
  }

  removeUser(index) {
    (this.form.get('user_list') as FormArray).removeAt(index);
  }

  submit() {
    this.router.navigate(["/command-check"]);
  }
}
