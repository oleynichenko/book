import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  QueryList, Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Article, Chunk} from '../../../app.model';
import {MatSnackBar} from '@angular/material';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.scss']
})
export class ArticleContentComponent implements OnInit, OnChanges, AfterViewChecked, OnDestroy {
  @Input() set articleContent(data: Article[]) {
    if (data && data.length) {
      this.footnotes = this._getAllFootnotes(data);

      const firstArticle: Article = data[0];

      this.content = firstArticle.chunks.map((c) => {
        // создаем массив chunkData для хранения всех чанков с одинаковым id

        const chunkData = [{
          chunkId: c.chunkId,
          content: (firstArticle.footnotes && firstArticle.footnotes.length)
            ? this._pasteFootnotes(c.content, firstArticle.langId)
            : c.content,
          langId: firstArticle.langId,
        }];

        for (let i = 1; i < data.length; i++) {
          const article = data[i];
          const chunk = this._getChunkById(article.chunks, c.chunkId);

          const chunkContent = chunk
            ? (article.footnotes && article.footnotes.length)
              ? this._pasteFootnotes(chunk.content, article.langId)
              : chunk.content
            : '';

          chunkData.push({
            chunkId: chunk.chunkId,
            content: chunkContent,
            langId: article.langId
          });
        }

        return chunkData;
      });
    }
  }

  content: Chunk[][];
  private footnotes: {};
  private footnotesElems: NodeList;
  private contentChanged: boolean;

  constructor(private hostElementRef: ElementRef,
              private renderer: Renderer2,
              private snackBar: MatSnackBar) { }

  ngOnInit() {}

  ngOnChanges(changes) {
    if (changes.articleContent && changes.articleContent.currentValue.length) {
      this.contentChanged = true;
      this.snackBar.dismiss();
    }
  }

  ngAfterViewChecked() {
    if (this.contentChanged) {
      this.footnotesElems = this.getFootnotesElems();
      this.setListenersToFootnotes(this.footnotesElems);
      this.contentChanged = false;
    }
  }

  private getFootnotesElems() {
    return this.hostElementRef.nativeElement
      .querySelectorAll('.loaded-content__footnote');
  }

  private setListenersToFootnotes(elems: NodeList) {
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

  private onFootnoteClick(event) {
    if (!event.target.classList.contains('loaded-content__footnote--chosen')) {
      const data = event.target.dataset;

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
        .subscribe(info => {
          this.renderer.removeClass(
            event.target,
            'loaded-content__footnote--chosen'
          );
      });
    }
  }

  private _getChunkById(chunks, id) {
    return chunks.find((i) => i.chunkId === id);
  }

  private _pasteFootnotes(content: string, lang: string): string {
    const regExp = /\[\d{1,}\]/g; // поиск [число]

    return content.replace(regExp, (match) => {
      const footnoteId = match.substring(1, match.length - 1);
      const footnoteName = this._getFootnoteName(footnoteId, lang);

      return `<a class="loaded-content__footnote" data-footnote="${footnoteName}" data-lang="${lang}"></a>`;
    });
  }

  private _getFootnoteName(id, lang) {
    return `${lang}_${id}`;
  }

  private _getAllFootnotes(data: Article[]) {
    return data.reduce((res, a) => {
      if (a.footnotes) {
        a.footnotes.forEach((f) => {
          res[this._getFootnoteName(f.id, a.langId)] = f.text;
        });
      }

      return res;
    }, {});
  }

  ngOnDestroy() {
    this.snackBar.dismiss();
  }
}
