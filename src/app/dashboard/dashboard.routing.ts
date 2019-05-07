import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuardService } from '../shared/services/guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
const appRoutes: Routes = [
  {
    path: 'dashboard',
    canActivate: [GuardService],
    children: [
      { path: '', component: DashboardComponent }
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
export class DashboardRouting { }
