import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialImportsModule } from 'src/app/angular-material-imports.module';

import { UserDetailDialogRoutingModule } from './user-detail-dialog-routing.module';
import { UserDetailDialogComponent } from './user-detail-dialog.component';

@NgModule({
  declarations: [ UserDetailDialogComponent ],
  imports: [
    CommonModule,
    UserDetailDialogRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialImportsModule
  ]
})
export class UserDetailDialogModule { }
