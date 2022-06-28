import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { PostListComponent } from './pages/post-list/post-list.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AngularMaterialImportsModule } from './angular-material-imports.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListComponent } from './pages/user-list/user-list.component';
import { PostDeleteDialogComponent } from './components/post-delete-dialog/post-delete-dialog.component';
import { PostDetailDialogComponent } from './components/post-detail-dialog/post-detail-dialog.component';
import { UploadPostComponent } from './pages/upload-post/upload-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetailDialogComponent } from './components/user-detail-dialog/user-detail-dialog.component';
import { PostFormComponent } from './pages/post-form/post-form.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { ForgetPasswordUpdateComponent } from './pages/forget-password-update/forget-password-update.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { PasswordChangeComponent } from './pages/password-change/password-change.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PostListComponent,
    HeaderComponent,
    FooterComponent,
    UserListComponent,
    PostDeleteDialogComponent,
    PostDetailDialogComponent,
    UploadPostComponent,
    UserDetailDialogComponent,
    PostFormComponent,
    CreateAccountComponent,
    ForgetPasswordUpdateComponent,
    UserCreateComponent,
    PasswordChangeComponent,
    ForgetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialImportsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
