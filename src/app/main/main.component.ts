import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {
  BreakpointObserver,
  BreakpointState
} from '@angular/cdk/layout';

import {APP_BREAKPOINTS, APP_CONFIG} from '../app.config';
import {MainService} from './main.service';
import {map} from 'rxjs/operators';
import {MenuItem} from '../app.model';
import {AppService} from '../app.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isDesktop$: Observable<boolean>;
  menuItems: MenuItem[];
  appLangs: string[];

  constructor(private translate: TranslateService,
              private route: ActivatedRoute,
              public appService: AppService,
              private mainService: MainService,
              @Inject(APP_CONFIG) private config,
              private breakpointObserver: BreakpointObserver,
              @Inject(APP_BREAKPOINTS) private breakPoints) {
  }

  ngOnInit() {
    this.menuItems = this.mainService.menuItems;
    this.appLangs = this.config.availableLangs;

    this.isDesktop$ = this.breakpointObserver
      .observe([this.breakPoints.desktop]).pipe(
        map((state: BreakpointState) => state.matches)
      );
  }
}
