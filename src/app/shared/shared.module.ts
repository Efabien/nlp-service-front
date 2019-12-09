import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GuardService } from './services/guard.service';

import { ErrorService } from './services/error.service';
import { RessourcesService } from './services/ressources.service';
import { NotificationService } from './services/notification.service';
import { ComponentService } from './services/component.service';
import { AppService } from './services/app.service';

import { NavComponent } from './components/nav/nav.component';
import { RessourcesListComponent } from './components/ressources-list/ressources-list.component';
import { MaterialModule } from './material.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IntentComponent } from './components/intent/intent.component';
import { CreateIntentComponent } from './components/intent/create-intent/create-intent.component';
import { KeywordComponent } from './components/keyword/keyword.component';
import { NewComponent } from './components/new/new.component';
import { NewKeywordComponent } from './components/new-keyword/new-keyword.component';
import { TestComponent } from './components/test/test.component';
import { AppListComponent } from './components/app-list/app-list.component';
import { CreateAppComponent } from './components/app-list/create-app/create-app.component';

@NgModule({
  declarations: [
    NavComponent,
    RessourcesListComponent,
    IntentComponent,
    CreateIntentComponent,
    KeywordComponent,
    NewComponent,
    NewKeywordComponent,
    TestComponent,
    AppListComponent,
    CreateAppComponent,
  ],
  exports: [
    NavComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    IntentComponent,
    KeywordComponent,
    CreateIntentComponent,
    NewComponent,
    NewKeywordComponent,
    TestComponent,
    AppListComponent,
    CreateAppComponent,
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
    ComponentService,
    AppService,
  ],
  entryComponents: [
    CreateAppComponent
  ],
})
export class SharedModule { }