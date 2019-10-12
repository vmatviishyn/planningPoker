import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';
import { SessionService } from 'src/app/services/session.service';
import { UsersService } from './services/users.service';

import { User } from 'src/app/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  user$: Observable<firebase.User>;
  userData$: Observable<User | boolean>;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private sessionService: SessionService,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.sessionService.setSessionId();
    this.user$ = this.authService.getUserData();
    this.userData$ = this.userService.getCurrentUser();
  }

  logout(user: firebase.User) {
    this.authService.logout(user)
      .pipe(take(1))
      .subscribe(() => this.notificationService.show('Successfully logged out.'));
  }
}
