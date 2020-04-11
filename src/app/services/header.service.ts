import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private showBackButton = new BehaviorSubject<boolean>(false);

  showBackButton$ = this.showBackButton.asObservable().pipe(delay(100));

  dispatchShowBackButton(hide = true) {
    this.showBackButton.next(hide);
  }

}
