import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import {API_ENDPOINT, APP_BREAKPOINTS} from '../app.config';
import {TranslateService} from '@ngx-translate/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {MenuItem} from '../app.model';

@Injectable()
export class BookService {
  interfaceState = new BehaviorSubject(null);

  constructor(private http: HttpClient,
              private translate: TranslateService,
              @Inject(API_ENDPOINT) private apiEndpoint,
              private breakpointObserver: BreakpointObserver,
              @Inject(APP_BREAKPOINTS) private breakPoints) {}

  getInterfaceData(lang: string, bookId = this.bookId) {
    const url = `${this.apiEndpoint}/interface/${lang}/${bookId}`;

    const options = {
      headers: {appInterfaceDisabled: 'true'}
    };

    return this.http.get(url, options).pipe(
      tap(data => this.interfaceState.next(data))
    );
  }

  get bookId() {
    return this.interfaceState.getValue().bookId;
  }

  get interfaceLangs() {
    return this.interfaceState.getValue().interfaceLangs;
  }

  getMainMenu(data = this.interfaceState.getValue().mainMenu) {
    const mainmenu = [new MenuItem(
      'LIBRARY',
      `/${this.interfaceState.getValue().langId}`
    )];

    data.forEach((item) => {
      mainmenu.push(new MenuItem(item.title, item.pageId));
    });

    return mainmenu;
  }

  get isDesktop$() {
    return this.breakpointObserver
      .observe([this.breakPoints.desktop]).pipe(
        map((state: BreakpointState) => state.matches)
      );
  }

  get defaultAuthor() {
    const currentLang = this.translate.currentLang;
    const sources = this.interfaceState.getValue().sources;

    return sources
      .find(s => s.langId === currentLang)
      .defaultAuthor;
  }

  getArticleMenu(article, lang) {
    const url = `${this.apiEndpoint}/interface/${lang}/article-menu/${this.bookId}/${article}`;

    return this.http.get(url);
  }

  getArticle(article, lang, author) {
    const url = `${this.apiEndpoint}/article/${lang}/${this.bookId}/${article}/${author}`;

    const options = {
      headers: {appInterfaceDisabled: 'true'}
    };

    return this.http.get(url, options);
  }
}
