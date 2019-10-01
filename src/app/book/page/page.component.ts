import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BookService} from '../book.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  content$: Observable<any>;

  constructor(private route: ActivatedRoute,
              public bookService: BookService) { }

  ngOnInit() {
    this.content$ = this.route.data.pipe(
      map((data: any) => data.content)
    );
  }
}
