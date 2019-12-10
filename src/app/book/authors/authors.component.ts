import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

import {BookService} from '../book.service';
import {API_URL, APP_CONFIG} from '../../app.config';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  content$: Observable<any>;
  authors$: Observable<any>;

  constructor(private route: ActivatedRoute,
              public translate: TranslateService,
              public bookService: BookService,
              @Inject(API_URL) private apiUrl,
              @Inject(APP_CONFIG) private config) { }

  ngOnInit() {
    this.content$ = this.route.data.pipe(
      map((data: any) => data.content[0])
    );

    this.authors$ = this.route.data.pipe(
      map((data: any) => {
        const authors = data.content[1];

        return authors.map((a) => {
          if (a.img) {
            a.img = this.apiUrl.getImgStoreUrl(a.img);
          }

          if (a.description === '') {
            a.description = this.config.needInfoText;
          }

          return a;
        });
      })
    );
  }
}
