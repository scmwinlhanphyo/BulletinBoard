import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordUpdateComponent } from './forget-password-update.component';

const routes: Routes = [
  {
    path: '',
    component: ForgetPasswordUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgetPasswordUpdateRoutingModule { }
