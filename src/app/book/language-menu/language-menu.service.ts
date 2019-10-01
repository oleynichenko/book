import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

import {Langs} from '../../app.model';
import {BookService} from '../book.service';
import {API_URL} from '../../app.config';

@Injectable()
export class LanguageMenuService {
  langMenu = new BehaviorSubject(null);

  constructor(private http: HttpClient,
              private bookService: BookService,
              private translate: TranslateService,
              @Inject(API_URL) private apiUrl) { }

  getLangMenu(lang: string, langs: Langs) {
    const url = this.apiUrl.getLangsUrl(lang, langs);

    return this.http.get(url).pipe(
      tap((data: any[]) => {
        this.langMenu.next(data);
      })
    );
  }

  onLangChanging(lang) {
    this.bookService.navigateByLangUrl(lang);
  }
}
