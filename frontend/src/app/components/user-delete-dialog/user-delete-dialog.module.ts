import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialImportsModule } from 'src/app/angular-material-imports.module';

import { UserDeleteDialogRoutingModule } from './user-delete-dialog-routing.module';
import { UserDeleteDialogComponent } from './user-delete-dialog.component';

@NgModule({
  declarations: [ UserDeleteDialogComponent ],
  imports: [
    CommonModule,
    UserDeleteDialogRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialImportsModule
  ]
})
export class UserDeleteDialogModule { }
