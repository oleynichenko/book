import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {BookService} from '../book.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

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
    this.sideMenu$ = this.bookService.interfaceState
      .pipe(map(data => data.sideMenu));
  }

  onClose() {
    this.closeSidenav.emit();
  }
}
