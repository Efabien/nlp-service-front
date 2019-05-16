import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material'

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  messageMap: any =  {
    401: 'Wrong password'
  };

  constructor(
    private snackBar: MatSnackBar
  ) { }

  show(e) {
    const errMessage = this.getMessage(e);
    this.snackBar.open(errMessage, null, { duration: 30000 });
  }

  private getMessage(e) {
    console.log(e);
    return (e.error && e.error.message) || e.message || e.errMessage ||
      this.messageMap[e.status] ||
      e._body && JSON.parse(e._body).message ||
      'Somthing went wrong';
  }
}
