import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialImportsModule } from 'src/app/angular-material-imports.module';

import { PostDetailDialogRoutingModule } from './post-detail-dialog-routing.module';
import { PostDetailDialogComponent } from './post-detail-dialog.component';

@NgModule({
  declarations: [ PostDetailDialogComponent ],
  imports: [
    CommonModule,
    PostDetailDialogRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialImportsModule
  ]
})
export class PostDetailDialogModule { }
