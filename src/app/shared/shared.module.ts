import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MaterialModule} from './material.module';
import { SimpleBarDirective } from './simple-bar.directive';
import {LoadingComponent} from './loading/loading.component';
import { SafeHtmlPipe } from './safe-html.pipe';

@NgModule({
  declarations: [
    LoadingComponent,
    SimpleBarDirective,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    LoadingComponent,
    SimpleBarDirective,
    SafeHtmlPipe
  ]
})
export class SharedModule { }
