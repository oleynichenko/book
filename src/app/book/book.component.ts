import {Component, OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {BookService} from './book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  interfaceDataIsLoading = true;

  constructor(private bookService: BookService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    const params = this.route.snapshot.params;

    this.bookService.getInterfaceData(params.lang, params.book)
      .subscribe((data: any) => {
        this.interfaceDataIsLoading = false;
      });
  }
}
