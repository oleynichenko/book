import {Component, EventEmitter, OnInit, Output, OnDestroy} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Observable, Subscription} from 'rxjs';

import {BookService} from '../book.service';
import {MenuItem} from '../../app.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  title: string;
  menuItems: MenuItem[];
  isDesktop$: Observable<boolean>;
  suscription: Subscription;

  constructor(private translate: TranslateService,
              private bookService: BookService) { }

  ngOnInit() {
    this.suscription = this.bookService.bookData
      .subscribe(data => {
        this.menuItems = data.mainMenu;
        this.title = data.title;
      });

    this.isDesktop$ = this.bookService.isDesktop$;
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }
}
