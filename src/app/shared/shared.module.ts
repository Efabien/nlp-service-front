import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuardService } from './services/guard.service';
import { NavComponent } from './components/nav/nav.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [NavComponent],
  exports: [
    NavComponent,
    MaterialModule
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [GuardService]
})
export class SharedModule { }