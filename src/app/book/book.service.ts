import {Inject, Optional, Injector, Injectable, PLATFORM_ID, Renderer2} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {Direction} from '@angular/cdk/bidi';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {REQUEST} from '@nguniversal/express-engine/tokens';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';

import {API_URL, APP_CONFIG} from '../app.config';

@Injectable()
export class BookService {
  dir: Direction;
  loadingStatus = new BehaviorSubject<boolean>(false);
  renderer: Renderer2;
  bookData = new BehaviorSubject(null);
  bookId: string;

  constructor(private http: HttpClient,
              private translate: TranslateService,
              private router: Router,
              private breakpointObserver: BreakpointObserver,
              private snackBar: MatSnackBar,
              private injector: Injector,
              @Inject(APP_CONFIG) private config: any,
              @Inject(API_URL) private apiUrl: any,
              @Inject(DOCUMENT) private document: Document,
              @Optional() @Inject(REQUEST) private request: any,
              @Inject(PLATFORM_ID) private platformId: object,
              private titleService: Title) {}

  setDirection(lang: string) {
    this.dir = (lang === 'he') ? 'rtl' : 'ltr';
  }

  startLoading() {
    this.loadingStatus.next(true);
  }

  stopLoading() {
    this.loadingStatus.next(false);
  }

  changeTypography(lang: any) {
    if (isPlatformBrowser(this.platformId)) {
      if (lang === 'he') {
        this.renderer.addClass(this.document.documentElement, 'he-theme');
      } else {
        this.renderer.removeClass(this.document.documentElement, 'he-theme');
      }
    }
  }

  setBookTitle() {
    if (isPlatformBrowser(this.platformId)) {
      const title = `${this.bookData.getValue().title} - ${this.bookData.getValue().author} | ${this.translate.instant('JMBCL') }`;

      this.titleService.setTitle(title);
    }
  }

  showSnackBar(message: any, action: any, duration: any) {
    this.snackBar.open(message, action, {duration});
  }

  getBookData(lang: string) {
    const options = {
      headers: {appInterfaceDisabled: 'true'}
    };

    return this.http.get(this.apiUrl.getBookDataUrl(lang, this.bookId), options).pipe(
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

  private modifyArticleMenuData(data: any) {
    const sources = this.bookData.getValue().sources;

    return data.filter((a: any) => {
      const sourcesByLang = sources[a.langId].authors;

      if (sourcesByLang.includes(a.authorId)) {
        const authorString = a.authorId !== this.bookData.getValue().authorId
          ? `${this.translate.instant('TRANSL')} ${a.authorName}`
          : this.translate.instant('ORIGINAL');

        a.menuTitle = `${a.langName} - ${authorString}`;
        return true;
      } else {
        return false;
      }
    });
  }

  getArticleMenu(article: any, lang: any) {
    const url = this.apiUrl.getArticleMenuUrl(article, lang, this.bookId);

    return this.http.get(url).pipe(
      map(data => this.modifyArticleMenuData(data))
    );
  }

  getArticle(article: any, lang: any, author: any) {
    const url = this.apiUrl.getArticleUrl(article, lang, author, this.bookId);

    const options = {
      headers: {appInterfaceDisabled: 'true'}
    };

    return this.http.get(url, options);
  }

  getSubdomainName() {
    return (isPlatformBrowser(this.platformId))
      ? this.document.location.hostname.split('.')[0]
      : this.request.subdomains[0];
  }

  getBookLangs(bookId: any) {
    const options = {
      headers: {appInterfaceDisabled: 'true'}
    };

    return this.http.get(this.apiUrl.getBookLangsUrl(bookId), options);
  }

  getPage(page: any, lang: any) {
    const url = this.apiUrl.getPageUrl(page, lang, this.bookId);

    const options = {
      headers: {appInterfaceDisabled: 'true'}
    };

    return this.http.get(url, options).pipe(
      map((data: any) => data.content)
    );
  }

  getAuthors(lang: any) {
    const url = this.apiUrl.getAuthorsUrl(lang, this.bookId);

    const options = {
      headers: {appInterfaceDisabled: 'true'}
    };

    return this.http.get(url, options);
  }

  navigateByLangUrl(langId: any) {
    const newLangUrl = this.router.url.replace(
      `/${this.translate.currentLang}`,
      `/${langId}`
    );

    this.router.navigateByUrl(newLangUrl);
  }

  getArticleLessons(articleId: any) {
    const url = this.apiUrl.getLessonsUrl(articleId, this.bookId);

    const options = {
      headers: {appInterfaceDisabled: 'true'}
    };

    return this.http.get(url, options);
  }
}
