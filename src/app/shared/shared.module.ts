import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GuardService } from './services/guard.service';

import { ErrorService } from './services/error.service';
import { RessourcesService } from './services/ressources.service';
import { NotificationService } from './services/notification.service';

import { NavComponent } from './components/nav/nav.component';
import { RessourcesListComponent } from './components/ressources-list/ressources-list.component';
import { MaterialModule } from './material.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IntentComponent } from './components/intent/intent.component';

@NgModule({
  declarations: [
    NavComponent,
    RessourcesListComponent,
    IntentComponent
  ],
  exports: [
    NavComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    IntentComponent,
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
    ErrorService,
    NotificationService,
  ]
})
export class SharedModule { }