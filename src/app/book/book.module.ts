import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {SidenavListComponent} from './sidenav-list/sidenav-list.component';
import {BookComponent} from './book.component';
import {SharedModule} from '../shared/shared.module';
import {BookService} from './book.service';
import {AppRoutingModule} from '../app-routing.module';
import { ArticleComponent } from './article/article.component';
import { ArticleMenuComponent } from './article/article-menu/article-menu.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidenavListComponent,
    BookComponent,
    ArticleComponent,
    ArticleMenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule
  ],
  providers: [BookService]
})
export class BookModule { }
