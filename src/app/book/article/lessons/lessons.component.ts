import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';
import {Lesson} from '../../../app.model';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LessonsComponent implements OnInit, OnDestroy {
  @Input() lessons: Lesson[];

  trSubscription: Subscription;
  currentLang: string;

  constructor(private translate: TranslateService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.currentLang = this.translate.currentLang;

    this.trSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
    });
  }

  getUrl(src: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(src);
  }

  ngOnDestroy() {
    this.trSubscription.unsubscribe();
  }
}
