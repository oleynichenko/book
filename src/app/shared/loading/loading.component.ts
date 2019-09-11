import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() appInterfaceDisabled = false;
  @Input() mainContentDisabled = false;
  classes: any;

  constructor() { }

  ngOnInit() {
    this.classes = {
      loading: true,
      'loading--fixed': this.appInterfaceDisabled,
      'loading--abs': this.mainContentDisabled,
    };
  }
}
