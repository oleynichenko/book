import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {BookService} from '../book.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();

  sideMenu$: Observable<any>;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.sideMenu$ = this.bookService.bookData
      .pipe(map(data => data.sideMenu));
  }

  onClose() {
    this.closeSidenav.emit();
    // this.bookService.startLoading();
  }
}
