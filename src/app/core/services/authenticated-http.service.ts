import { Http, RequestOptionsArgs, Response, XHRBackend, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class AuthenticatedHttpService extends Http {
  constructor(
    backend: XHRBackend,
    defaultOptions: RequestOptions
  ) {
    super(backend, defaultOptions);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.get(url, this.getHTTPOption(options)))
      .map(response => this.map(response));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.post(url, body, this.getHTTPOption(options)))
      .map(response => this.map(response));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.put(url, body, this.getHTTPOption(options)))
      .map(response => this.map(response));
  }

  delete(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.delete(url, this.getHTTPOption(options)))
      .map(response => this.map(response));
  }

  patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.patch(url, body, this.getHTTPOption(options)))
      .map(response => this.map(response));
  }

  private getHTTPOption(options: any = {}) {
    if (options.query && Object.keys(options.query).length) {
      options.params = new URLSearchParams();
      for (const key in options.query) options.params.append(key, options.query[key]);
    }
    return Object.assign(options, { withCredentials: true });
  }

  private intercept(observable: Observable<Response>): Observable<Response> {
    return observable.catch(err => {
      if (err.status === 401) {
        localStorage.clear();
        if (window.location.pathname !== '/user/login') window.location.pathname = '/user/login';
      }
      if (err.status === 404) return Observable.empty();
      return Observable.throw(err);
    });
  }

  private map(response: Response) {
    let result;
    try {
      result = response.json();
    } catch (e) {
      result = typeof response === 'object' ? response.text() : response;
    }
    return result;
  }
}
