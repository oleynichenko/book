import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookComponent} from './book/book.component';
import {ArticleComponent} from './book/article/article.component';
import {AppConfig} from './app.config';
import {MainComponent} from './main/main.component';
import {PageComponent} from './shared/page/page.component';
import {AppComponent} from './app.component';
import {LibraryComponent} from './main/library/library.component';
import {BookResolver} from './book/book.resolver';
import {PageResolver} from './shared/page/page.resolver';
import {LibraryResolver} from './main/library/library.resolver';

const routes: Routes = [
  {path: '', redirectTo: `${AppConfig.defaultLang}`, pathMatch: 'full'},

  {path: ':lang', component: AppComponent, children: [
    {path: '', resolve: {books: LibraryResolver}, component: MainComponent, children: [
      {path: '', component: LibraryComponent},
      {path: 'about', resolve: {content: PageResolver}, component: PageComponent},
      {path: 'authors', resolve: {content: PageResolver}, component: PageComponent}
    ]},

    {path: ':book', resolve: {interfaceLangs: BookResolver}, component: BookComponent, children: [
      {path: '', redirectTo: 'about-book', pathMatch: 'full'},
      {path: 'article/:id', component: ArticleComponent},
      {path: ':page', resolve: {content: PageResolver}, component: PageComponent}
    ]}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [BookResolver, PageResolver, LibraryResolver],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
