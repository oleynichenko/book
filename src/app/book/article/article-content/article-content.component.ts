import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnChanges, OnDestroy,
  OnInit, Renderer2,
} from '@angular/core';

import {Article, Chunk} from '../../../app.model';
import {FootnoteService} from '../../../shared/footnote.service';

@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.scss'],
  providers: [FootnoteService]
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
            ? FootnoteService.pasteFootnotes(c.content, firstArticle.langId)
            : c.content,
          langId: firstArticle.langId,
        }];

        for (let i = 1; i < data.length; i++) {
          const article = data[i];
          const chunk = this._getChunkById(article.chunks, c.chunkId);

          const chunkContent = chunk
            ? (article.footnotes && article.footnotes.length)
              ? FootnoteService.pasteFootnotes(chunk.content, article.langId)
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
  private contentChanged: boolean;

  constructor(private hostElementRef: ElementRef,
              private renderer: Renderer2,
              public footnoteService: FootnoteService) {
    footnoteService.renderer = renderer;
  }

  ngOnInit() {}

  ngOnChanges(changes: any) {
    if (changes.articleContent && changes.articleContent.currentValue.length) {
      this.contentChanged = true;
      this.footnoteService.closeFootnote();
    }
  }

  ngAfterViewChecked() {
    if (this.contentChanged) {
      this.footnoteService.setListenersToFootnotes(
        this.hostElementRef.nativeElement,
        this.footnotes);

      this.contentChanged = false;
    }
  }

  private _getChunkById(chunks: any, id: any) {
    return chunks.find((i: any) => i.chunkId === id);
  }

  private _getAllFootnotes(data: Article[]) {
    return data.reduce((res: any, a) => {
      if (a.footnotes) {
        a.footnotes.forEach((f) => {
          res[FootnoteService.getFootnoteName(f.id, a.langId)] = f.text;
        });
      }

      return res;
    }, {});
  }

  ngOnDestroy() {
    // убирает также и сноски в комментах
    this.footnoteService.closeFootnote();
  }
}
