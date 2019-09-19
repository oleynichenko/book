import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {AppService} from './app.service';
import {APP_CONFIG} from './app.config';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private route: ActivatedRoute,
              private appService: AppService,
              private translate: TranslateService,
              @Inject(APP_CONFIG) private config) {  }

  ngOnInit() {
    this.translate.setDefaultLang(this.config.defaultLang);

    this.isLoading$ = this.appService.loadingStatus.pipe(
      debounceTime(300)
    );
  }
}
