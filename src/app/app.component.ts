import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';
import { SessionService } from 'src/app/services/session.service';
import { UsersService } from './services/users.service';

import { Session, User } from 'src/app/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  private userDataSub: Subscription;

  userData: User;
  user$: Observable<firebase.User>;
  userData$: Observable<User>;
  session$: Observable<Session>;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private sessionService: SessionService,
    private userService: UsersService,
  ) {}

  ngOnInit() {
    this.sessionService.setSessionId();
    this.session$ = this.sessionService.getSessionData();
    this.user$ = this.authService.getUserData();
    // this.userData$ = this.userService.getCurrentUser();
    this.getCurrentUser();
  }

  ngOnDestroy() {
    this.userDataSub.unsubscribe();
  }

  logout() {
    this.authService.logout()
      .pipe(take(1))
      .subscribe(() => this.notificationService.show('Successfully logged out.'));
  }

  private getCurrentUser() {
    this.userDataSub = this.userService.getCurrentUser()
      .subscribe((user: User) => {
        this.userData = user;
        if (user && !user.sessionId) {
          console.log('logout');
        }
      });
  }
}
