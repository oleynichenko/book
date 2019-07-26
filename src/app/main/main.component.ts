import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {MainService} from './main.service';
import {ActivatedRoute, Params} from '@angular/router';
import {APP_CONFIG} from '../app.config';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  paramSubscription: Subscription;

  constructor(private translate: TranslateService,
              private route: ActivatedRoute,
              private mainService: MainService,
              @Inject(APP_CONFIG) private config) { }

  ngOnInit() {
    const lang = this.route.parent.snapshot.params.lang;

    this.translate.setDefaultLang(this.config.defaultLang);
    this.translate.use(lang);
    this.translate.addLangs(this.config.availableLangs);

    this.paramSubscription = this.route.params.subscribe(
      (params: Params) => {
        if (params.lang !== this.translate.currentLang) {
          this.translate.use(params.lang);
        }
    });
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }
}
