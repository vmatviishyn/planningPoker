import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthService } from './services/auth.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  userData$: Observable<firebase.User>;

  constructor(private authService: AuthService, private sessionService: SessionService) {}

  ngOnInit() {
    this.sessionService.setSessionId();
    this.userData$ = this.authService.getUserData();
  }

  logout(user: firebase.User) {
    this.authService.logout(user)
      .pipe(take(1))
      .subscribe(() => console.log('Logged out'));
  }
}
