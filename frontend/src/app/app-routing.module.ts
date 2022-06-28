import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { PostListComponent } from './pages/post-list/post-list.component';
import { UploadPostComponent } from './pages/upload-post/upload-post.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { PostCreateComponent } from './pages/post-create/post-create.component';
import { PasswordChangeComponent } from './pages/password-change/password-change.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'post-list', component: PostListComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'upload-csv-post', component: UploadPostComponent },
  { path: 'post-create', component: PostCreateComponent },
  { path: 'password-change', component: PasswordChangeComponent },
  { path: 'forget-password', component: ForgetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
