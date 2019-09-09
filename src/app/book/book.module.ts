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
import { CommentComponent } from './article/comment/comment.component';
import {ArticleContentComponent} from './article/article-content/article-content.component';
import { CommentMenuComponent } from './article/comment-menu/comment-menu.component';
import {CommentService} from './article/comment.service';


@NgModule({
  declarations: [
    HeaderComponent,
    SidenavListComponent,
    BookComponent,
    ArticleComponent,
    ArticleMenuComponent,
    CommentComponent,
    ArticleContentComponent,
    CommentMenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule
  ],
  providers: [BookService, CommentService]
})
export class BookModule { }
