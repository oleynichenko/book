import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators';

import {API_ENDPOINT} from '../app.config';

@Injectable()
export class BookService {
  interfaceState = new BehaviorSubject(null);

  constructor(private http: HttpClient,
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

  get lang() {
    return this.interfaceState.getValue().langId;
  }

  get defaultAuthor() {
    return this.interfaceState.getValue().defaultAuthor;
  }
}
