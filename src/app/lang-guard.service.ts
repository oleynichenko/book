import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {map} from 'rxjs/operators';

import {ErrorData, RoutesNames, ServerError} from './app.model';
import {BookService} from './book/book.service';

@Injectable()
export class LangGuardService implements CanActivate {

  constructor(private router: Router,
              private bookService: BookService) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
    const lang = route.params.lang;
    const bookId = this.bookService.getSubdomainName();

    return this.bookService.getBookLangs(bookId).pipe(
      map((langs: any[]) => {
        if (langs.includes(lang)) {
          this.bookService.bookId = bookId;

          return true;
        } else {
          const serverError = new ServerError(`We do not have translations on '${lang}' language`);
          const errorData = new ErrorData(serverError, 404, 'Not Found');

          this.router.navigate(
            [RoutesNames.ERROR],
            {
              state: errorData
            }
          );

          return false;
        }
      })
    );
  }
}
