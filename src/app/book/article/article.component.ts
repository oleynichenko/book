import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookService} from '../book.service';
import {ActivatedRoute, Params} from '@angular/router';
import {mergeMap} from 'rxjs/operators';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {forkJoin, Subscription} from 'rxjs';
import {CommentService} from './comment.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {
  articles: any = [];
  lessons: any = [];
  articleTitle: string;
  articleMenuData: any;
  articleId: string;
  paramSubscription: Subscription;
  trSubscription: Subscription;
  hasComments: boolean;
  hasLessons: boolean;

  constructor(private bookService: BookService,
              private commentService: CommentService,
              private route: ActivatedRoute,
              private translate: TranslateService) { }

  ngOnInit() {
    this.paramSubscription = this.route.params.pipe(
      mergeMap((params: Params) => {
        const lang = this.translate.currentLang;
        this.articles = [];
        this.articleId = params.id;

        return forkJoin([
          this.bookService.getArticleMenu(this.articleId, lang),
          this.commentService.getCommentMenu(this.articleId, lang),
          this.bookService.getArticleLessons(this.articleId)
        ]);
      })
    ).subscribe(([articleMenuData, commentMenuData, lessonsData]: any[]) => {
      if (articleMenuData && articleMenuData.length > 0) {
        this.articleMenuData = articleMenuData;

        // название статьи берем с меню
        this.articleTitle = this.getArticleTitle(this.translate.currentLang);

        this.hasComments = (commentMenuData && commentMenuData.length > 0);

        if (this.hasComments) {
          this.commentService.setCommentMenu(commentMenuData);
        }

        this.hasLessons = (lessonsData && lessonsData.length > 0);

        this.lessons = this.hasLessons ? lessonsData : [];
      } else {
        // поставить заглушку 404
        // возможно добавить блок с предложением об участии в переводах
      }
    });

    this.trSubscription = this.translate.onLangChange
      .subscribe((event: LangChangeEvent) => {
        if (this.articleMenuData) {
          this.articleTitle = this.getArticleTitle(event.lang);
        }
      });
  }

  private isArticleDownloaded(lang: string, author: string) {
    return this.articles.findIndex((a: any) => {
      return a.langId === lang && a.authorId === author;
    }) !== -1;
  }

  onMenuChanges(sources: any) {
    // создаем массив на запросов на отсутствующие статьи
    const missingArticlesRequests = sources.reduce((res: any, s: any) => {
      if (!this.isArticleDownloaded(s.langId, s.authorId)) {
        res.push(this.bookService.getArticle(
          this.articleId,
          s.langId,
          s.authorId
        ));
      }

      return res;
    }, []);

    if (missingArticlesRequests.length > 0) {
      forkJoin(...missingArticlesRequests).subscribe((data: any) => {
        this.articles = this.sortArticles(sources, data);
      });
    } else {
      // для сортировки существующих
      this.articles = this.sortArticles(sources);
    }
  }

  private getArticleTitle(lang: string): string {
    let defaultArticleData = this.articleMenuData
      .find((i: any) => i.langId === lang && i.authorId === this.bookService.defaultAuthor);

    if (!defaultArticleData) {
      defaultArticleData = this.articleMenuData.find((i: any) => i.langId === lang);

      if (!defaultArticleData) {
        defaultArticleData = this.articleMenuData[0];
      }
    }

    return defaultArticleData.title;
  }

  private sortArticles(sources: any, data: any = []) {
    const articles = this.articles.concat(data);

    return sources.map((s: any) => {
      return articles.find((a: any) => {
        return a.langId === s.langId && a.authorId === s.authorId;
      });
    });
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
    this.trSubscription.unsubscribe();
  }
}
