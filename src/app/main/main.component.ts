import {Component, Inject, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {
  BreakpointObserver,
  BreakpointState
} from '@angular/cdk/layout';

import {APP_BREAKPOINTS, APP_CONFIG} from '../app.config';
import {MainService} from './main.service';
import {map} from 'rxjs/operators';
import {MenuItem} from '../app.model';
import {AppService} from '../app.service';
import {DOCUMENT} from '@angular/common';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  isDesktop$: Observable<boolean>;
  menuItems: MenuItem[];
  appLangs: string[];

  constructor(private translate: TranslateService,
              public appService: AppService,
              private mainService: MainService,
              @Inject(APP_CONFIG) private config,
              private breakpointObserver: BreakpointObserver,
              @Inject(APP_BREAKPOINTS) private breakPoints,
              @Inject(DOCUMENT) private document: Document,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    this.menuItems = this.mainService.menuItems;
    this.appLangs = this.config.availableLangs;

    this.renderer.addClass(document.documentElement, 'overflow-y');

    this.isDesktop$ = this.breakpointObserver
      .observe([this.breakPoints.desktop]).pipe(
        map((state: BreakpointState) => state.matches)
      );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.documentElement, 'overflow-y');
  }
}
