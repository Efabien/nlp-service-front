import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RessourcesService {
  private server: string;

  constructor(
    private http: HttpClient
  ) {
    this.server = environment.hosts.server;
  }

  getList() {
    const url = `${this.server}/resources`;
    return this.http.get(url).toPromise();
  }
}
