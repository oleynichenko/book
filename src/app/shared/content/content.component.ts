import {Component, Input, OnInit} from '@angular/core';

interface ChunkData {
  id: string;
  langId: string;
  authorId: string;
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @Input() set articles(value: any[]) {
    if (value.length > 0) {
      const mainArticle = value[0];
      this.title = mainArticle.title;

      this.content = mainArticle.chunks.map((c) => {
        const chunkData = [c];

        for (let i = 1; i < value.length; i++) {
          const chunk = this._getChunkById(value[i], c.chunkId);

          if (chunk) {
            chunkData.push(chunk);
          }
        }
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
