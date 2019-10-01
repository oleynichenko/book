import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {BookService} from '../book.service';

@Injectable()
export class PageResolver implements Resolve<any> {
  constructor(private bookService: BookService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {
    const langId = route.parent.params.lang;
    const pageId = route.params.page;

    return this.bookService.getPage(pageId, langId);
  }
}
