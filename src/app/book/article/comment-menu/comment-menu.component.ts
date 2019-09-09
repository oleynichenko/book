import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {CommentService} from '../comment.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-comment-menu',
  templateUrl: './comment-menu.component.html',
  styleUrls: ['./comment-menu.component.scss']
})
export class CommentMenuComponent implements OnInit, OnDestroy {
  trSubscription: Subscription;

  constructor(private commentService: CommentService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.trSubscription = this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.commentService.changeCommentMenuTranslation(event.lang);
      });
  }

  onLangMenuSelect(value) {
    this.commentService.langSelectValue = value;
    this.commentService.setCommentsSelect(value);
    this.commentService.commentsSelectValue = null;
    this.commentService.comment = null;
  }

  onCommentsMenuSelect(value) {
    this.commentService.commentsSelectValue = value;
    this.commentService.setComment(value);
  }

  ngOnDestroy() {
    this.trSubscription.unsubscribe();
    this.commentService.setCommentMenu(null);
  }
}