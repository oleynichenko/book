import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from '../../app.model';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit {
  @Input() subMenuItems: MenuItem[];
  constructor() { }

  ngOnInit() {
  }

}
