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
  articles = [];
  articleTitle: string;
  articleMenuData;
  articleId: string;
  paramSubscription: Subscription;
  trSubscription: Subscription;

  constructor(private bookService: BookService,
              private commentService: CommentService,
              private route: ActivatedRoute,
              private translate: TranslateService) { }

  ngOnInit() {
    this.paramSubscription = this.route.params.pipe(
      mergeMap((params: Params) => {
        this.articles = [];
        this.articleId = params.id;
        return forkJoin([
          this.bookService.getArticleMenu(this.articleId, this.translate.currentLang),
          this.commentService.getCommentMenu(this.translate.currentLang, this.articleId)
        ]);
      })
    ).subscribe(([articleMenuData, commentMenuData]: any[]) => {
      if (articleMenuData && articleMenuData.length > 0) {
        this.articleMenuData = articleMenuData;
        this.articleTitle = this.getArticleTitle(this.translate.currentLang);
        this.commentService.setCommentMenu(commentMenuData);
      } else {
        // поставить заглушку 404
      }
    });

    this.trSubscription = this.translate.onLangChange
      .subscribe((event: LangChangeEvent) => {
        if (this.articleMenuData) {
          this.articleTitle = this.getArticleTitle(event.lang);
        }
      });
  }

  private isArticleDownloaded(lang, author) {
    return this.articles.findIndex((a) => {
      return a.langId === lang && a.authorId === author;
    }) !== -1;
  }

  onMenuChanges(sources) {
    // создаем массив на запросов на отсутствующие статьи
    const missingArticlesRequests = sources.reduce((res, s) => {
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
      forkJoin(...missingArticlesRequests).subscribe((data) => {
        this.articles = this.sortArticles(sources, data);
      });
    } else {
      // для сортировки существующих
      this.articles = this.sortArticles(sources);
    }
  }

  private getArticleTitle(lang) {
    let defaultArticleData = this.articleMenuData
      .find(i => i.langId === lang && i.authorId === this.bookService.defaultAuthor);

    if (!defaultArticleData) {
      defaultArticleData = this.articleMenuData.find(i => i.langId === lang);

      if (!defaultArticleData) {
        defaultArticleData = this.articleMenuData[0];
      }
    }

    return defaultArticleData.articleTitle;
  }

  private sortArticles(sources, data = []) {
    const articles = this.articles.concat(data);

    return sources.map((s) => {
      return articles.find((a) => {
        return a.langId === s.langId && a.authorId === s.authorId;
      });
    });
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
    this.trSubscription.unsubscribe();
  }
}
