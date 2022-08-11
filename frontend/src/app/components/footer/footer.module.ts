import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialImportsModule } from 'src/app/angular-material-imports.module';

import { FooterRoutingModule } from './footer-routing.module';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [ FooterComponent ],
  imports: [
    CommonModule,
    FooterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialImportsModule
  ]
})
export class FooterModule { }
