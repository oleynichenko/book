import {AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';

import {BookService} from './book.service';
import {Subscription} from 'rxjs';
import {MatSidenav} from '@angular/material';
import {AppService} from '../app.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;

  trSubscription: Subscription;

  constructor(private bookService: BookService,
              public appService: AppService,
              private route: ActivatedRoute,
              private translate: TranslateService) {}

  ngOnInit() {
    const book = this.route.snapshot.params.book;

    this.trSubscription = this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.bookService.getInterfaceData(event.lang, book)
          .subscribe((data: any) => {});
    });
  }

  ngOnDestroy() {
    this.trSubscription.unsubscribe();
  }
}
