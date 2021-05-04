import {InjectionToken} from '@angular/core';
import {environment} from '../environments/environment';

export const APP_CONFIG = new InjectionToken('APP_CONFIG');
export const APP_BREAKPOINTS = new InjectionToken('APP_BREAKPOINTS');
export const API_URL = new InjectionToken('API_URL');

export interface IAppConfig {
  defaultLang: string;
  breakPoints: object;
  needTranslationText: string;
  needInfoText: string;
}

export const AppConfig: IAppConfig = {
  defaultLang: 'en',
  breakPoints: {
    tablet: '(min-width: 720px)', // коммент рядом
    desktop: '(min-width: 1280px)' // главное меню рядом с названием книги
  },
  needTranslationText: `<p>Please,
    <a
      class="global-link--primary"
      target="_blank"
      href="mailto:admin@jbook.online?subject=Help with translation"
    >help us</a> translate this page from russian
  </p>`,
  needInfoText: `<p>Please,
    <a
      class="global-link--primary"
      target="_blank"
      href="mailto:admin@jbook.online?subject=Help with translation"
    >help us</a> find this information
  </p>`
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

  getCommentUrl: (comment, lang, author, article, book, translator?) => {
    const queryParams = translator
      ? `/?translatorId=${translator}`
      : '';

    return `${environment.apiEndpoint}/comments/${comment}/${author}/${lang}/${book}/${article}${queryParams}`;
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
  },

  getAuthorsUrl: (lang, book) => {
    return `${environment.apiEndpoint}/authors/${lang}/${book}`;
  },

  getLessonsUrl: (article, book) => {
    return `${environment.apiEndpoint}/lessons/${article}/${book}`;
  },

  getImgStoreUrl: (img) => {
    return `${environment.apiEndpoint}/img/${img}`;
  }
};
