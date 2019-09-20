import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {TranslateService} from '@ngx-translate/core';
import {API_ENDPOINT, APP_CONFIG} from '../../app.config';
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
              @Inject(API_ENDPOINT) private apiEndpoint) { }

  getCommentMenu(lang, article) {
    const url = `${this.apiEndpoint}/book/${lang}/comment-menu/${this.config.book}/${article}`;

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
        return {
          id: c.commentId,
          author: c.authorId,
          title: (c.title)
            ? `${c.title} - ${c.authorName}`
            : c.authorName
        };
      });
    } else {
      this.commentsSelect = null;
    }
  }

  // изменение языка отображения в CommentMenu
  changeCommentMenuTranslation(lang) {
    const langs = this.langSelect.map((i) => i.langId).join('-');
    const url = `${this.apiEndpoint}/langs/${lang}/${langs}`;

    this.http.get(url).subscribe((data: any) => {
      const newLangSelect = this.langSelect.map((i) => {
        i.name = data.find((j) => j.langId === i.langId).name;
        return i;
      });

      this.setLangSelect(newLangSelect);
    });
  }

  setComment(comment) {
    if (comment) {
      this.loadingStatus.next(true);

      const url = `${this.apiEndpoint}/comment/${this.langSelectValue}/${comment.id}/${comment.author}`;

      this.http.get(url).subscribe((data: any) => {
        this.comment = data.content;
        this.loadingStatus.next(false);
      });
    } else {
      this.comment = null;
    }
  }
}
