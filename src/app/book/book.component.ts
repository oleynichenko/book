import {Component, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {AppService} from '../app.service';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;

  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              public appService: AppService,
              private translate: TranslateService,
              private renderer: Renderer2) {
    appService.renderer = renderer;
  }

  ngOnInit() {
    const lang = this.route.snapshot.params.lang;
    this.appService.setDirection(lang);
    this.translate.use(lang);

    this.paramsSubscription = this.route.params
      .subscribe((params: Params) => {
        this.translate.use(params.lang);
        this.appService.setDirection(params.lang);
        this.appService.changeTypography(params.lang);
      });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
