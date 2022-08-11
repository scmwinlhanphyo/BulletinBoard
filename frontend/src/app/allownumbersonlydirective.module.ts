import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllownumbersonlyDirective } from './allownumbersonly.directive';
import { AngularMaterialImportsModule } from './angular-material-imports.module';

@NgModule({
  declarations: [ AllownumbersonlyDirective ],
  imports: [
    CommonModule,
    AngularMaterialImportsModule
  ],
  exports: [
    AllownumbersonlyDirective
  ]
})
export class AllownumbersonlydirectiveModule { }
