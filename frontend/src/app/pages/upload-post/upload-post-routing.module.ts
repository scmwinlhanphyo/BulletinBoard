import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadPostComponent } from './upload-post.component';

const routes: Routes = [
  {
    path: '',
    component: UploadPostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadPostRoutingModule { }
