import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {TranslateService} from '@ngx-translate/core';
import {API_ENDPOINT} from '../../../app.config';

@Injectable()
export class CommentService {
  langMenu: any;
  langMenuLanguage: string;
  commentsMenu: any;
  comment: string;

  constructor(private http: HttpClient,
              private translate: TranslateService,
              @Inject(API_ENDPOINT) private apiEndpoint) {
    this.langMenuLanguage = this.translate.currentLang;
  }

  setCommentData(lang, article) {
    const url = `${this.apiEndpoint}/interface/${lang}/comment-data/${article}`;

    return this.http.get(url).subscribe((data: any) => {
      this.langMenu = data;

      if (this.langMenu) {
        this.langMenuLanguage = this.initLangMenuLanguage(data);
        this.setCommentsMenu(this.langMenuLanguage);
      } else {
        this.langMenuLanguage = null;
        this.commentsMenu = null;
        this.comment = null;
      }
    });
  }

  private initLangMenuLanguage(menu) {
    const isCurrentLangInMenu = menu.find((i) => {
      return i.langId === this.langMenuLanguage;
    });

    return isCurrentLangInMenu
      ? this.langMenuLanguage
      : menu[0].langId;
  }

  // изменение языка отображения в langMenu
  changeLangMenuTranslation(lang) {
    const langs = this.langMenu.map((i) => i.langId).join('-');
    const url = `${this.apiEndpoint}/interface/${lang}/lang-menu/${langs}`;

    this.http.get(url).subscribe((data: any) => {
      this.langMenu = this.langMenu.map((i) => {
        i.name = data.find((j) => j.langId === i.langId).name;
        return i;
      });
    });
  }

  setCommentsMenu(lang) {
    const comments = this.langMenu.find((i) => {
      return i.langId === lang;
    }).comments;

    this.commentsMenu = comments.map((c: any) => {
      return {
        id: c.commentId,
        title: (c.translatorName)
          ? `${c.authorName} - ${c.translatorName}`
          : c.authorName
      };
    });

    this.setComment();
  }

  setComment(commentId = this.commentsMenu[0].id) {
    const url = `${this.apiEndpoint}/comment/${commentId}`;

    return this.http.get(url).subscribe((data: any) => {
      this.comment = data.content;
    });
  }
}
