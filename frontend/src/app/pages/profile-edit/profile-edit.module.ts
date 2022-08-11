import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialImportsModule } from 'src/app/angular-material-imports.module';
import { AllownumbersonlydirectiveModule } from 'src/app/allownumbersonlydirective.module';

import { ProfileEditRoutingModule } from './profile-edit-routing.module';
import { ProfileEditComponent } from './profile-edit.component';

@NgModule({
  declarations: [ ProfileEditComponent ],
  imports: [
    CommonModule,
    ProfileEditRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialImportsModule,
    AllownumbersonlydirectiveModule
  ]
})
export class ProfileEditModule { }
