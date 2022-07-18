import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { PostListComponent } from './pages/post-list/post-list.component';
import { UploadPostComponent } from './pages/upload-post/upload-post.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { PostFormComponent } from './pages/post-form/post-form.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { ForgetPasswordUpdateComponent } from './pages/forget-password-update/forget-password-update.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { PasswordChangeComponent } from './pages/password-change/password-change.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'post-list', component: PostListComponent, canActivate: [AuthGuard] },
  { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'upload-csv-post', component: UploadPostComponent, canActivate: [AuthGuard] },
  { path: 'post-create', component: PostFormComponent, canActivate: [AuthGuard] },
  { path: 'update-post/:id', component: PostFormComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: CreateAccountComponent },
  { path: 'forget-password-update/:userId/:token', component: ForgetPasswordUpdateComponent },
  { path: 'user-create', component: UserCreateComponent, canActivate: [AuthGuard] },
  { path: 'password-change', component: PasswordChangeComponent, canActivate: [AuthGuard] },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'profile-edit/:id', component: ProfileEditComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
