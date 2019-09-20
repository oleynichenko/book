import {AfterContentInit, Component, Inject, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {API_ENDPOINT} from '../../app.config';
import {HttpClient} from '@angular/common/http';
import {BookService} from '../book.service';
import {LanguageMenuService} from './language-menu.service';

@Component({
  selector: 'app-language-menu',
  templateUrl: './language-menu.component.html',
  styleUrls: ['./language-menu.component.scss']
})
export class LanguageMenuComponent implements OnInit {
  langMenu$: Observable<any>;

  constructor(private http: HttpClient,
              private router: Router,
              private translate: TranslateService,
              private languageMenuService: LanguageMenuService,
              @Inject(API_ENDPOINT) private apiEndpoint) { }

  ngOnInit() {
    this.langMenu$ = this.languageMenuService.langMenu;
  }

  onLangMenuItemClick(langId) {
    // для плавного исчезновения langMenu
    setTimeout(() => {
      this.languageMenuService.onLangChanging(langId);
    }, 200);
  }
}
