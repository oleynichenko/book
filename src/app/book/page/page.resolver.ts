import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {APP_CONFIG} from '../../app.config';

@Injectable()
export class PageResolver implements Resolve<any> {
  constructor(private http: HttpClient,
              @Inject(APP_CONFIG) private config) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {
    const bookId = this.config.book;
    const langId = route.parent.params.lang;
    const pageId = route.params.page;

    const url = `${this.config.apiEndpoint}/page/${bookId}/${pageId}/${langId}`;

    const options = {
      headers: {appInterfaceDisabled: 'true'}
    };

    return this.http.get(url, options).pipe(
      map((data: any) => data.content)
    );
  }
}
