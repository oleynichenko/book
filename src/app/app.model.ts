export class MenuItem {
  constructor(public title: string, public id: string) { }
}

export interface Lesson {
  src: string;
  langNames: object;
  authorNames: object;
  date?: Date;
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
