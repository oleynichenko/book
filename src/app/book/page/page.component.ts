import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BookService} from '../book.service';
import {TranslateService} from '@ngx-translate/core';
import {APP_CONFIG} from '../../app.config';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  content$: Observable<any>;

  constructor(private route: ActivatedRoute,
              public translate: TranslateService,
              public bookService: BookService,
              @Inject(APP_CONFIG) private config: any) { }

  ngOnInit() {
    this.content$ = this.route.data.pipe(
      map((data: any) => data.content !== ''
        ? data.content
        : this.config.needTranslationText)
    );
  }
}
