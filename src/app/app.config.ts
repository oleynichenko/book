import {InjectionToken} from '@angular/core';
import {environment} from '../environments/environment';

export const APP_CONFIG = new InjectionToken('APP_CONFIG');
export const APP_BREAKPOINTS = new InjectionToken('APP_BREAKPOINTS');
export const API_URL = new InjectionToken('API_URL');

export interface IAppConfig {
  book: string;
  defaultLang: string;
  breakPoints: object;
}

export const AppConfig: IAppConfig = {
  book: 'foreword-zoar',
  defaultLang: 'en',
  breakPoints: {
    tablet: '(min-width: 720px)', // коммент рядом
    desktop: '(min-width: 1280px)' // главное меню рядом с названием книги
  }
};

export const ApiUrl = {
  bookLangs: `${environment.apiEndpoint}/books/${AppConfig.book}/langs`,

  getBookData: (lang) => {
    return `${environment.apiEndpoint}/books/${AppConfig.book}/${lang}`;
  },

  getArticleUrl: (article, lang, author) => {
    return `${environment.apiEndpoint}/articles/${article}/${author}/${lang}/${AppConfig.book}`;
  },

  getArticleMenu: (article, lang) => {
    return `${environment.apiEndpoint}/articles/menu/${article}/${lang}/${AppConfig.book}`;
  },

  getCommentUrl: (comment, lang, author, article) => {
    return `${environment.apiEndpoint}/comments/${comment}/${author}/${lang}/${AppConfig.book}/${article}`;
  },

  getCommentMenu: (article, lang) => {
    return `${environment.apiEndpoint}/comments/menu/${article}/${lang}/${AppConfig.book}`;
  },

  getLangsUrl: (lang, langs: string[]) => {
    const langsString = langs.join('-');

    return `${environment.apiEndpoint}/langs/${lang}/${langsString}`;
  },

  getPageUrl: (page, lang) => {
    return `${environment.apiEndpoint}/pages/${page}/${lang}/${AppConfig.book}`;
  }
};
