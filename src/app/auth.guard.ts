import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem("token")) {
      let userData = jwt_decode(localStorage.getItem("token"));
      console.log(userData);
      if (userData) {
        return true;
      } else {
        this.router.navigate(["/login"]);
        return false;
      }
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }

}
