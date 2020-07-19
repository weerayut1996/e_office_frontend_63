import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";

const backendUrl = environment.backendUrl;
@Injectable({
  providedIn: "root",
})
export class BackendService {
  public httpOptions;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
  }

  getUser(): Promise<any> {
    return new Promise((resolve) => {
      this.http
        .get<any>(backendUrl + "user", this.httpOptions)
        .pipe()
        .subscribe((data) => {
          resolve(data);
        });
    });
  }

  // เพิ่ม code
  postRegister(formData: any): Promise<any> {
    return new Promise((resolve) => {
      this.http
        .post<any>(backendUrl + "register", { formData }, this.httpOptions)
        .pipe()
        .subscribe((data) => {
          resolve(data);
        });
    });
  }
  // จบ code

  // เพิ่ม code2
  postLogin(formData: any): Promise<any> {
    return new Promise((resolve) => {
      this.http
        .post<any>(backendUrl + "login", { formData }, this.httpOptions)
        .pipe()
        .subscribe((data) => {
          resolve(data);
        });
    });
  }
  // จบ code2
}
