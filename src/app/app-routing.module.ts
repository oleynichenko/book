import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ArticleComponent} from './book/article/article.component';
import {AppConfig} from './app.config';
import {PageComponent} from './book/page/page.component';
import {BookResolver} from './book/book.resolver';
import {PageResolver} from './book/page/page.resolver';
import {LangGuardService} from './lang-guard.service';
import {RoutesNames} from './app.model';
import {ErrorComponent} from './error/error.component';
import {BookComponent} from './book/book.component';
import {AuthorsComponent} from './book/authors/authors.component';
import {AuthorsResolver} from './book/authors/authors.resolver';

const routes: Routes = [
  {path: '', redirectTo: `${AppConfig.defaultLang}`, pathMatch: 'full'},
  {path: RoutesNames.ERROR, component: ErrorComponent},

  {path: ':lang',
    component: BookComponent,
    canActivate: [LangGuardService],
    resolve: {library: BookResolver},
    children: [
      {
        path: '',
        redirectTo: `${RoutesNames.ABOUT}`,
        pathMatch: 'full'
      },
      {path: `${RoutesNames.ARTICLE}/:id`,
        component: ArticleComponent
      },
      {path: `${RoutesNames.AUTHORS}`,
        resolve: {content: AuthorsResolver},
        component: AuthorsComponent
      },
      {path: ':page',
        resolve: {content: PageResolver},
        component: PageComponent
      }
    ]},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  providers: [
    LangGuardService,
    BookResolver,
    PageResolver,
    AuthorsResolver
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
