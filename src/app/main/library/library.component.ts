import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {MainService} from '../main.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit, OnDestroy {
  books: any[];
  trSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private translate: TranslateService,
              private mainService: MainService) { }

  ngOnInit() {
    this.books = this.route.snapshot.data.books;

    this.trSubscription = this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.mainService.getLibrary(event.lang)
          .subscribe((books: any) => this.books = books);
      });
  }

  ngOnDestroy() {
    this.trSubscription.unsubscribe();
  }
}
