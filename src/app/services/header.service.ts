import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private showBackButton = new BehaviorSubject<boolean>(false);

  showBackButton$ = this.showBackButton.asObservable();

  dispatchShowBackButton(hide = true) {
    this.showBackButton.next(hide);
  }

}
