import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AppService} from '../app.service';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private appService: AppService) {}
  activeRequests = 0;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('appInterfaceDisabled')) {

      this.activeRequests++; // For OPTIONS
      this.appService.startLoading();

      return next.handle(req).pipe(
        finalize(() => {
          this.activeRequests--;

          if (this.activeRequests === 0) {
            this.appService.stopLoading();
          }
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
