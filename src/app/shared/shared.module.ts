import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GuardService } from './services/guard.service';

import { ErrorService } from './services/error.service';
import { RessourcesService } from './services/ressources.service';

import { NavComponent } from './components/nav/nav.component';
import { MaterialModule } from './material.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [NavComponent],
  exports: [
    NavComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    GuardService,
    RessourcesService,
    ErrorService
  ]
})
export class SharedModule { }