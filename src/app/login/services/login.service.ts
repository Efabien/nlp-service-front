import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private server: string;
  constructor(
    private http: HttpClient
  ) {
    this.server = environment.hosts.server;
  }

  authenticate(login) {
    const url = `${this.server}/authenticate`;
    return this.http.post(url, login).toPromise();
  }
}
