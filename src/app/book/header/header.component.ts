import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {BookService} from '../book.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  title$: Observable<string>;

  constructor(private bookService: BookService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.title$ = this.bookService.interfaceState
      .pipe(
        map(data => data.title)
      );
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
