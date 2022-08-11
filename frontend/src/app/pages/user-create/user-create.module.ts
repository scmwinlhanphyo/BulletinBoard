import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialImportsModule } from 'src/app/angular-material-imports.module';

import { UserCreateRoutingModule } from './user-create-routing.module';
import { UserCreateComponent } from './user-create.component';
import { AllownumbersonlyDirective } from 'src/app/allownumbersonly.directive';

@NgModule({
  declarations: [ UserCreateComponent, AllownumbersonlyDirective ],
  imports: [
    CommonModule,
    UserCreateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialImportsModule
  ]
})
export class UserCreateModule { }
