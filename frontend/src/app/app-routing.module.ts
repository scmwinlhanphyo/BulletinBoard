import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { PostListComponent } from './pages/post-list/post-list.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { PostCreateComponent } from './pages/post-create/post-create.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'post-list', component: PostListComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'post-create', component: PostCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
