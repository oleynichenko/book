import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

import {API_URL, APP_CONFIG} from '../../app.config';
import {BookService} from '../book.service';
import {Footnote} from '../../app.model';
import {FootnoteService} from '../../shared/footnote.service';

// компонент требует переработки
@Injectable()
export class CommentService {
  loadingStatus = new BehaviorSubject<boolean>(false);

  langSelect: any;
  langSelectValue: string;
  commentsSelect: any;
  commentsSelectValue: string;
  comment: string;
  footnotes: {};
  footnotesToSet = false;

  constructor(private http: HttpClient,
              private translate: TranslateService,
              private bookService: BookService,
              @Inject(APP_CONFIG) private config,
              @Inject(API_URL) private apiUrl) { }

  getCommentMenu(article, lang) {
    const url = this.apiUrl.getCommentMenuUrl(article, lang, this.bookService.bookId);

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
        c.title = c.translatorName
          ? `${c.title} - ${c.translatorName}`
          : c.title;

        return c;
      });
    } else {
      this.commentsSelect = null;
    }
  }

  // изменение языка отображения в CommentMenu
  changeCommentMenuTranslation(lang) {
    const langs = this.langSelect.map((i) => i.langId);

    this.http.get(this.apiUrl.getLangsUrl(lang, langs, this.bookService))
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
        comment.articleId,
        this.bookService.bookId,
        comment.translatorId
      );

      this.http.get(url).subscribe((data: any) => {
        this.loadingStatus.next(false);

        if (data.content !== '') {
          if (data.footnotes) {
            this.footnotes = this.getFootnotes(data.footnotes, data.langId);
            this.comment = FootnoteService.pasteFootnotes(data.content, data.langId);
            this.footnotesToSet = true;
          } else {
            this.footnotes = null;
            this.comment = data.content;
          }
        } else {
          this.footnotes = null;
          this.comment = `<p>Comment is currently unavailable</p>`;
        }
      });
    } else {
      this.footnotes = null;
      this.comment = this.translate.instant('CHOOSE_COMMENT');
    }
  }

  getFootnotes(footnotesData: Footnote[], lang) {
    const res = {};

    footnotesData.forEach((f) => {
      res[FootnoteService.getFootnoteName(f.id, lang)] = f.text;
    });

    return res;
  }
}
