export class MenuItem {
  constructor(public title: string, public id: string) { }
}

export interface Lesson {
  src: string;
  langNames: any;
  authorNames: any;
  date?: Date;
}
export interface Footnote {
  id: string;
  text: string;
}

export interface Chunk {
  chunkId: string;
  content: string;
  langId: string;
}

export interface Article {
  articleId: string;
  authorId: string;
  bookId: string;
  chunks: Chunk[];
  langId: string;
  title: string;
  footnotes: Footnote[];
}

export type Langs = string[];

export class ServerError {
  constructor(public message: string) {}
}

export const RoutesNames = {
  ERROR: 'error',
  ABOUT: 'about',
  ARTICLE: 'article',
  AUTHORS: 'authors'
};

export class ErrorData {
  constructor(public serverData: ServerError,
              public status: number,
              public statusText: string) {}
}
