import {Component, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';

import {BookService} from './book.service';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;

  isLoading$: Observable<boolean>;
  trSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              public bookService: BookService,
              private translate: TranslateService,
              private renderer: Renderer2) {
    bookService.renderer = renderer;
  }

  ngOnInit() {
    const lang = this.route.snapshot.params.lang;

    this.translate.setDefaultLang(lang);
    this.bookService.setDirection(lang);
    this.bookService.changeTypography(lang);

    this.trSubscription = this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.bookService.setDirection(event.lang);
        this.bookService.changeTypography(event.lang);
      });

    this.isLoading$ = this.bookService.loadingStatus.pipe(
      debounceTime(300)
    );
  }

  ngOnDestroy(): void {
    this.trSubscription.unsubscribe();
  }
}
