import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthenticatedHttpService } from './services/authenticated-http.service';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthenticationService,
    { provide: HttpClient, useClass: AuthenticatedHttpService }
  ]
})
export class CoreModule { }
