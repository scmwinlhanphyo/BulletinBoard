import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { LoginComponent } from './pages/login/login.component';
import { PostListComponent } from './pages/post-list/post-list.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AngularMaterialImportsModule } from './angular-material-imports.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListComponent } from './pages/user-list/user-list.component';
import { PostDeleteDialogComponent } from './components/post-delete-dialog/post-delete-dialog.component';
import { PostDetailDialogComponent } from './components/post-detail-dialog/post-detail-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetailDialogComponent } from './components/user-detail-dialog/user-detail-dialog.component';
import { UserDeleteDialogComponent } from './components/user-delete-dialog/user-delete-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { ListsComponent } from './components/lists/lists.component';
@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    UserListComponent,
    ListsComponent,
    HeaderComponent,
    FooterComponent,
    PostDeleteDialogComponent,
    PostDetailDialogComponent,
    UserDeleteDialogComponent,
    UserDetailDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialImportsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
