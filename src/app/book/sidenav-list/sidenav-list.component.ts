import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {BookService} from '../book.service';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();

  sideMenu$: Observable<any>;

  constructor(private bookService: BookService,
              private appService: AppService) { }

  ngOnInit() {
    this.sideMenu$ = this.bookService.interfaceState
      .pipe(map(data => data.sideMenu));
  }

  onClose() {
    this.closeSidenav.emit();
    this.appService.startLoading();
  }
}
