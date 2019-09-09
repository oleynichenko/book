import {AfterContentInit, Component, Inject, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {API_ENDPOINT} from '../../app.config';
import {HttpClient} from '@angular/common/http';
import {MatMenu} from '@angular/material';
import {Direction, Directionality} from '@angular/cdk/bidi';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-language-menu',
  templateUrl: './language-menu.component.html',
  styleUrls: ['./language-menu.component.scss']
})
export class LanguageMenuComponent implements OnInit, OnDestroy {
  @Input() private langs: string[];

  trSubscription: Subscription;
  langMenu: any;
  currentLang: string;

  constructor(private http: HttpClient,
              private router: Router,
              private translate: TranslateService,
              private appService: AppService,
              @Inject(API_ENDPOINT) private apiEndpoint) { }

  ngOnInit() {
    this.currentLang = this.translate.currentLang;
    this.getLangMenu(this.currentLang);

    this.trSubscription = this.translate.onLangChange
      .subscribe((event: LangChangeEvent) => {
        if (this.currentLang !== event.lang) {
          this.currentLang = event.lang;
          this.getLangMenu(event.lang);
        }
      });
  }

  getLangMenu(lang) {
    const langs = this.langs.join('-');
    const url = `${this.apiEndpoint}/interface/${lang}/lang-menu/${langs}`;

    this.http.get(url).subscribe((data) => {
      this.langMenu = data;
    });
  }
  //
  // changeLanguage(langId) {
  //   const newLangUrl = this.router.url.replace(
  //     `/${this.currentLang}`,
  //     `/${langId}`
  //   );
  //
  //   // для плавного исчезновения langMenu
  //   setTimeout(() => {
  //     this.router.navigateByUrl(newLangUrl);
  //   }, 200);
  // }

  ngOnDestroy() {
    this.trSubscription.unsubscribe();
  }
}
