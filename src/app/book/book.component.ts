import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {AppService} from '../app.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;

  constructor(public appService: AppService) {
  }

  ngOnInit() {
  }
}
