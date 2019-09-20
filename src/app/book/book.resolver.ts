import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {BookService} from './book.service';
import {switchMap} from 'rxjs/operators';
import {LanguageMenuService} from './language-menu/language-menu.service';

@Injectable()
export class BookResolver implements Resolve<any> {
  constructor(private bookService: BookService,
              private languageMenuService: LanguageMenuService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {
    const lang = route.params.lang;

    return this.bookService.getBookData(lang).pipe(
      switchMap((value: any) => {
        return this.languageMenuService.getLangMenu(lang, value.langs);
      })
    );
  }
}
