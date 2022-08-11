import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialImportsModule } from 'src/app/angular-material-imports.module';

import { UserListRoutingModule } from './user-list-routing.module';
import { UserListComponent } from './user-list.component';
import { ListsModule } from 'src/app/components/lists/lists.module';
import { UserDetailDialogModule } from 'src/app/components/user-detail-dialog/user-detail-dialog.module';
import { UserDeleteDialogModule } from 'src/app/components/user-delete-dialog/user-delete-dialog.module';

@NgModule({
  declarations: [ UserListComponent ],
  imports: [
    CommonModule,
    UserListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialImportsModule,
    ListsModule,
    UserDeleteDialogModule,
    UserDetailDialogModule
  ]
})
export class UserListModule { }
