import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

import {MaterialModule} from './material.module';
import {LanguageMenuComponent} from './language-menu/language-menu.component';
import {LoadingComponent} from './loading/loading.component';
import {FooterComponent} from './footer/footer.component';
import { PageComponent } from './page/page.component';
import { SimpleBarDirective } from './simple-bar.directive';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    LanguageMenuComponent,
    LoadingComponent,
    FooterComponent,
    PageComponent,
    SimpleBarDirective,
    SubMenuComponent,
    MainMenuComponent,
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
