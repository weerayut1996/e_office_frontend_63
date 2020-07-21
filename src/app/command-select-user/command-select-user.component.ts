import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-command-select-user',
  templateUrl: './command-select-user.component.html',
  styleUrls: ['./command-select-user.component.scss']
})
export class CommandSelectUserComponent implements OnInit {
  form: FormGroup;
  userAll: Array<any> = Array();
  documentId: String;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private backendService: BackendService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      user_list: this.formBuilder.array([this.createUser()]),
    });

    this.backendService.getUserAll().then(data => {
      console.log(data.dataList);
      this.userAll = data.dataList;
    });

    this.documentId = this.route.snapshot.queryParamMap.get('id');
    console.log(this.documentId);

  }

  createUser(): FormGroup {
    return this.formBuilder.group({
      _id: ["", Validators.required],
      name: ["", Validators.required],
      status: null,
      action_date: null
    });
  }


  openNav() {
    //ความกว้างของ slide menu
    document.getElementById("mySidenav").style.width = "300px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  selectUser(index, selectIndex) {
    console.log(this.userAll[index]);
    let fullName = this.userAll[index].rank + this.userAll[index].first_name + " " + this.userAll[index].last_name;
    this.form.get('user_list')['controls'][selectIndex].controls._id.setValue(this.userAll[index]._id);
    this.form.get('user_list')['controls'][selectIndex].controls.name.setValue(fullName);
  }

  addUser() {
    (this.form.get('user_list') as FormArray).push(this.createUser());
  }

  removeUser(index) {
    (this.form.get('user_list') as FormArray).removeAt(index);
  }

  submit() {
    if (this.form.invalid) {
      alert("กรุณาเลือกผู้รับ");
      return;
    }
    console.log(this.form.value);
    if (this.documentId) {
      this.backendService.postUpdateDocument(this.documentId, this.form.value).then(data => {
        console.log(data);
        if (data.status == true) {
          this.router.navigate(["/command-check"]);
        } else {
          alert("เกิดข้อผิดพลาด");
        }
      });
    } else {
      alert("กรุณากลับไปเลือกเอกสาร");
    }
  }
}
