import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Router} from '@angular/router';

import {ErrorData, RoutesNames, ServerError} from './app.model';


@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(1),
      catchError((error: any) => {
        if (error.status === 404) {
          const errorData = new ErrorData(error.error, error.status, error.statusText);

          this.router.navigate(
            [RoutesNames.ERROR],
            {
              state: errorData
            }
          );
        } else if (error.status === 0) {
          const serverError = new ServerError('Server is Unavailable');
          const errorData = new ErrorData(serverError, error.status, error.statusText);

          this.router.navigate(
            [RoutesNames.ERROR],
            {
              state: errorData
            }
          );
        } else {
          throwError(error);
        }

        return of(error);
      })
    );
  }
}
