import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from './material.module';
import {LanguageMenuComponent} from './language-menu/language-menu.component';
import {LoadingComponent} from './loading/loading.component';

@NgModule({
  declarations: [
    LanguageMenuComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    LanguageMenuComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
