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

  getDocumentByOwner(id): Promise<any> {
    let headerSpecify = this.httpOptions;
    headerSpecify.params = { id };
    return new Promise((resolve) => {
      this.http
        .get<any>(backendUrl + "document/get-by-owner", headerSpecify)
        .pipe()
        .subscribe((data) => {
          resolve(data);
        });
    });
  }

  getDocumentByUser(id): Promise<any> {
    let headerSpecify = this.httpOptions;
    headerSpecify.params = { id };
    return new Promise((resolve) => {
      this.http
        .get<any>(backendUrl + "document/get-by-user", headerSpecify)
        .pipe()
        .subscribe((data) => {
          resolve(data);
        });
    });
  }


  postUpdateActionDocument(docId: String, userId: String, status: String): Promise<any> {
    return new Promise((resolve) => {
      this.http
        .post<any>(backendUrl + "document/update-action", { docId, userId, status }, this.httpOptions)
        .pipe()
        .subscribe((data) => {
          resolve(data);
        });
    });
  }

  getCountDocumentByUser(id): Promise<any> {
    let headerSpecify = this.httpOptions;
    headerSpecify.params = { id };
    return new Promise((resolve) => {
      this.http
        .get<any>(backendUrl + "document/get-count-waiting-by-user", headerSpecify)
        .pipe()
        .subscribe((data) => {
          resolve(data);
        });
    });
  }

  getLineUidByUser(id): Promise<any> {
    let headerSpecify = this.httpOptions;
    headerSpecify.params = { id };
    return new Promise((resolve) => {
      this.http
        .get<any>(backendUrl + "line-notify/get-uid-by-user", headerSpecify)
        .pipe()
        .subscribe((data) => {
          resolve(data);
        });
    });
  }

  postUpdateUid(id: String, uid: String): Promise<any> {
    return new Promise((resolve) => {
      this.http
        .post<any>(backendUrl + "line-notify/update-uid", { id, uid }, this.httpOptions)
        .pipe()
        .subscribe((data) => {
          resolve(data);
        });
    });
  }

  sendNotificationToLine(msg: String, uid: String[]) {
    return new Promise((resolve) => {
      return this.http
        .post<any>(
          backendUrl + "line-notify/send-message",
          { msg, uid },
          this.httpOptions
        )
        .pipe().subscribe((data: any) => {
          resolve(data);
        });
    });
  }
}
