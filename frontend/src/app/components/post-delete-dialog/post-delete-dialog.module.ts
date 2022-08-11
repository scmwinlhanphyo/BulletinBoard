import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialImportsModule } from 'src/app/angular-material-imports.module';

import { PostDeleteDialogRoutingModule } from './post-delete-dialog-routing.module';
import { PostDeleteDialogComponent } from './post-delete-dialog.component';

@NgModule({
  declarations: [ PostDeleteDialogComponent ],
  imports: [
    CommonModule,
    PostDeleteDialogRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialImportsModule
  ]
})
export class PostDeleteDialogModule { }
