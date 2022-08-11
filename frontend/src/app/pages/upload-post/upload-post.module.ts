import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialImportsModule } from 'src/app/angular-material-imports.module';

import { UploadPostRoutingModule } from './upload-post-routing.module';
import { UploadPostComponent } from './upload-post.component';

@NgModule({
  declarations: [ UploadPostComponent ],
  imports: [
    CommonModule,
    UploadPostRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialImportsModule
  ]
})
export class UploadPostModule { }
