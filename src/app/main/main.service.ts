import {Inject, Injectable} from '@angular/core';
import {MenuItem} from '../app.model';
import {HttpClient} from '@angular/common/http';
import {API_ENDPOINT, APP_CONFIG} from '../app.config';

@Injectable()
export class MainService {

  constructor(private http: HttpClient,
              @Inject(API_ENDPOINT) private apiEndpoint,
              @Inject(APP_CONFIG) private config) { }

  get menuItems(): MenuItem[] {
    return [
      new MenuItem('ABOUT_PROJECT', 'about'),
      new MenuItem('AUTHORS', 'authors')
    ];
  }

  getLibrary(lang) {
    const url = `${this.apiEndpoint}/library/${lang}/${this.config.library}`;

    const options = {
      headers: {appInterfaceDisabled: 'true'}
    };

    return this.http.get(url, options);
  }

  getInterfaceLangs(id) {
    const url = `${this.apiEndpoint}/interface/langs/${id}`;

    return this.http.get(url);
  }
}
