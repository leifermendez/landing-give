import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  cbAction: EventEmitter<any> = new EventEmitter<any>();
  cbMoreInfo: EventEmitter<any> = new EventEmitter<any>()

  constructor() {
  }

  scrollToTop(): void {
    // tslint:disable-next-line:typedef
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }
}
