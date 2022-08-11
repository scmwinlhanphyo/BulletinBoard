import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialImportsModule } from 'src/app/angular-material-imports.module';

import { PostListRoutingModule } from './post-list-routing.module';
import { PostListComponent } from './post-list.component';
import { ListsModule } from 'src/app/components/lists/lists.module';
// import { PostDeleteDialogModule } from './components/post-delete-dialog/post-delete-dialog.module';
// import { PostDetailDialogModule } from './components/post-detail-dialog/post-detail-dialog.module';

import { PostDeleteDialogModule } from 'src/app/components/post-delete-dialog/post-delete-dialog.module';
import { PostDetailDialogModule } from 'src/app/components/post-detail-dialog/post-detail-dialog.module';

@NgModule({
  declarations: [ PostListComponent ],
  imports: [
    CommonModule,
    PostListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ListsModule,
    AngularMaterialImportsModule,
    PostDetailDialogModule,
    PostDeleteDialogModule
  ]
})
export class PostListModule { }
