import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';

import {BookService} from './book.service';
import {APP_CONFIG} from '../app.config';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy {
  interfaceDataIsLoading = true;
  trSubscription: Subscription;
  paramSubscription: Subscription;

  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private translate: TranslateService,
              @Inject(APP_CONFIG) private config) {}

  ngOnInit() {
    const lang = this.route.parent.snapshot.params.lang;
    const book = this.route.snapshot.params.book;

    this.translate.setDefaultLang(this.config.defaultLang);

    this.bookService.getInterfaceData(lang, book)
      .subscribe((data: any) => {
        // продумать отсутствие языка на сервере
        this.interfaceDataIsLoading = false;

        this.translate.addLangs(data.interfaceLangs);
        this.translate.use(lang);
      });

    this.paramSubscription = this.route.parent.params.subscribe((params: Params) => {
      if (params.lang !== this.translate.currentLang) {
        this.translate.use(params.lang);
      }
    });

    this.trSubscription = this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.bookService.getInterfaceData(event.lang, book)
          .subscribe((data: any) => {});
    });
  }

  ngOnDestroy() {
    this.trSubscription.unsubscribe();
    this.paramSubscription.unsubscribe();
  }
}
