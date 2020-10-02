import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EasySpinner } from './model';

@Injectable({
  providedIn: 'root'
})
export class EasySpinnerService {

  public easySpinnerHide: BehaviorSubject<EasySpinner> = new BehaviorSubject<EasySpinner>({name: 'default', show: false});
  constructor() { 
   
  }

  show(name?: string) {
    const data = {name: name || 'default', show: true};
    this.easySpinnerHide.next(data);
  }

  hide(name?: string) {
    const data = {name: name || 'default', show: false};
    this.easySpinnerHide.next(data);
  }

}
