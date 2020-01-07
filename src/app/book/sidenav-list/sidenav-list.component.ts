import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {BookService} from '../book.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();

  sideMenu$: Observable<any>;

  constructor(private bookService: BookService,
              public translate: TranslateService,) { }

  ngOnInit() {
    this.sideMenu$ = this.bookService.bookData
      .pipe(map(data => data.sideMenu));
  }

  onClose() {
    this.closeSidenav.emit();
    // this.bookService.startLoading();
  }
}
