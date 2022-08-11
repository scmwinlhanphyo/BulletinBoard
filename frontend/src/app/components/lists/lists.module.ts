import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialImportsModule } from 'src/app/angular-material-imports.module';
import { ListsRoutingModule } from './lists-routing.module';
import { ListsComponent } from './lists.component';

@NgModule({
  declarations: [ ListsComponent ],
  imports: [
    CommonModule,
    ListsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialImportsModule,
  ],
  exports: [ ListsComponent ]
})
export class ListsModule { }
