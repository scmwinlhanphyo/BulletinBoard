import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialImportsModule } from 'src/app/angular-material-imports.module';

import { PasswordChangeRoutingModule } from './password-change-routing.module';
import { PasswordChangeComponent } from './password-change.component';

@NgModule({
  declarations: [ PasswordChangeComponent ],
  imports: [
    CommonModule,
    PasswordChangeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialImportsModule
  ]
})
export class PasswordChangeModule { }
