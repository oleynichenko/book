import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

import {BookService} from './book.service';
import {LanguageMenuService} from './language-menu/language-menu.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class BookResolver implements Resolve<any> {
  constructor(private bookService: BookService,
              private translate: TranslateService,
              private languageMenuService: LanguageMenuService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {
    const lang = route.params.lang;

    return this.bookService.getBookData(lang).pipe(
      tap((value: any) => this.translate.use(value.langId)),
      switchMap((value: any) => {
        return this.languageMenuService.getLangMenu(lang, value.langs);
      })
    );
  }
}
