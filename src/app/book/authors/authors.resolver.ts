import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';

import {BookService} from '../book.service';

@Injectable()
export class AuthorsResolver implements Resolve<any> {
  constructor(private bookService: BookService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {
    const langId = route.parent.params.lang;

    return forkJoin([
      this.bookService.getPage('authors', langId),
      this.bookService.getAuthors(langId)
    ]);
  }
}
