import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialImportsModule } from 'src/app/angular-material-imports.module';

import { ProfileEditRoutingModule } from './profile-edit-routing.module';
import { ProfileEditComponent } from './profile-edit.component';
import { AllownumbersonlyDirective } from 'src/app/allownumbersonly.directive';

@NgModule({
  declarations: [ ProfileEditComponent, AllownumbersonlyDirective ],
  imports: [
    CommonModule,
    ProfileEditRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialImportsModule
  ]
})
export class ProfileEditModule { }
