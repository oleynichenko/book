import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {APP_CONFIG} from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class LangGuardService implements CanActivate {

  constructor(@Inject(APP_CONFIG) private config,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
    if (this.config.availableLangs.includes(route.params.lang)) {
      return true;
    } else {
      this.router.navigate(['not-found']);
      return false;
    }
  }
}
