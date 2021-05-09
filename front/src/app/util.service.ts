import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  cbAction: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }
}
