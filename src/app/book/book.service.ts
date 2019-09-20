import {Inject, Injectable, Renderer2} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import {API_ENDPOINT, APP_BREAKPOINTS, APP_CONFIG} from '../app.config';
import {TranslateService} from '@ngx-translate/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {MenuItem} from '../app.model';
import {MatSnackBar} from '@angular/material';
import {Direction} from '@angular/cdk/bidi';
import {Router} from '@angular/router';

@Injectable()
export class BookService {
  dir: Direction;
  loadingStatus = new BehaviorSubject<boolean>(false);
  renderer: Renderer2;

  bookData = new BehaviorSubject(null);

  constructor(private http: HttpClient,
              private translate: TranslateService,
              private router: Router,
              private breakpointObserver: BreakpointObserver,
              private snackBar: MatSnackBar,
              @Inject(APP_CONFIG) private config) {}


  setDirection(lang) {
    this.dir = (lang === 'he') ? 'rtl' : 'ltr';
  }

  startLoading() {
    this.loadingStatus.next(true);
  }

  stopLoading() {
    this.loadingStatus.next(false);
  }

  changeTypography(lang) {
    if (lang === 'he') {
      this.renderer.addClass(document.body, 'he-theme');
    } else {
      this.renderer.removeClass(document.body, 'he-theme');
    }
  }

  showSnackBar(message, action, duration) {
    this.snackBar.open(message, action, {duration});
  }

  getBookData(lang: string) {
    const url = `${this.config.apiEndpoint}/book/${lang}/${this.config.book}`;

    const options = {
      headers: {appInterfaceDisabled: 'true'}
    };

    return this.http.get(url, options).pipe(
      tap((data: any) => {
        this.bookData.next(data);
        this.translate.use(data.langId);
      })
    );
  }

  get isDesktop$() {
    return this.breakpointObserver
      .observe([this.config.breakPoints.desktop]).pipe(
        map((state: BreakpointState) => state.matches)
      );
  }

  get defaultAuthor() {
    const currentLang = this.translate.currentLang;
    const sources = this.bookData.getValue().sources;

    return sources
      .find(s => s.langId === currentLang)
      .defaultAuthor;
  }

  getArticleMenu(article, lang) {
    const url = `${this.config.apiEndpoint}/book/${lang}/article-menu/${this.config.book}/${article}`;

    return this.http.get(url);
  }

  getArticle(article, lang, author) {
    const url = `${this.config.apiEndpoint}/article/${lang}/${this.config.book}/${article}/${author}`;

    const options = {
      headers: {appInterfaceDisabled: 'true'}
    };

    return this.http.get(url, options);
  }

  getBookLangs() {
    const url = `${this.config.apiEndpoint}/book/langs/${this.config.book}`;

    const options = {
      headers: {appInterfaceDisabled: 'true'}
    };

    return this.http.get(url, options);
  }

  onLangMenuChanges(langId) {
    const newLangUrl = this.router.url.replace(
      `/${this.translate.currentLang}`,
      `/${langId}`
    );

    this.router.navigateByUrl(newLangUrl);
  }
}
