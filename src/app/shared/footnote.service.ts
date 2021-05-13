import {Injectable, Renderer2} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FootnoteService {
  private footnotes: object;
  renderer: Renderer2;

  constructor(private snackBar: MatSnackBar) { }

  static getFootnoteName(id: string, lang: string) {
    return `${lang}_${id}`;
  }

  static pasteFootnotes(content: string, lang: string): string {
    const regExp = /\[\d{1,}\]/g; // поиск [число]

    return content.replace(regExp, (match) => {
      const footnoteId = match.substring(1, match.length - 1);
      const footnoteName = FootnoteService.getFootnoteName(footnoteId, lang);

      return `<a class="loaded-content__footnote" data-footnote="${footnoteName}" data-lang="${lang}"></a>`;
    });
  }

  closeFootnote() {
    this.snackBar.dismiss();
  }

  setListenersToFootnotes(elem: HTMLElement, footnotes: object) {
    const elems = elem.querySelectorAll('.loaded-content__footnote');
    this.footnotes = {...footnotes};

    elems.forEach((f) => {
      if (f.isConnected) {
        this.renderer.listen(
          f,
          'click',
          this.onFootnoteClick.bind(this)
        );
      }
    });
  }

  private onFootnoteClick(event: any) {
    if (!event.target.classList.contains('loaded-content__footnote--chosen')) {
      const data = event.target.dataset;

      // @ts-ignore
      const footnoteText = this.footnotes[data.footnote]
        || 'Sorry, this footnote is not set yet...';

      const direction = (data.lang === 'he') ? 'rtl' : 'ltr';

      const snackBarRef = this.snackBar.open(footnoteText, 'X', {direction});

      this.renderer.addClass(
        event.target,
        'loaded-content__footnote--chosen'
      );

      snackBarRef.afterDismissed()
        .pipe(first())
        .subscribe(() => {
          this.renderer.removeClass(
            event.target,
            'loaded-content__footnote--chosen'
          );
        });
    }
  }
}
