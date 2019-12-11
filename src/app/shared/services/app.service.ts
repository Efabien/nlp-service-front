import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private server: string;

  constructor(
    private http: HttpClient,
  ) {
    this.server = environment.hosts.server;
  }

  create(data) {
    const url = `${this.server}/app/create`;
    return this.http.post(url, data).toPromise();
  }

  getList() {
    const url = `${this.server}/app`;
    return this.http.get(url).toPromise();
  }

  getAppDetails(appId) {
    const url = `${this.server}/app/details/${appId}`;
    return this.http.get(url).toPromise();
  }

  updateApp(appId, body) {
    const url = `${this.server}/app/update/${appId}`;
    return this.http.patch(url, body).toPromise();
  }
}
