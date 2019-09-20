import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar,
              private zone: NgZone) { }

  showSuccess(message: string): void {
    // Had an issue with the snackbar being ran outside of angular's zone.
    this.zone.run(() => {
      this.snackBar.open(message);
    });
  }

  showError(message: string): void {
    this.zone.run(() => {
      // In the third, we send in the css class for the snack bar.
      this.snackBar.open(message, 'CLOSE', {panelClass: ['error']});
    });
  }
}
