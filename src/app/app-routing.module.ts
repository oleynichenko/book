import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  // {path: '', component: PhrasesComponent,  resolve: {phrases: PhrasesResolver}},
  // {path: 'dictionary', component: DictionaryComponent},
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
