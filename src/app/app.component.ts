import {Component, Inject, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Params, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {AppService} from './app.service';
import {DOCUMENT} from '@angular/common';
import {APP_CONFIG} from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading;
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private appService: AppService,
              private translate: TranslateService,
              private router: Router,
              @Inject(DOCUMENT) document,
              @Inject(APP_CONFIG) private config,
              private r: Renderer2) {  }

  ngOnInit() {
    const lang = this.route.snapshot.params.lang;
    this.appService.setDirection(lang);

    this.translate.setDefaultLang(this.config.defaultLang);
    this.translate.use(lang);

    this.paramsSubscription = this.route.params
      .subscribe((params: Params) => {
        this.translate.use(params.lang);
        this.appService.setDirection(params.lang);
        this.changeTypography(params.lang);
      });

    this.router.events.subscribe((value: any) => {
      this.checkRouterEvent(value);
    });
  }

  private checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.isLoading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
        this.isLoading = false;
    }
  }

  private changeTypography(lang) {
    if (lang === 'he') {
      this.r.addClass(document.body, 'he-theme');
    } else {
      this.r.removeClass(document.body, 'he-theme');
    }
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
