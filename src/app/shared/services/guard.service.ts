import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../core/services/authentication.service';

@Injectable()
export class GuardService implements CanActivate  {
  constructor(
    private authenticationService: AuthenticationService
  ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.authenticationService.verifyToken();
  }
  
}
