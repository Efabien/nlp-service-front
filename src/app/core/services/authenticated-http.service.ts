import { HttpClient, HttpXhrBackend, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';

@Injectable()
export class AuthenticatedHttpService extends HttpClient {

  constructor(
    backend: HttpXhrBackend
  ) {
    super(backend);
  }

  get(url: string, options: any) {
    return this.intercept(super.get(url, this.getHTTPOption(options)));
  }

  post(url: string, body: string, options: any) {
    return this.intercept(super.post(url, body, this.getHTTPOption(options)));
  }

  patch(url: string, body: string, options: any) {
    return this.intercept(super.patch(url, body, this.getHTTPOption(options)));
  }

  put(url: string, body: string, options: any) {
    return this.intercept(super.put(url, body, this.getHTTPOption(options)));
  }

  delete(url: string, options: any) {
    return this.intercept(super.delete(url, this.getHTTPOption(options)));
  }

  private getHTTPOption(options: any = {}) {
    const token = localStorage.getItem('token');
    const params: any = {};
    if (token) params.Authorization = token;
    const headers = new HttpHeaders(params);
    if (options.query && Object.keys(options.query).length) {
      options.params = new HttpParams();
      for (let key in options.query) options.params = options.params.append(key, options.query[key]);
    }
    return Object.assign(options, { json: true, headers: headers });
  }

  private intercept(observable): Observable<any> {
    return observable.catch(error => {
      if (error.status === 404) return Observable.empty();
      return Observable.throw(error);
    });
  }
}
