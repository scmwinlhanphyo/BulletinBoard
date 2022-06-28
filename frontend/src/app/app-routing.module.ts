import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { PostListComponent } from './pages/post-list/post-list.component';
import { UploadPostComponent } from './pages/upload-post/upload-post.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { PostCreateComponent } from './pages/post-create/post-create.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'post-list', component: PostListComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'upload-csv-post', component: UploadPostComponent },
  { path: 'post-create', component: PostCreateComponent },
  { path: 'user-create', component: UserCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
