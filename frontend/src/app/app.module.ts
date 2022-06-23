import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { PostListComponent } from './pages/post-list/post-list.component';
import { PostCreateComponent } from './pages/post-create/post-create.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AngularMaterialImportsModule } from './angular-material-imports.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListComponent } from './pages/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PostListComponent,
    PostCreateComponent,
    HeaderComponent,
    FooterComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialImportsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
