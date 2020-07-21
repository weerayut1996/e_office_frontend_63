import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import * as jwt_decode from "jwt-decode";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.scss']
})
export class UserSettingComponent implements OnInit {
  userData: any;
  form: FormGroup;
  constructor(private backendService: BackendService, private formBuilder: FormBuilder,
    private router: Router,) { }

  ngOnInit(): void {
    this.userData = jwt_decode(localStorage.getItem("token"));
    this.form = this.formBuilder.group({
      uid: ["", Validators.required],
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
    if (this.form.invalid) {
      alert("กรุณากรอกข้อมูล");
      return;
    }

    this.backendService.postUpdateUid(this.userData.id, this.form.get('uid').value).then(data => {
      alert("บันทึกเรียบร้อยแล้ว");
      this.router.navigate(["/home"]);
    });
  }

}
