import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators';

import {API_ENDPOINT} from '../app.config';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class BookService {
  interfaceState = new BehaviorSubject(null);

  constructor(private http: HttpClient,
              private translate: TranslateService,
              @Inject(API_ENDPOINT) private apiEndpoint) {}

  getInterfaceData(lang: string, bookName = this.bookName) {
    const url = `${this.apiEndpoint}/interface/${lang}/${bookName}`;

    return this.http.get(url).pipe(
      tap(data => this.interfaceState.next(data))
    );
  }

  get bookName() {
    return this.interfaceState.getValue().bookId;
  }

  get defaultAuthor() {
    const currentLang = this.translate.currentLang;
    const sources = this.interfaceState.getValue().sources;

    return sources
      .find(s => s.langId === currentLang)
      .defaultAuthor;
  }
}
