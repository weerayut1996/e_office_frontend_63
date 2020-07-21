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
        .subscribe((data: any) => {
          if (data.status == true) {
            localStorage.setItem("token", data.token);
          }
          resolve(data);
        });
    });
  }
  // จบ code2

  uploadFile(fileInput: any): Promise<any> {
    return new Promise((resolve, rejects) => {
      const formData = new FormData();
      formData.append('file', fileInput);
      this.http.post(backendUrl + 'uploadFile', formData)
        .subscribe((res) => {
          resolve(res);
        }, (err) => {
          rejects(err.message);
        })
    })
  }

  getUserAll(): Promise<any> {
    return new Promise((resolve) => {
      this.http
        .get<any>(backendUrl + "user-all", this.httpOptions)
        .pipe()
        .subscribe((data) => {
          resolve(data);
        });
    });
  }

  postDocument(formData: any): Promise<any> {
    return new Promise((resolve) => {
      this.http
        .post<any>(backendUrl + "document/add-file", { formData }, this.httpOptions)
        .pipe()
        .subscribe((data) => {
          resolve(data);
        });
    });
  }

  postUpdateDocument(id: String, formData: any): Promise<any> {
    return new Promise((resolve) => {
      this.http
        .post<any>(backendUrl + "document/update", { id, formData }, this.httpOptions)
        .pipe()
        .subscribe((data) => {
          resolve(data);
        });
    });
  }
}
