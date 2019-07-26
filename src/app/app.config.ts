import {InjectionToken} from '@angular/core';

export const APP_CONFIG = new InjectionToken('APP_CONFIG');
export const API_ENDPOINT = new InjectionToken('API_ENDPOINT');

export interface IAppConfig {
  apiEndpoint: string;
  defaultLang: string;
  availableLangs: string[];
}

export const AppConfig: IAppConfig = {
  apiEndpoint: 'http://localhost:3000',
  defaultLang: 'en',
  availableLangs: ['en', 'ru', 'he']
};
