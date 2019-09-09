import {Inject, Injectable} from '@angular/core';
import {BookService} from './book.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {APP_CONFIG} from '../app.config';
import {AppService} from '../app.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class BookResolver implements Resolve<any> {
  constructor(private bookService: BookService,
              private translate: TranslateService,
              private appService: AppService,
              @Inject(APP_CONFIG) private config) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {
    const requiredInterfaceLang = route.parent.params.lang;
    const bookId = route.params.book;

    return this.bookService.getInterfaceLangs(bookId).pipe(
      switchMap((langs: any[]) => {
        let interfaceLang;

        if (langs.includes(requiredInterfaceLang)) {
          interfaceLang = requiredInterfaceLang;
        } else if (langs.includes(this.config.defaultLang)) {
          interfaceLang = this.config.defaultLang;
        } else {
          interfaceLang = langs[0];
        }

        return this.bookService.getInterfaceData(interfaceLang, bookId)
          .pipe(tap(() => {
            if (interfaceLang !== this.translate.currentLang) {
              this.appService.changeLanguageInUrl(interfaceLang);
            }
          }));
      })
    );
  }
}
