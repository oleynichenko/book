import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {BookService} from '../book.service';
import {MenuItem} from '../../app.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  title$: Observable<string>;
  menuItems: MenuItem[];
  isDesktop$: Observable<boolean>;
  intrefaceLangs: string[];

  constructor(private translate: TranslateService,
              private bookService: BookService) { }

  ngOnInit() {
    this.intrefaceLangs = this.bookService.interfaceLangs;
    this.menuItems = this.bookService.getMainMenu();

    this.title$ = this.bookService.interfaceState
      .pipe(
        tap(data => {
          this.menuItems = this.bookService.getMainMenu(data.mainMenu);
        }),
        map(data => data.title)
      );

    this.isDesktop$ = this.bookService.isDesktop$;
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
