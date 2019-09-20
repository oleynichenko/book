import {InjectionToken} from '@angular/core';

export const APP_CONFIG = new InjectionToken('APP_CONFIG');
export const API_ENDPOINT = new InjectionToken('API_ENDPOINT');
export const APP_BREAKPOINTS = new InjectionToken('APP_BREAKPOINTS');

export interface IAppConfig {
  book: string;
  apiEndpoint: string;
  defaultLang: string;
  breakPoints: object;
}

export const AppConfig: IAppConfig = {
  apiEndpoint: 'http://localhost:3000',
  book: 'pticha',
  defaultLang: 'en',
  breakPoints: {
    tablet: '(min-width: 720px)', // коммент рядом
    desktop: '(min-width: 1280px)' // главное меню рядом с названием книги
  }
};
