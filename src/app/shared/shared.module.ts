import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';

import {MaterialModule} from './material.module';
import {LanguageMenuComponent} from '../book/language-menu/language-menu.component';
import {LoadingComponent} from './loading/loading.component';
import {FooterComponent} from '../book/footer/footer.component';
import { PageComponent } from '../book/page/page.component';
import { SimpleBarDirective } from './simple-bar.directive';
import { SubMenuComponent } from '../book/sub-menu/sub-menu.component';
import { MainMenuComponent } from '../book/main-menu/main-menu.component';


@NgModule({
  declarations: [
    LanguageMenuComponent,
    LoadingComponent,
    FooterComponent,
    PageComponent,
    SimpleBarDirective,
    SubMenuComponent,
    MainMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    TranslateModule
  ],
  exports: [
    MaterialModule,
    TranslateModule,
    LanguageMenuComponent,
    LoadingComponent,
    FooterComponent,
    SimpleBarDirective,
    SubMenuComponent,
    MainMenuComponent
  ]
})
export class SharedModule { }
