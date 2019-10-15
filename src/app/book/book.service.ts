import {Inject, Injectable, PLATFORM_ID, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {BehaviorSubject} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {Direction} from '@angular/cdk/bidi';
import {MatSnackBar} from '@angular/material';

import {API_URL, APP_CONFIG} from '../app.config';

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
              @Inject(APP_CONFIG) private config,
              @Inject(API_URL) private apiUrl,
              @Inject(DOCUMENT) private document: Document,
              @Inject(PLATFORM_ID) private platformId: object) {}

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
    if (isPlatformBrowser(this.platformId)) {
      if (lang === 'he') {
        this.renderer.addClass(this.document.body, 'he-theme');
      } else {
        this.renderer.removeClass(this.document.body, 'he-theme');
      }
    }
  }

  showSnackBar(message, action, duration) {
    this.snackBar.open(message, action, {duration});
  }

  getBookData(lang: string) {
    const options = {
      headers: {appInterfaceDisabled: 'true'}
    };

    return this.http.get(this.apiUrl.getBookData(lang), options).pipe(
      tap((data: any) => {
        this.bookData.next(data);
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

    return sources[currentLang].defaultAuthor;
  }

  private modifyArticleMenuData(data) {
    const sources = this.bookData.getValue().sources;

    return data.filter((a) => {
      const sourcesByLang = sources[a.langId].authors;

      if (sourcesByLang.includes(a.authorId)) {
        a.menuTitle = `${a.langName} - ${a.authorName}`;
        return true;
      } else {
        return false;
      }
    });
  }

  getArticleMenu(article, lang) {
    const url = this.apiUrl.getArticleMenu(article, lang);

    return this.http.get(url).pipe(
      map(data => this.modifyArticleMenuData(data))
    );
  }

  getArticle(article, lang, author) {
    const url = this.apiUrl.getArticleUrl(article, lang, author);

    const options = {
      headers: {appInterfaceDisabled: 'true'}
    };

    return this.http.get(url, options);
  }

  getBookLangs() {
    const options = {
      headers: {appInterfaceDisabled: 'true'}
    };

    return this.http.get(this.apiUrl.bookLangs, options);
  }

  getPage(page, lang) {
    const url = this.apiUrl.getPageUrl(page, lang);

    const options = {
      headers: {appInterfaceDisabled: 'true'}
    };

    return this.http.get(url, options).pipe(
      map((data: any) => data.content)
    );
  }

  navigateByLangUrl(langId) {
    const newLangUrl = this.router.url.replace(
      `/${this.translate.currentLang}`,
      `/${langId}`
    );

    this.router.navigateByUrl(newLangUrl);
  }
}
