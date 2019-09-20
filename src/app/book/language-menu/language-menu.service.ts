import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Langs} from '../../app.model';
import {API_ENDPOINT} from '../../app.config';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {BookService} from '../book.service';

@Injectable()
export class LanguageMenuService {
  langMenu = new BehaviorSubject(null);

  constructor(private http: HttpClient,
              private bookService: BookService,
              @Inject(API_ENDPOINT) private apiEndpoint) { }

  getLangMenu(lang: string, langs: Langs) {
    const langsString = langs.join('-');
    const url = `${this.apiEndpoint}/langs/${lang}/${langsString}`;

    return this.http.get(url).pipe(
      tap((data: any[]) => this.langMenu.next(data))
    );
  }

  onLangChanging(lang) {
    this.bookService.onLangMenuChanges(lang);
  }
}
