import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './pages/post-list/post-list.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { AuthGuard } from './guards/auth.guard';
import { ListsComponent } from './components/lists/lists.component';

// Post Resolver
import { PostResolver } from './resolver/post.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'lists',
    component: ListsComponent
  },
  { path: 'post-list',
    component: PostListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'upload-csv-post',
    loadChildren: () => import('./pages/upload-post/upload-post.module').then(m => m.UploadPostModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'post-create',
    loadChildren: () => import('./pages/post-form/post-form.module').then(m => m.PostFormModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'update-post/:id',
    loadChildren: () => import('./pages/post-form/post-form.module').then(m => m.PostFormModule),
    canActivate: [AuthGuard],
    resolve: {post: PostResolver}
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/create-account/create-account.module').then(m => m.CreateAccountModule)
  },
  {
    path: 'forget-password-update/:userId/:token',
    loadChildren: () => import('./pages/forget-password-update/forget-password-update.module').then(m => m.ForgetPasswordUpdateModule)
  },
  {
    path: 'user-create',
    loadChildren: () => import('./pages/user-create/user-create.module').then(m => m.UserCreateModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'password-change/:id',
    loadChildren: () => import('./pages/password-change/password-change.module').then(m => m.PasswordChangeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./pages/forget-password/forget-password.module').then(m => m.ForgetPasswordModule)
  },
  {
    path: 'profile-edit/:id',
    loadChildren: () => import('./pages/profile-edit/profile-edit.module').then(m => m.ProfileEditModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
