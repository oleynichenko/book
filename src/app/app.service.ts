import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  dir: 'rtl' | 'ltr';

  constructor(private translate: TranslateService,
              private router: Router,) {  }

  setDirection(lang) {
    this.dir = (lang === 'he') ? 'rtl' : 'ltr';
  }

  changeLanguageInUrl(langId) {
    console.log(this.router.url);
    const newLangUrl = this.router.url.replace(
      `/${this.translate.currentLang}`,
      `/${langId}`
    );

    // для плавного исчезновения langMenu
    setTimeout(() => {
      this.router.navigateByUrl(newLangUrl);
    }, 200);
  }
}
