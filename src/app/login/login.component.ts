// ctrl + A
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { BackendService } from "../backend.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitting: Boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private backendService: BackendService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      rtarf_mail: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  get f() {
    // เข้าถึงค่าของฟอร์ม
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitting = true;
    let rtarfMail = this.loginForm.get("rtarf_mail").value + "@rtarf.mi.th";
    this.loginForm.get("rtarf_mail").setValue(rtarfMail);
    console.log(this.loginForm.value);

    this.backendService.postLogin(this.loginForm.value).then((data) => {
      console.log(data);
      if (data.status) {
        this.router.navigate(["/home"]);
      } else {
        this.submitting = false;
        this.loginForm.get("rtarf_mail").setValue(null);
        alert("ไม่พบบัญชีผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      }
    });
  }
}
