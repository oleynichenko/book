import {Component, OnInit} from '@angular/core';
import {CommentService} from '../comment.service';
import {debounceTime} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(public commentService: CommentService) { }

  ngOnInit() {
    this.isLoading$ = this.commentService.loadingStatus.pipe(
      debounceTime(300)
    );
  }
}
