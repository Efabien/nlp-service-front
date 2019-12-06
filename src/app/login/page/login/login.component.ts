import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { ErrorService } from '../../../shared/services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  data: any = {};
  emailControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
    pswdControl = new FormControl('', [Validators.required]);
  processing: boolean;

  constructor(
    private loginService: LoginService,
    private authService: AuthenticationService,
    private errorSerivce: ErrorService,
    private router: Router
  ) { }

  async submit() {
    if (this.processing) return;
    try {
      this.processing = true;
      const resp: any = await this.loginService.authenticate(this.data);
      this.authService.setUserInfo(
        {
          token: resp.token,
          email: resp.user.email
        }
      );
      this.router.navigate(['/dashboard']);
    } catch (e) {
      this.errorSerivce.show(e);
    } finally {
      this.processing = false;
    }
  }

}
