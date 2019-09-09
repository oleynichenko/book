import {AfterViewInit, Directive, ElementRef} from '@angular/core';
import SimpleBar from 'simplebar/dist/simplebar';

@Directive({
  selector: '[appSimpleBar]'
})
export class SimpleBarDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    new SimpleBar(this.elementRef.nativeElement, {
      autoHide: false
    });
  }
}
