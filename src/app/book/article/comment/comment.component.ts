import {AfterViewChecked, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {CommentService} from '../comment.service';
import {debounceTime} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FootnoteService} from '../../../shared/footnote.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  providers: [FootnoteService]
})
export class CommentComponent implements OnInit, AfterViewChecked {
  isLoading$: Observable<boolean>;

  constructor(public commentService: CommentService,
              public footnoteService: FootnoteService,
              private hostElementRef: ElementRef,
              private renderer: Renderer2) {
    footnoteService.renderer = renderer;
  }

  ngOnInit() {
    this.isLoading$ = this.commentService.loadingStatus.pipe(
      debounceTime(300)
    );
  }

  ngAfterViewChecked() {
    if (this.commentService.footnotesToSet) {
      // закрываем сноски после загрузки нового комментария
      this.footnoteService.closeFootnote();

      this.footnoteService.setListenersToFootnotes(
        this.hostElementRef.nativeElement,
        this.commentService.footnotes
      );

      this.commentService.footnotesToSet = false;
    }
  }
}
