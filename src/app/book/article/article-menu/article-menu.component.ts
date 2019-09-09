import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {BookService} from '../../book.service';
import {Subscription} from 'rxjs';

interface MenuItem {
  langId: string;
  authorId: string;
  title: string;
}
@Component({
  selector: 'app-article-menu',
  templateUrl: './article-menu.component.html',
  styleUrls: ['./article-menu.component.scss']
})
export class ArticleMenuComponent implements OnInit, OnDestroy {
  @Output() menuChanged = new EventEmitter();

  @Input() articleId: string;
  @Input() set menuData(value) {
    this._menu = value;

    if (this.displayedMenuItems) {
      // удаляем из displayedMenuItems те которых нет в новом меню
      this.displayedMenuItems = this.displayedMenuItems.filter((i) => {
        return value.find((j) => {
          return i.langId === j.langId && i.authorId === j.authorId;
        });
      });

      if (this.displayedMenuItems.length > 0) {
        // почистить availableMenuItems от тех что есть в displayedMenuItems
        this.availableMenuItems = value.filter((i) => {
          return !this.displayedMenuItems.find((j) => {
            return i.langId === j.langId && i.authorId === j.authorId;
          });
        });

        this.menuChanged.emit(this.displayedMenuItems);
      } else {
        const defaultMenuItemIndex = this.getDefaultMenuItemIndex(value);
        this.displayedMenuItems = [value[defaultMenuItemIndex]];

        this.availableMenuItems = [...value];
        this.availableMenuItems.splice(defaultMenuItemIndex, 1);
      }
    }
  }

  private _menu: any;
  isMenuShown = false;
  availableMenuItems: MenuItem[];
  displayedMenuItems: MenuItem[];
  trSubscription: Subscription;

  constructor(private translate: TranslateService,
              private bookService: BookService) { }

  ngOnInit() {
    const defaultMenuItemIndex = this.getDefaultMenuItemIndex(this._menu);
    this.displayedMenuItems = [this._menu[defaultMenuItemIndex]];

    this.availableMenuItems = [...this._menu];
    this.availableMenuItems.splice(defaultMenuItemIndex, 1);
    this.menuChanged.emit(this.displayedMenuItems);

    this.trSubscription = this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.bookService.getArticleMenu(this.articleId, event.lang)
          .subscribe((data: any) => {
            this.displayedMenuItems = this.changeTitle(this.displayedMenuItems, data);
            this.availableMenuItems = this.changeTitle(this.availableMenuItems, data);
          });
      });
  }

  private getDefaultMenuItemIndex(menu) {
    const lang = this.translate.currentLang;
    const author = this.bookService.defaultAuthor;

    let menuItemIndex = menu.findIndex((i) => {
      return i.langId === lang && i.authorId === author;
    });

    // если нет статьи на языке интерефейса то берем на таком же языке
    if (menuItemIndex !== -1) {
      return menuItemIndex;
    } else {
      menuItemIndex = menu.findIndex((i) => {
        return i.langId === lang;
      });

    // если нет статьи на языке интерефейса то берем первую что есть
      if (menuItemIndex !== -1) {
        return menuItemIndex;
      } else {
        return 0;
      }
    }
  }

  private changeTitle(arr, data) {
    return arr.map((i) => {
      i.title = data.find((j) => i.langId === j.langId && i.authorId === j.authorId).title;

      return i;
    });
  }

  dropInAvailable(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.menuChanged.emit(this.displayedMenuItems);
    }
  }

  dropInDisplayed(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      if (event.previousIndex !== event.currentIndex) {
        this.menuChanged.emit(this.displayedMenuItems);
      }
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.menuChanged.emit(this.displayedMenuItems);    }
  }

  notLastDisplayedPredicate(item: CdkDrag<MenuItem[]>) {
    return item.dropContainer.data.length > 1;
  }

  ngOnDestroy() {
    this.trSubscription.unsubscribe();
  }
}
