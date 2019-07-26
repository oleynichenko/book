import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

import {MaterialModule} from './material.module';
import {LanguageMenuComponent} from './language-menu/language-menu.component';
import {LoadingComponent} from './loading/loading.component';
import {FooterComponent} from './footer/footer.component';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [
    LanguageMenuComponent,
    LoadingComponent,
    FooterComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule
  ],
  exports: [
    MaterialModule,
    TranslateModule,
    LanguageMenuComponent,
    LoadingComponent,
    FooterComponent,
    ContentComponent
  ]
})
export class SharedModule { }
