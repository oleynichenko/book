import {Injectable} from '@angular/core';
import {BookService} from './book.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable()
export class BookResolver implements Resolve<any> {
  constructor(private bookService: BookService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {
    const interfaceLang = route.parent.params.lang;
    const bookId = route.params.book;

    return this.bookService.getInterfaceData(interfaceLang, bookId);
  }
}
