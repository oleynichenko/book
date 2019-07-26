import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookComponent} from './book/book.component';
import {ArticleComponent} from './book/article/article.component';
import {AppConfig} from './app.config';
import {MainComponent} from './main/main.component';
import {ContentComponent} from './shared/content/content.component';
import {AppComponent} from './app.component';
import {LibraryComponent} from './main/library/library.component';


const routes: Routes = [
  {path: '', redirectTo: `${AppConfig.defaultLang}`, pathMatch: 'full'},

  {path: ':lang', component: AppComponent, children: [
    {path: '', component: MainComponent, children: [
      {path: '', component: LibraryComponent},
      {path: 'about', component: ContentComponent},
      {path: 'authors', component: ContentComponent},
    ]},

    {path: ':book', component: BookComponent, children: [
      {path: '', component: ArticleComponent},
      {path: ':article', component: ArticleComponent},
    ]}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
