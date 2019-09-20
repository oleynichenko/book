import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  logError(message: string, stack: string) {
    // Send errors to server here
    console.error('LoggingService-message: ' + message);
    console.error('LoggingService-stack: ' + stack);
  }
}
