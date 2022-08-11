import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialImportsModule } from 'src/app/angular-material-imports.module';

import { PostFormRoutingModule } from './post-form-routing.module';
import { PostFormComponent } from './post-form.component';

@NgModule({
  declarations: [ PostFormComponent ],
  imports: [
    CommonModule,
    PostFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialImportsModule
  ]
})
export class PostFormModule { }
