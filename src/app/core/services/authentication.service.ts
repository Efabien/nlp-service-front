import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  server: string;
  userInfoChanged: Subject<any> = new Subject<any>();

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.server = environment.hosts.server;
  }

  getEmail() {
    return localStorage.getItem('email');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  redirectToLogin(): boolean {
    this.router.navigate(['/user/login']);
    return true;
  }

  setUserInfo(userInfo) {
    localStorage.setItem('email', userInfo.email);
    localStorage.setItem('token', userInfo.token);
    this.userInfoChanged.next(userInfo);
  }
}
