import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {BookService} from '../book.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  title$: Observable<string>;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.title$ = this.bookService.interfaceState
      .pipe(map(data => data.title));
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
