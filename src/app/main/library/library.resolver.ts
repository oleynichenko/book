import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {Observable} from 'rxjs';
import {MainService} from '../main.service';

@Injectable()
export class LibraryResolver implements Resolve<any> {
  constructor(private mainService: MainService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {
    const lang = route.parent.params.lang;
    return this.mainService.getLibrary(lang);
  }
}
