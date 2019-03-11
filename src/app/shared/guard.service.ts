import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class GuardService implements CanActivate  {

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return true;
  }
  
}
