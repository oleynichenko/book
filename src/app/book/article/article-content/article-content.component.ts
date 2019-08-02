import {Component, Input, OnInit} from '@angular/core';

interface ChunkData {
  id: string;
  langId: string;
  authorId: string;
}

@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.scss']
})
export class ArticleContentComponent implements OnInit {
  @Input() set articles(value: any[]) {
    if (value.length > 0) {

      const mainArticle = value[0];
      this.title = mainArticle.title;

      this.content = mainArticle.chunks.map((c) => {
        const chunkData = [c];

        for (let i = 1; i < value.length; i++) {
          const chunk = this._getChunkById(value[i].chunks, c.chunkId);

          if (chunk) {
            chunkData.push(chunk);
          }
        }

        return chunkData;
      });
    }
  }

  title: string;
  content: ChunkData[][];

  constructor() { }

  ngOnInit() {
  }

  _getChunkById(chunks, id) {
    return chunks.find((i) => i.chunkId === id);
  }
}
