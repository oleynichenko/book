import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {TranslateService} from '@ngx-translate/core';
import {API_URL, APP_CONFIG} from '../../app.config';
import {BehaviorSubject} from 'rxjs';

// компонент требует переработки
@Injectable()
export class CommentService {
  loadingStatus = new BehaviorSubject<boolean>(false);

  langSelect: any;
  langSelectValue: string;
  commentsSelect: any;
  commentsSelectValue: string;
  comment: string;

  constructor(private http: HttpClient,
              private translate: TranslateService,
              @Inject(APP_CONFIG) private config,
              @Inject(API_URL) private apiUrl) { }

  getCommentMenu(article, lang) {
    const url = this.apiUrl.getCommentMenu(article, lang);

    return this.http.get(url);
  }

  setCommentMenu(data) {
    this.setLangSelect(data);
    this.langSelectValue = null;
    this.setCommentsSelect(this.langSelectValue);
    this.commentsSelectValue = null;
    this.setComment(this.commentsSelectValue);
  }

  setLangSelect(data) {
    this.langSelect = data;
  }

  setCommentsSelect(lang) {
    if (lang) {
      const comments = this.langSelect.find((i) => {
        return i.langId === lang;
      }).comments;

      this.commentsSelect = comments.map((c: any) => {
        c.title = (c.title)
          ? `${c.title} - ${c.authorName}`
          : c.authorName;

        return c;
      });
    } else {
      this.commentsSelect = null;
    }
  }

  // изменение языка отображения в CommentMenu
  changeCommentMenuTranslation(lang) {
    const langs = this.langSelect.map((i) => i.langId);

    this.http.get(this.apiUrl.getLangsUrl(lang, langs))
      .subscribe((data: any) => {
        const newLangSelect = this.langSelect.map((i) => {
          i.name = data.find((j) => j.langId === i.langId).name;
          return i;
        });

        this.setLangSelect(newLangSelect);

        if (!this.langSelectValue) {
          this.comment = this.translate.instant('CHOOSE_COMMENT');
        }
      });
  }

  setComment(comment) {
    if (comment) {
      this.loadingStatus.next(true);

      const url = this.apiUrl.getCommentUrl(
        comment.commentId,
        this.langSelectValue,
        comment.authorId,
        comment.articleId
      );

      this.http.get(url).subscribe((data: any) => {
        this.loadingStatus.next(false);
        this.comment = data.content || `<p>Comment is currently unavailable</p>`;
      });
    } else {
      this.comment = this.translate.instant('CHOOSE_COMMENT');
    }
  }
}
