import {Component, OnInit, ViewChild} from '@angular/core';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {BookService} from '../../book/book.service';
import {Observable} from 'rxjs';
import {MatMenuTrigger} from '@angular/material';

@Component({
  selector: 'app-language-menu',
  templateUrl: './language-menu.component.html',
  styleUrls: ['./language-menu.component.scss']
})
export class LanguageMenuComponent implements OnInit {
  langMenu$: Observable<any>;
  lang: string;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.langMenu$ = this.bookService.interfaceState
      .pipe(
        tap(data => this.lang = data.langId),
        map(data => data.langMenu)
      );
  }

  changeLanguage(langId) {
    setTimeout(() => {
      this.bookService.getInterfaceData(langId)
        .subscribe();
    }, 200);
  }
}
