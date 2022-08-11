import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialImportsModule } from 'src/app/angular-material-imports.module';
import { AllownumbersonlydirectiveModule } from 'src/app/allownumbersonlydirective.module';

import { UserCreateRoutingModule } from './user-create-routing.module';
import { UserCreateComponent } from './user-create.component';

@NgModule({
  declarations: [ UserCreateComponent ],
  imports: [
    CommonModule,
    UserCreateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialImportsModule,
    AllownumbersonlydirectiveModule
  ]
})
export class UserCreateModule { }
