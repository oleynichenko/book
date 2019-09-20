import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

import {BookService} from './book.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private bookService: BookService) {}
  activeRequests = 0;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('appInterfaceDisabled')) {

      this.activeRequests++; // For OPTIONS
      this.bookService.startLoading();

      return next.handle(req).pipe(
        finalize(() => {
          this.activeRequests--;

          if (this.activeRequests === 0) {
            this.bookService.stopLoading();
          }
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
