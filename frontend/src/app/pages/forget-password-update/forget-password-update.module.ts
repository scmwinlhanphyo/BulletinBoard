import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialImportsModule } from 'src/app/angular-material-imports.module';

import { ForgetPasswordUpdateRoutingModule } from './forget-password-update-routing.module';
import { ForgetPasswordUpdateComponent } from './forget-password-update.component';

@NgModule({
  declarations: [ ForgetPasswordUpdateComponent ],
  imports: [
    CommonModule,
    ForgetPasswordUpdateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialImportsModule
  ]
})
export class ForgetPasswordUpdateModule { }
