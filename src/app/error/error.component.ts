import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ErrorData} from '../app.model';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  errorData: ErrorData;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.errorData = navigation.extras.state as ErrorData;
  }

  ngOnInit() {
    if (!this.errorData) {
      this.errorData = new ErrorData({message: ''}, 404, 'Not Found');
    }
  }
}
