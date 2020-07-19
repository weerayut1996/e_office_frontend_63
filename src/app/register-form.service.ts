// ctrl+A
import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class RegisterFormService {
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  initForm() {
    this.form = this.formBuilder.group({
      rank: ["", Validators.required],
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      mil_id: ["", Validators.required],
      rtarf_mail: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  resetForm() {
    this.initForm();
    this.form.reset();
  }
}
