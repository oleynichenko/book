import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from '../../app.model';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  @Input() mainMenuItems: MenuItem[];

  constructor() { }

  ngOnInit() { }
}
