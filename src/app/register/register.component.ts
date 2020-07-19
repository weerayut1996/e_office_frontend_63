// ctrl+A
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { RegisterFormService } from "../register-form.service";
import { BackendService } from "../backend.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  // เพิ่มโค้ด1
  submitting: Boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private formService: RegisterFormService,
    private backendService: BackendService
  ) {}

  ngOnInit() {
    // เป็น initial form ค่าฟอร์มเริ่มต้น
    this.formService.resetForm();
  }

  get form(): FormGroup {
    // เข้าถึงค่าของฟอร์ม
    return this.formService.form;
  }

  onSubmit() {
    this.submitting = true;

    if (this.form.invalid) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      this.submitting = false;
      return;
    }
    // เมื่อเรากดปุ่ม register ให้มาที่ ฟังก์ชั่นนี้
    console.log(this.form.value);
    let rtarfMail = this.form.get("rtarf_mail").value + "@rtarf.mi.th";
    this.form.get("rtarf_mail").setValue(rtarfMail);
    let formDetails = this.form.value;

    this.backendService.postRegister(formDetails).then((data) => {
      if (data.status) {
        alert("ลงทะเบียนสำเร็จ");
        this.router.navigate(["/login"]);
      }
    });
  }
  // จบโค้ด1
}
