import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {MainService} from '../main.service';
import {APP_CONFIG} from '../../app.config';
import {map} from 'rxjs/operators';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  books$: Observable<any>;

  constructor(private route: ActivatedRoute,
              private translate: TranslateService,
              private mainService: MainService,
              private appService: AppService,
              @Inject(APP_CONFIG) private config,
              private router: Router) { }

  ngOnInit() {
    this.books$ = this.route.data.pipe(
      map((data: any) => data.books)
    );
  }

  onBookClick(id) {
    this.mainService.getInterfaceLangs(id)
      .subscribe((langs: any[]) => {
        const requiredInterfaceLang = this.translate.currentLang;
        let interfaceLang;

        if (langs.includes(requiredInterfaceLang)) {
          interfaceLang = requiredInterfaceLang;
        } else if (langs.includes(this.config.defaultLang)) {
          interfaceLang = this.config.defaultLang;
        } else {
          interfaceLang = langs[0];
        }

        const bookUrl = this.router.url.replace(
          `/${requiredInterfaceLang}`,
          `/${interfaceLang}`) + '/library/' + id;

        this.router.navigateByUrl(bookUrl);
      });
  }
}
