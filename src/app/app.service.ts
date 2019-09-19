import {Inject, Injectable, Renderer2} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  dir: 'rtl' | 'ltr';
  loadingStatus = new BehaviorSubject<boolean>(false);
  renderer: Renderer2;

  constructor(@Inject(DOCUMENT) document) {  }

  setDirection(lang) {
    this.dir = (lang === 'he') ? 'rtl' : 'ltr';
  }

  startLoading() {
    this.loadingStatus.next(true);
  }

  stopLoading() {
    this.loadingStatus.next(false);
  }

  changeTypography(lang) {
    if (lang === 'he') {
      this.renderer.addClass(document.body, 'he-theme');
    } else {
      this.renderer.removeClass(document.body, 'he-theme');
    }
  }
}
