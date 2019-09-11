import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {API_ENDPOINT} from '../../app.config';

@Injectable()
export class PageResolver implements Resolve<any> {
  constructor(private http: HttpClient,
              @Inject(API_ENDPOINT) private apiEndpoint) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {
    const bookId = route.parent.params.book;
    const langId = route.parent.parent.params.lang;

    let url = `${this.apiEndpoint}/page/${langId}/`;
    if (bookId) {
      const pageId = route.params.page;
      url += `${pageId}/${bookId}`;
    } else {
      const pageId = route.routeConfig.path;
      url += `${pageId}`;
    }

    const options = {
      headers: {appInterfaceDisabled: 'true'}
    };

    return this.http.get(url, options).pipe(
      map((data: any) => data.content)
    );
  }
}
