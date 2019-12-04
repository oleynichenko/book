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
import {LanguageMenuService} from './language-menu/language-menu.service';
import {PageComponent} from './page/page.component';
import {LanguageMenuComponent} from './language-menu/language-menu.component';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {SubMenuComponent} from './sub-menu/sub-menu.component';
import {FooterComponent} from './footer/footer.component';
import {TranslateModule} from '@ngx-translate/core';
import { LessonsComponent } from './article/lessons/lessons.component';
import { AuthorsComponent } from './authors/authors.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidenavListComponent,
    BookComponent,
    ArticleComponent,
    ArticleMenuComponent,
    CommentComponent,
    ArticleContentComponent,
    CommentMenuComponent,
    LanguageMenuComponent,
    PageComponent,
    MainMenuComponent,
    FooterComponent,
    SubMenuComponent,
    LessonsComponent,
    AuthorsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    TranslateModule
  ],
  providers: [BookService, CommentService, LanguageMenuService]
})
export class BookModule { }
