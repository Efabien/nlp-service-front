import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './page/login/login.component';
const appRoutes: Routes = [
  {
    path: 'login',
    children: [
      { path: '', component: LoginComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRouting { }
