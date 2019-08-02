import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CommentService} from './comment.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
  trSubscription: Subscription;

  constructor(private commentService: CommentService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.trSubscription = this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.commentService.changeLangMenuTranslation(event.lang);
      });
  }

  onLangMenuSelect(value) {
    this.commentService.langMenuLanguage = value;
    this.commentService.setCommentsMenu(value);
  }

  onCommentsMenuSelect(value) {
    this.commentService.setComment(value);
  }

  ngOnDestroy() {
    this.trSubscription.unsubscribe();
  }
}
