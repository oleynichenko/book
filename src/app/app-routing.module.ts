import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookComponent} from './book/book.component';
import {ArticleComponent} from './book/article/article.component';

const routes: Routes = [
  {path: '', redirectTo: '/ru/pticha', pathMatch: 'full'},
  {path: ':lang/:book', component: BookComponent, children: [
    {path: '', component: ArticleComponent},
    {path: ':article', component: ArticleComponent},
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
