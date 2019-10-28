import {InjectionToken} from '@angular/core';
import {environment} from '../environments/environment';

export const APP_CONFIG = new InjectionToken('APP_CONFIG');
export const APP_BREAKPOINTS = new InjectionToken('APP_BREAKPOINTS');
export const API_URL = new InjectionToken('API_URL');

export interface IAppConfig {
  defaultLang: string;
  breakPoints: object;
}

export const AppConfig: IAppConfig = {
  defaultLang: 'en',
  breakPoints: {
    tablet: '(min-width: 720px)', // коммент рядом
    desktop: '(min-width: 1280px)' // главное меню рядом с названием книги
  }
};

export const ApiUrl = {
  getBookLangsUrl: (book) => {
    return `${environment.apiEndpoint}/books/${book}/langs`;
  },

  getBookDataUrl: (lang, book) => {
    return `${environment.apiEndpoint}/books/${book}/${lang}`;
  },

  getArticleUrl: (article, lang, author, book) => {
    return `${environment.apiEndpoint}/articles/${article}/${author}/${lang}/${book}`;
  },

  getArticleMenuUrl: (article, lang, book) => {
    return `${environment.apiEndpoint}/articles/menu/${article}/${lang}/${book}`;
  },

  getCommentUrl: (comment, lang, author, article, book) => {
    return `${environment.apiEndpoint}/comments/${comment}/${author}/${lang}/${book}/${article}`;
  },

  getCommentMenuUrl: (article, lang, book) => {
    return `${environment.apiEndpoint}/comments/menu/${article}/${lang}/${book}`;
  },

  getLangsUrl: (lang, langs: string[]) => {
    const langsString = langs.join('-');

    return `${environment.apiEndpoint}/langs/${lang}/${langsString}`;
  },

  getPageUrl: (page, lang, book) => {
    return `${environment.apiEndpoint}/pages/${page}/${lang}/${book}`;
  }
};
