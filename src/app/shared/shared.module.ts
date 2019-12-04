import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MaterialModule} from './material.module';
import { SimpleBarDirective } from './simple-bar.directive';
import {LoadingComponent} from './loading/loading.component';

@NgModule({
  declarations: [
    LoadingComponent,
    SimpleBarDirective
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    LoadingComponent,
    SimpleBarDirective,
  ]
})
export class SharedModule { }
